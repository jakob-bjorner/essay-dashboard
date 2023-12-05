export const getSentenceCompletions = async () => {
  return fetch(
    "" + process.env.REACT_APP_API_URL + "/sentence-completion-logs/"
  )
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log(error);
      return [];
    });
};

export const postSentenceCompletions = async (
  original,
  rephrased,
  accepted
) => {
  return fetch(
    "" + process.env.REACT_APP_API_URL + "/sentence-completion-logs/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        original,
        rephrased,
        accepted,
      }),
    }
  )
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log(error);
      return [];
    });
};

export const completeSentence = async (message) => {
  return fetch(
    "" + process.env.REACT_APP_API_URL + "/sentence-complete",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
      }),
    }
  )
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log(error);
      return [];
    });
};
