import { connectUsos } from "../../apiFunctions/connectUsos";

export function UsosConnect() {
  const getToken = async () => {
    const authorizeUrl = await connectUsos();
    window.location.href = authorizeUrl;
  };
  return (
    <div>
      <h1>UsosConnect</h1>
      <button onClick={getToken}>Connect account to USOS</button>
    </div>
  );
}
