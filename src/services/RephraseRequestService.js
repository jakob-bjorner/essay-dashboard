export const getRephraseLogs = async () => {
  return fetch("" + process.env.REACT_APP_API_URL + "/rephrase-logs/")
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log(error);
      return [];
    });
};

export const postRephraseLogs = async (original, rephrased, accepted) => {
  return fetch("" + process.env.REACT_APP_API_URL + "/rephrase-logs/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      original,
      rephrased,
      accepted,
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

export const rephraseSentence = async (message) => {
  return fetch("" + process.env.REACT_APP_API_URL + "/rephrase", {
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
