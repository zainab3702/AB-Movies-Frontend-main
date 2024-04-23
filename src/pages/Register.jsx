import { useFormik } from "formik";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerValidationSchema } from "../validation/registerValidationSchema";
import Resizer from "react-image-file-resizer";
import ErrorMessage from "../components/ErrorMessage";
import { useRef, useState } from "react";
const Register = () => {
  const imageRef = useRef(null);
  const [success, setSuccess] = useState(false);
  const [doesImageExist, setDoesImageExist] = useState(false);
  const navigate = useNavigate();
  // for image compression
  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        300,
        300,
        "PNG",
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        "blob"
      );
    });

  const {
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    touched,
    values,
    setFieldValue
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      profileImage: null
    },
    validationSchema: registerValidationSchema,
    onSubmit: async ({ email, password, profileImage }) => {
      // to create a user by sending post request to the backend
      try {
        const response = await axios.post(
          "/user/register",
          JSON.stringify({ email, password }),
          {
            headers: { "Content-Type": "application/json" }
          }
        );

        if (response.data.success) {
          // if user is created successfully
          toast.success(response.data.message);
          localStorage.setItem(`profileImage${email}`, profileImage);
          setSuccess(true);
        }
      } catch (err) {
        // if any error occurs
        toast.error(err.response.data.message);
      }
    }
  });

  return (
    <main className="flex h-screen w-full flex-col items-center justify-center gap-20 ">
      <img src="/logo.svg" alt="logo" className="mt-20 h-10 w-12 md:mt-0" />
      <div className="w-72 rounded-lg bg-app-light p-6 sm:w-96">
        <h2 className="mb-4 text-2xl font-light">
          {success ? "Success" : "Sign Up"}
        </h2>
        {success ? (
          <h2
            className="tex-xl cursor-pointer place-self-center text-app-red"
            onClick={() => navigate("/login")}
          >
            Login
          </h2>
        ) : (
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {/* email field */}
            <div
              tabIndex={1}
              className={`flex flex-col gap-2 border-b-2 ${touched.email && errors.email ? "border-b-app-red" : "border-b-app-icons"} 
              ${touched.email && errors.email ? "border-opacity-100" : "border-opacity-30"} pb-2  focus-within:${touched.email && errors.email ? "border-b-app-red" : "border-b-white"} focus-within:${touched.email && errors.email ? "border-opacity-100" : "border-opacity-60"} `}
            >
              <input
                value={values.email}
                className="ml-2 border-none bg-transparent outline-none  placeholder:text-app-icons focus:placeholder:text-white focus:placeholder:text-opacity-60"
                onBlur={handleBlur}
                type="email"
                name="email"
                onChange={handleChange}
                placeholder="Email"
              />

              <ErrorMessage
                touched={touched.email}
                error={errors.email}
                className={" ml-2 text-sm text-red-600"}
              />
            </div>
            {/* password input field */}
            <div
              tabIndex={2}
              className={`flex flex-col gap-2 border-b-2 ${touched.password && errors.password ? "border-b-app-red" : "border-b-app-icons"} 
              ${touched.password && errors.password ? "border-opacity-100" : "border-opacity-30"} pb-2  focus-within:${touched.password && errors.password ? "border-b-app-red" : "border-b-white"} focus-within:${touched.password && errors.password ? "border-opacity-100" : "border-opacity-60"} `}
            >
              <input
                value={values.password}
                className="ml-2 border-none bg-transparent outline-none  placeholder:text-app-icons focus:placeholder:text-white focus:placeholder:text-opacity-60"
                onBlur={handleBlur}
                type="password"
                name="password"
                onChange={handleChange}
                placeholder="Password"
              />

              <ErrorMessage
                className={" ml-2 text-sm text-red-600"}
                touched={touched.password}
                error={errors.password}
              />
            </div>

            {/* confirm password input field */}
            <div
              tabIndex={3}
              className="flex flex-col gap-2 border-b-2 border-b-app-icons   border-opacity-30 pb-2  focus-within:border-b-white focus-within:border-opacity-60 "
            >
              <input
                value={values.confirmPassword}
                className="ml-2 border-none bg-transparent outline-none  placeholder:text-app-icons focus:placeholder:text-white focus:placeholder:text-opacity-60"
                onBlur={handleBlur}
                type="password"
                name="confirmPassword"
                onChange={handleChange}
                placeholder="Confirm Password"
              />

              <ErrorMessage
                className={" ml-2 text-sm text-red-600"}
                touched={touched.confirmPassword}
                error={errors.confirmPassword}
              />
            </div>
            {/* image upload button */}
            <div tabIndex={4} className="flex flex-col gap-2">
              <label htmlFor="profileImage" className="flex items-center gap-4">
                {
                  <span className="tex-sm w-1/2 cursor-pointer rounded-md border-2 border-app-red p-2 text-app-red  sm:w-fit">
                    {values.profileImage ? "Change" : "Upload"} Image
                  </span>
                }
                <div className="size-20">
                  {values.profileImage && (
                    <img
                      src={values.profileImage}
                      className="w-full translate-y-1/4 object-cover"
                      alt="Profile Image"
                    />
                  )}
                </div>
              </label>
              <input
                ref={imageRef}
                id="profileImage"
                onBlur={handleBlur}
                type="file"
                accept="image/*"
                className="hidden"
                name="profileImage"
                onChange={async (e) => {
                  const file = e.target.files[0];
                  if (!file) return;
                  const resizedImage = await resizeFile(file);
                  const reader = new FileReader();
                  reader.readAsDataURL(resizedImage);
                  reader.onload = () => {
                    setFieldValue("profileImage", reader.result);
                    setDoesImageExist(true);
                  };
                }}
              />
              {values.profileImage && (
                <button
                  className="tex-sm cursor-pointer rounded-md border-2 border-app-red  p-2 text-app-red"
                  type="button"
                  onClick={() => {
                    imageRef.current.value = "";
                    setFieldValue("profileImage", null);
                    setDoesImageExist(false);
                  }}
                >
                  Remove Image
                </button>
              )}
              {doesImageExist ? null : (
                <span className="text-sm font-medium tracking-wide text-gray-600">
                  {"(profile image can only be added while registration)"}
                </span>
              )}
            </div>
            <button
              type="submit"
              role="submit"
              className="w-full cursor-pointer rounded-lg bg-app-red px-4 py-2 text-white outline-none  hover:bg-white hover:text-black"
            >
              Create an account
            </button>
            <h3 className="mx-auto text-base text-white">
              Already have an account?{" "}
              <span
                className="cursor-pointer text-app-red"
                onClick={() => navigate("/login")}
              >
                Login
              </span>
            </h3>
          </form>
        )}
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        theme="dark"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnHover={false}
        transition={Bounce}
      />
    </main>
  );
};

export default Register;
