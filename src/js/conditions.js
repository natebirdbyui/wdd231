import "../css/style.css";
import "../css/conditions.css";
import {
  getParkData,
  getParkAlerts,
  getParkVisitorCenters
} from "./parkService.mjs";
import {
  activityListTemplate,
  alertTemplate,
  visitorCenterTemplate
} from "./templates.mjs";
import setHeaderFooter from "./setHeaderFooter.mjs";

//Alerts
function setAlerts(alerts) {
  const alertsContainer = document.querySelector(".alerts > ul");

  alertsContainer.innerHTML = "";

  const html = alerts.map(alertTemplate);
  alertsContainer.insertAdjacentHTML("afterbegin", html.join(""));
}

//Visitor Centers
function setVisitorCenters(centers) {
  const centersContainer = document.querySelector(".visitor ul");
  if (!centersContainer) return;
  centersContainer.innerHTML = "";
  const html = centers.map(visitorCenterTemplate);
  centersContainer.insertAdjacentHTML("afterbegin", html.join(""));
}

//Activities
function setActivities(activities) {
  const activitiesContainer = document.querySelector(".activities ul");
  if (!activitiesContainer) return;
  activitiesContainer.innerHTML = "";
  const html = activityListTemplate(activities);
  activitiesContainer.insertAdjacentHTML("afterbegin", html);
}

async function init() {
  const parkData = await getParkData("cany");//with "cany" for Canyonlands; default is "yell" for Yellowstone
  // add this so the name of the park will change--keeps loading name then return to Yellowstone info

  if (!parkData) return; // Exit if parkData is undefined or null
  document.title = parkData.fullName;

  //this will update the title in the hero banner
  const titleEl = document.querySelector(".hero-banner__title");
  titleEl.textContent = parkData.name;

  //Hero Banner image update
  const heroImg = document.querySelector(".hero-banner img");
  if (heroImg) {
    heroImg.src = parkData.images[0].url;
    heroImg.alt = parkData.images[0].altText || parkData.images[0].caption || `Image of ${parkData.name}`;
  }

  const alerts = await getParkAlerts(parkData.parkCode);
  console.log("Canyonlands alerts:", alerts);

  const visitorCenters = await getParkVisitorCenters(parkData.parkCode);

  setHeaderFooter(parkData);
  setAlerts(alerts);
  setVisitorCenters(visitorCenters);
  setActivities(parkData.activities);
}

document.addEventListener("DOMContentLoaded", () => {
    init();
});