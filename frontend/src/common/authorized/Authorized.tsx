import { ReactElement } from "react";
import { useAuthContext } from "../../providers/AuthProvider";

export default function Authorized(props: authorizedProps) {
  const { connectedToUsos } = useAuthContext();
  return <>{connectedToUsos ? props.isAuthorized : props.notAuthorized}</>;
}
interface authorizedProps {
  isAuthorized: ReactElement;
  notAuthorized?: ReactElement;
  role?: string;
}
