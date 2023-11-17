import "./style.scss";

interface ElementsContainerProps {
  children: React.ReactNode;
}

export function ElementsContainer({ children }: ElementsContainerProps) {
  return <div className="elementsContainer">{children}</div>;
}
