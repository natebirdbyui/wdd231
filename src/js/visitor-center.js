import "../css/style.css"; // we can do this because we are using Vite...
import "../css/visitor-center.css";
import setHeaderFooter from "./setHeaderFooter.mjs";
import { getParkData, getParkVisitorCenterDetails } from "./parkService.mjs";
import {
    vcInfoTemplate,
    vcTitleTemplate,
    vcDetailsTemplate,
    vcAmenityTemplate,
    vcImageTemplate,
    listTemplate,
    vcAddressesListTemplate,
    vcDirectionsTemplate,
    vcContactsTemplate
} from "./templates.mjs";

function getParam(param) {
    const search = location.search;
    const params = new URLSearchParams(search);
    return params.get(param);
}

function buildPage(data) {
  // --- Title and main info ---
  document.querySelector(".vc-name").innerHTML = vcTitleTemplate(data.name);
  document.querySelector(".vc-info").innerHTML = vcInfoTemplate(data);

  const detailsEl = document.querySelector(".vc-details-list");
  detailsEl.innerHTML = "";

  // --- Addresses ---
  const addressHTML = vcAddressesListTemplate(data.addresses);
  detailsEl.insertAdjacentHTML(
    "beforeend",
    vcDetailsTemplate("vcAddresses", "Addresses", "heading-icon_map-pin", addressHTML)
  );

  // --- Directions ---
  const directionsHTML = vcDirectionsTemplate(data.directionsInfo);
  detailsEl.insertAdjacentHTML(
    "beforeend",
    vcDetailsTemplate("vcDirections", "Directions", "directions", directionsHTML)
  );

  // --- Amenities ---
  const amenitiesHTML = listTemplate(data.amenities, vcAmenityTemplate);
  detailsEl.insertAdjacentHTML(
    "beforeend",
    vcDetailsTemplate("vcAmenities", "Amenities", "heading-icon_info", amenitiesHTML)
  );

  // --- Contacts ---
  let contactHTML = "<p>No contact information available.</p>";
  if (data.contacts) {
    contactHTML = vcContactsTemplate(data.contacts);
  }
  detailsEl.insertAdjacentHTML(
    "beforeend",
    vcDetailsTemplate("vcContacts", "Contact Information", "phone", contactHTML)
  );

  // --- Image Gallery ---
  const galleryContainer = document.querySelector(".vc-gallery ul");
  galleryContainer.innerHTML = ""; // clear previous
  data.images.forEach(img => {
      const li = document.createElement("li");
      const imageHTML = vcImageTemplate(img); // returns <img ...>
      li.innerHTML = imageHTML;
      galleryContainer.appendChild(li);
  });
}

function setupAccordions() {
    // Add accordion functionality here if needed
}

async function init() {
    const parkData = await getParkData();
    const id = getParam("id");
    const centerDetails = await getParkVisitorCenterDetails(id);
    console.log(centerDetails);
    console.log("URL param id:", id);
    console.log("Visitor center data:", centerDetails);
    setHeaderFooter(parkData);
    buildPage(centerDetails);

    setupAccordions();
}

document.addEventListener("DOMContentLoaded", () => {
    init();
});