import { getMultipleValuesFromSessionStorage } from "../../common/sessionStorage";

export function getDefaultOfferFormValues() {
  return getMultipleValuesFromSessionStorage([
    "course",
    "group",
    "myHour",
    "opponentHour",
  ]);
}
