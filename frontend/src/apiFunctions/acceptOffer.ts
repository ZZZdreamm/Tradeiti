export function acceptOffer(offer_id: string, requester_id: string) {
  return new Promise<{ data: any }>((res, _) => {
    res({ data: "mocked value" });
  });
  // return axiosBase.post(
  //   "/accept-offer",
  //   {
  //     offer_id: offer_id,
  //     requester_id: requester_id,
  //   },
  //   {
  //     headers: {
  //       Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN),
  //     },
  //   }
  // );
}
