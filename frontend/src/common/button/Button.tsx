import "./style.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  bgColor?: string;
}

export function Button({
  children,
  bgColor = "#f9f9f9",
  ...props
}: ButtonProps) {
  return (
    <button className="myButton" style={{ backgroundColor: bgColor }} {...props}>
      {children}
    </button>
  );
}
