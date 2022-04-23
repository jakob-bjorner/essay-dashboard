export const getEssayOutlines = async () => {
  return fetch("http://localhost:5000/essay-outline-logs/accepted")
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log(error);
      return [];
    });
};

export const essayOutline = async (message) => {
  return fetch("http://localhost:5000/essay-outline", {
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
