import axios from "axios";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export function Redirect() {
  const [searchParams, _] = useSearchParams();

  useEffect(() => {
    localStorage.setItem("token", searchParams.get("token") || "");
    localStorage.setItem("secret", searchParams.get("secret") || "");
    axios
      .get(
        "https://apps.usos.pw.edu.pl/services/courses/course?course_id=103A-INxxx-ISP-BD1",
        {
          params: {
            oauth_signature_method: "HMAC-SHA1",
            oauth_consumer_key: "BvK4hkc6RfeRxnHHbmy6",
            oauth_token: localStorage.getItem("token"),
            oauth_consumer_secret: "VxhuAFJrcakrXBamjtfafaZ44k8hnw7ZtZxxtYh3",
            oauth_token_secret: localStorage.getItem("secret"),
          },
        }
      )
      .then((response) => {
        console.log(response);
      });
  }, [searchParams]);
  console.log(searchParams);
  return <div></div>;
}
