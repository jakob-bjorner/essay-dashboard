export const getRephraseRequests = async () => {
  return fetch("http://localhost:5000/rephrase-requests")
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log(error);
      return [];
    });
};
