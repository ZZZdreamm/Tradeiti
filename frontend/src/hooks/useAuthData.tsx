import { useEffect, useState } from "react";
import { Claim } from "../models/Claim";

export function useAuthData() {
  const [claims, setClaims] = useState<Claim[]>([]);
  const [gotClaims, setGotClaims] = useState(false);

  useEffect(() => {
    setClaims(getClaims());
  }, []);

  useEffect(() => {
    setClaims(getClaims());
    setGotClaims(true);
  }, [localStorage]);

  return { claims, setClaims, gotClaims };
}

const getClaims = () => {
  return [{ name: "yes", value: 'yesyesyes' }];
};
