export const getSentenceCompletions = async () => {
  return fetch("http://localhost:5000/sentence-completion-logs/")
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log(error);
      return [];
    });
};

export const completeSentence = async (message) => {
  return fetch("http://localhost:5000/sentence-complete", {
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
