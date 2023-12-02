import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../../common/button/Button";
import { ElementsContainer } from "../elementsContainer/ElementsContainer";
import "./style.scss";

interface Props {
  inputsLabels: { label: string; input: string }[];
  handleOnSubmit: (values: any) => void;
}

export function SearchTable({ inputsLabels, handleOnSubmit }: Props) {
  const { register, handleSubmit } = useForm();

  const onSubmit: SubmitHandler<any> = (values) => {
    return handleOnSubmit(values);
  };

  return (
    <form className="searchTable" onSubmit={handleSubmit(onSubmit)}>
      <ElementsContainer>
        <div className="searchTable-header bold">Filtry</div>
        <div className="searchTable-body">
          {inputsLabels.map((value, index) => (
            <div key={index}>
              <label><b>{value.label}:</b></label>
              <input {...register(value.input)} />
            </div>
          ))}
        </div>
        <div className="searchTable-footer">
          <Button className="filterButton" type="submit">Filtruj</Button>
        </div>
      </ElementsContainer>
    </form>
  );
}
