// eslint-disable-next-line react/prop-types
const ErrorMessage = ({ touched, error, className }) => {
  // for displaying error message in form fields
  return touched && error && <p className={`${className}`}>{error}</p>;
};

export default ErrorMessage;
