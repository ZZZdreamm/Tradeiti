import { SubmitHandler, useForm } from "react-hook-form";
import { useLocation } from 'react-router-dom';
import "./style.scss";

interface AuthFormProps {
  handleOnSubmit: (values: any) => void;
  errorMessage: string;
}

export function AuthForm({ handleOnSubmit, errorMessage }: AuthFormProps) {
  const { register, handleSubmit } = useForm();

  const location = useLocation();
  const isRegisterPage = location.pathname.includes('/register');

  const onSubmit: SubmitHandler<any> = (values) => {
    return handleOnSubmit(values);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Nazwa użytkownika: </label><br />
        <input {...register("username")} />
        <br />
        <p className="errorMessage">
        {errorMessage && (<b>{errorMessage}</b>)}
        </p>
      </div>
      <div>
        <label>Hasło: </label><br />
        <input type="password" {...register("password")} />
      </div>
      <button id="loginButton" type="submit">
        { isRegisterPage ? "Rejestruj" : "Zaloguj"}
      </button>
    </form>
  );
}
