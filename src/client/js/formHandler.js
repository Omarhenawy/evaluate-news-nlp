import { validURL } from "./urlChecker";
console.log("before handle submit");

function handleSubmit(event) {
  event.preventDefault();
  let formText = document.getElementById("name").value;

  console.log("::: Form Submitted :::");

  // check what text was put into the form field
  if (validURL(formText)) {
    postData("http://localhost:8081/article", { url: formText }).then(function (
      data
    ) {
      document.getElementById("results").innerHTML = `text ${data.text}`;
      document.getElementById(
        "confidence"
      ).innerHTML = `Confidence ${data.confidence}`;
      document.getElementById(
        "agreement"
      ).innerHTML = `agreement ${data.agreement}`;
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
