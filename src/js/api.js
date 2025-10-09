// api.js
const baseUrl = "https://developer.nps.gov/api/v1/";

async function getJson(endpoint) {
  // replace this with your actual key
    const apiKey = "pjDBJw1tzNjCzNinf3ryyh6h2UBzOhINGA0NP6UR";
  // construct the url: baseUrl + endpoint + parameters
    const url = baseUrl + endpoint;
  // set the options. The important one here is the X-Api-Key
    const options = {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
        "X-Api-Key": apiKey
        }
    }
  // make the request
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    return data;
}

function listTemplate(item) {
    return `<li><a href="${item.url}">${item.fullName}</a> ${item.states}</li>`;
}

async function renderClimbingList() {
    const endpoint = "activities/parks?q=climbing";
    const listElement = document.getElementById("outputList");
    const data = await getJson(endpoint);
    const parks = data.data;
    const listHtml = parks.map(listTemplate).join("");
    listElement.innerHTML = listHtml;
}
renderClimbingList();