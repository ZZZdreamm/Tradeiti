import { ReactElement } from "react";
import { useAuthContext } from "../../providers/AuthProvider";

// HOC component for rendering components only if user is connected to usos
export default function Authorized(props: authorizedProps) {
  const { connectedToUsos } = useAuthContext();
  return <>{connectedToUsos ? props.isAuthorized : props.notAuthorized}</>;
}
interface authorizedProps {
  isAuthorized: ReactElement;
  notAuthorized?: ReactElement;
  role?: string;
}
