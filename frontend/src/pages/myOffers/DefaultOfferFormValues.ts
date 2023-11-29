import { getMultipleValuesFromSessionStorage } from "../../common/sessionStorage";

export function getDefaultOfferFormValues() {
  return getMultipleValuesFromSessionStorage([
    "course",
    "myHour",
    "opponentHour",
  ]);
}
