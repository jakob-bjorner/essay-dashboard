export const getEssayOutlines = async () => {
  return fetch(
    "https://stormy-brushlands-33433.herokuapp.com//essay-outline-logs/accepted"
  )
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log(error);
      return [];
    });
};

export const essayOutline = async (message) => {
  return fetch("https://stormy-brushlands-33433.herokuapp.com//essay-outline", {
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
