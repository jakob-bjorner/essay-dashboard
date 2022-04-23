export const getSentenceCompletions = async () => {
  return fetch(
    "https://stormy-brushlands-33433.herokuapp.com//sentence-completion-logs/"
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
    "https://stormy-brushlands-33433.herokuapp.com//sentence-complete",
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
