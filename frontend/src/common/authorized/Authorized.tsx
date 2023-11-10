import { ReactElement } from "react";
import { useAuthContext } from "../../providers/AuthProvider";

export default function Authorized(props: authorizedProps) {
  const { authenticated } = useAuthContext();
  return <>{authenticated ? props.isAuthorized : props.notAuthorized}</>;
}
interface authorizedProps {
  isAuthorized: ReactElement;
  notAuthorized?: ReactElement;
  role?: string;
}
