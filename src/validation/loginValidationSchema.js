import * as Yup from "yup";
export const loginValidationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Cannot be empty"),
  password: Yup.string().required("Cannot be empty"),
});
