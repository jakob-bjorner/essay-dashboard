export const getRephraseLogs = async () => {
  return fetch("https://stormy-brushlands-33433.herokuapp.com/rephrase-logs/")
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log(error);
      return [];
    });
};

export const postRephraseLogs = async (original, rephrased, accepted) => {
  return fetch("https://stormy-brushlands-33433.herokuapp.com/rephrase-logs/", {
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
  return fetch("https://stormy-brushlands-33433.herokuapp.com/rephrase", {
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
