import { useFormik } from "formik";
import { Bounce, ToastContainer, toast } from "react-toastify";
import ErrorMessage from "../components/ErrorMessage";
import { useNavigate, useLocation } from "react-router-dom";
import { loginValidationSchema } from "../validation/loginValidationSchema";
import axios from "../api/axios";
import { useAuth } from "../hooks/useAuth";
const Login = () => {
  const { setAuth } = useAuth();
  const location = useLocation();
  const from = location.state?.from || "/";
  const navigate = useNavigate();
  const { handleBlur, handleChange, handleSubmit, errors, touched, values } =
    useFormik({
      initialValues: {
        email: "",
        password: ""
      },
      onSubmit: async (values, { resetForm }) => {
        try {
          const response = await axios.post(
            "/user/login",
            JSON.stringify(values),
            {
              headers: { "Content-Type": "application/json" }
            }
          );
          if (response.data.success) {
            // if user login is successful setAuth value to request email and response accessToken
            toast.success(`Logged in as ${values.email}`);
            setAuth({
              accessToken: response.data.accessToken,
              email: values.email
            });
            resetForm({ values: { email: "", password: "" } });
            /*  
            if user is logged in successfully navigate to requested page
            (defaulted to home page if no page is requested)
            */
            navigate(from, { replace: true });
          }
        } catch (err) {
          // if error occurs
          const errorMessage = err.response.data.message;
          toast.error(errorMessage);
          if (errorMessage.search(/email/gi) !== -1) {
            // if error message contains email reset email value
            resetForm({ values: { email: "", password: "" } });
          } else if (errorMessage.search(/password/gi) !== -1) {
            // if error message contains password reset password value
            resetForm({ values: { ...values, password: "" } });
          }
        }
      },
      validationSchema: loginValidationSchema
    });
  return (
    <main className="flex h-screen w-full flex-col items-center justify-center gap-20 ">
      <img src="/logo.svg" alt="logo" className="h-10 w-12" />
      <div className="w-72 rounded-lg bg-app-light p-6 sm:w-96">
        <h2 className="mb-4 text-2xl font-light">Login</h2>
        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
          {/* email field */}
          <div
            tabIndex={1}
            className={`flex flex-col gap-2 border-b-2 ${touched.email && errors.email ? "border-b-app-red" : "border-b-app-icons"} 
            ${touched.email && errors.email ? "border-opacity-100" : "border-opacity-30"} pb-2  focus-within:${touched.email && errors.email ? "border-b-app-red" : "border-b-white"} focus-within:${touched.email && errors.email ? "border-opacity-100" : "border-opacity-60"} `}
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:gap-0">
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
                className={"ml-2 text-xs text-app-red sm:ml-0"}
                touched={touched.email}
                error={errors.email}
              />
            </div>
          </div>
          {/* password input field */}
          <div
            tabIndex={2}
            className={`flex flex-col gap-2 border-b-2 ${touched.password && errors.password ? "border-b-app-red" : "border-b-app-icons"} 
            ${touched.password && errors.password ? "border-opacity-100" : "border-opacity-30"} pb-2  focus-within:${touched.password && errors.password ? "border-b-app-red" : "border-b-white"} focus-within:${touched.password && errors.password ? "border-opacity-100" : "border-opacity-60"} `}
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:gap-0">
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
                className="ml-2 text-xs text-app-red sm:ml-0"
                touched={touched.password}
                error={errors.password}
              />
            </div>
          </div>
          <button
            disabled={!(values.email && values.password) ? true : false}
            type="submit"
            role="submit"
            className="w-full cursor-pointer rounded-lg bg-app-red px-4 py-2 text-white outline-none  hover:bg-white hover:text-black"
          >
            Login to your account
          </button>
          <h3 className="mx-auto text-base text-white">
            Don{"' "}t have an account?{" "}
            <span
              className="cursor-pointer text-app-red"
              onClick={() => navigate("/register")}
            >
              Sign Up
            </span>
          </h3>
        </form>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        theme="dark"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnHover
        transition={Bounce}
      />
    </main>
  );
};

export default Login;
