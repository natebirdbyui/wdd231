import "../css/style.css"; // we can do this because we are using Vite...
import "../css/home.css";
import { getParkData, getInfoLinks } from "./parkService.mjs";
import setHeaderFooter from "./setHeaderFooter.mjs";
import { mediaCardTemplate } from "./templates.mjs";

function setParkIntro(data) {
  const introEl = document.querySelector(".intro");
  introEl.innerHTML = `<h1>${data.fullName}</h1>
  <p>${data.description}</p>`;
}

function setParkInfoLinks(data) {
  const infoEl = document.querySelector(".info");
  // we have multiple links to build...so we map to transform the array of objects into an array of HTML strings.
  const html = data.map(mediaCardTemplate);
  // join the array of strings into one string and insert it into the section
  infoEl.insertAdjacentHTML("afterbegin", html.join(""));
}

async function init() {
  const parkData = await getParkData();
  const links = getInfoLinks(parkData.images);
  setHeaderFooter(parkData);
  setParkIntro(parkData);
  setParkInfoLinks(links);
}

function enableNavigation() {
  const menuButton = document.querySelector("#global-nav-toggle");
  // when the main menu button is clicked:
  menuButton.addEventListener("click", (ev) => {
    let target = ev.target.tagName === "BUTTON" ? ev.target : ev.target.closest("button");
    // toggle the show class on the global-nav
    document.querySelector(".global-nav").classList.toggle("show");
    // check to see if ev.target is the button or something inside the button
    if (target.tagName != "BUTTON") {
      target = target.closest("button");
    }
    // check to see if we just opened or closed the menu
    if (document.querySelector(".global-nav").classList.contains("show")) {
      // if we opened it then set the aria-expanded attribute to true
      target.setAttribute("aria-expanded", true);
    } else {
      // if we closed it then set the aria-expanded attribute to false
      target.setAttribute("aria-expanded", false);
    }

    console.log("toggle");
  });
}

init();
enableNavigation();