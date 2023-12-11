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

  const sortNew = () => {
    console.log("sortNew");
    const offersList = document.querySelector('.offersList');
    if (offersList) {
      (offersList as HTMLElement).style.flexDirection = 'column-reverse';
    }
  };

  const sortOld = () => {
    console.log("sortOld");
    const offersList = document.querySelector('.offersList');
    if (offersList) {
      (offersList as HTMLElement).style.flexDirection = 'column';
    }
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
          <Button className="filterButton" onClick={sortNew}>
            Od najnowszych
          </Button>
          <Button className="filterButton" onClick={sortOld}>
            Od najstarszych
          </Button>
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
