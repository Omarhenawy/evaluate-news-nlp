import { validURL } from "./urlChecker";

function handleSubmit(event) {
  event.preventDefault();

  let formText = document.getElementById("name").value;
  // check what text was put into the form field
  if (Client.validURL(formText)) {
    postData("http://localhost:8081/article", { url: formText });
    console.log("::: Form Submitted :::").then(function (data) {
      document.getElementById("results").innerHTML = `omar ${data.message}`;
    });
  } else {
    alert(`the url isn't workking`);
  }
}

const postData = async (url = "", data = {}) => {
  console.log(data);
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    // Body data type must match "Content-Type" header
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    console.log(newData);
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

export { handleSubmit };
