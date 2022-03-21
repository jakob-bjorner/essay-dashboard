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

export const rephraseSentence = async (message) => {
  return fetch("http://localhost:5000/rephrase", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
      }),
    })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log(error);
      return [];
    });
};
