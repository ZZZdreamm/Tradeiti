import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../../common/button/Button";
import { ElementsContainer } from "../elementsContainer/ElementsContainer";
import "./style.scss";

interface Props {
  inputsLabels: { label: string; input: string; values: string[] }[];
  handleOnSubmit: (values: any) => void;
  handleOnReset: () => void;
}

export function SearchTable({
  inputsLabels,
  handleOnSubmit,
  handleOnReset,
}: Props) {
  const { register, handleSubmit } = useForm();

  const onSubmit: SubmitHandler<any> = (values) => {
    return handleOnSubmit(values);
  };

  const handleReset = () => {
    handleOnReset();
  };

  return (
    <form className="searchTable" onSubmit={handleSubmit(onSubmit)}>
      <ElementsContainer>
        <div className="searchTable-header bold">Filtry</div>
        <div className="searchTable-body">
          {inputsLabels.map((value, index) => (
            <div key={index}>
              <label>
                <b>{value.label}:</b>
              </label>
              <select {...register(value.input)}>
                {value.values.map((value, index) => (
                  <option key={index} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
        <div className="searchTable-footer">
          <Button className="filterButton" type="reset" onClick={handleReset}>
            Resetuj
          </Button>
          <Button className="filterButton" type="submit">
            Filtruj
          </Button>
        </div>
      </ElementsContainer>
    </form>
  );
}
