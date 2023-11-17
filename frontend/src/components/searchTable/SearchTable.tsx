import { Button } from "../../common/button/Button";
import { ElementsContainer } from "../elementsContainer/ElementsContainer";
import "./style.scss";

interface Props {
  inputsLabels: { label: string; input: string }[];
}

export function SearchTable({ inputsLabels }: Props) {
  return (
    <div className="searchTable">
      <ElementsContainer>
        <div className="searchTable-header bold">Filters</div>
        <div className="searchTable-body">
          {inputsLabels.map((value) => (
            <>
              <label>{value.label}</label>
              <input name={value.input} />
            </>
          ))}
        </div>
        <div className="searchTable-footer">
          <Button>Apply</Button>
        </div>
      </ElementsContainer>
    </div>
  );
}
