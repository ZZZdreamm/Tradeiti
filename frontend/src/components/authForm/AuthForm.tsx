import { SubmitHandler, useForm } from "react-hook-form";
import "./style.scss";

interface AuthFormProps {
  handleOnSubmit: (values: any) => void;
}

export function AuthForm({ handleOnSubmit }: AuthFormProps) {
  const { register, handleSubmit } = useForm();

  const onSubmit: SubmitHandler<any> = (values) => {
    return handleOnSubmit(values);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Nazwa użytkownika: </label><br />
        <input {...register("username")} />
      </div>
      <div>
        <label>Hasło: </label><br />
        <input {...register("password")} />
      </div>
      <button id="loginButton" type="submit">
        Submit
      </button>
    </form>
  );
}
