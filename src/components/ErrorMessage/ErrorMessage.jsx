import css from "./ErrorMessage.module.css";

const ErrorMessage = ({ message }) => {
  return <p className={css.textMessage}>{message}</p>;
};

export default ErrorMessage;
