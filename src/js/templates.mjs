import spritePath from "../images/sprite.symbol.svg";

export function parkInfoTemplate(info) {
  return `<a href="/" class="hero-banner__title">${info.name}</a>
    <p class="hero-banner__subtitle">
      <span>${info.designation}</span>
      <span>${info.states}</span>
    </p>`;
}

export function mediaCardTemplate(info) {
  return `<div class="media-card">
      <a href="${info.link}">
      <img src="${info.image}" alt="${info.name}" class="media-card__img">
      <h3 class="media-card__title">${info.name}</h3>
      </a>
      <p>${info.description}</p>
    </div>`;
}
function getMailingAddress(addresses) {
  const mailing = addresses.find((address) => address.type === "Mailing");
  return mailing;
}
function getVoicePhone(numbers) {
  const voice = numbers.find((number) => number.type === "Voice");
  return voice.phoneNumber;
}
export function footerTemplate(info) {
  const mailing = getMailingAddress(info.addresses);
  const voice = getVoicePhone(info.contacts.phoneNumbers);

  return `<section class="contact">
    <h3>Contact Info</h3>
    <h4>Mailing Address:</h4>
    <div><p>${mailing.line1}<p>
    <p>${mailing.city}, ${mailing.stateCode} ${mailing.postalCode}</p></div>
    <h4>Phone:</h4>
    <p>${voice}</p>
  </section>
    `;
}

//week 5 additions
export function alertTemplate(alert) {
  let alertType = "";
  // most of the alerts are one word and line up with the icons nicely. "Park Closure" is the exception
  switch (alert.category) {
    case "Park Closure":
      alertType = "closure";
      break;
    default:
      alertType = alert.category.toLowerCase();
  }
  return `<li class="alert">
  <svg class="icon" focusable="false" aria-hidden="true">
    <use xlink:href="${spritePath}#alert-${alertType}"></use>
  </svg>
  <div>
    <h3 class="alert-${alertType}">${alert.title}</h3>
    <p>${alert.description}</p>
  </div></li>`;
}

export function visitorCenterTemplate(center) {
  return `<li class="visitor-center">
  <h4>${center.name}</h4>
  <p>${center.description}</p>
  <p>${center.directionsInfo}</p>
  </li>`;
}

export function activityListTemplate(activities) {
  return activities.map((activity) => `<li>${activity.name}</li>`).join("");
}

//week 11 additions
export function iconTemplate(iconId) {
  return `<svg class="icon" role="presentation" focusable="false">
            <use
              xmlns:xlink="http://www.w3.org/1999/xlink"
              xlink:href="/images/sprite.symbol.svg#${iconId}"
            ></use>
          </svg>`;
}

export function vcDetailsTemplate(elementId, summaryText, iconId, content) {
  const openAttr = elementId === "vcContacts" ? "open" : "";
  return `<details name="vc-details" id="${elementId}" ${openAttr}>
            <summary>
              ${iconTemplate(iconId)}
              ${summaryText}
            </summary>
            ${content}
          </details>`;
}

export function vcTitleTemplate(text) {
  return `${iconTemplate("ranger-station")} ${text}`;
}

export function vcInfoTemplate(data) {
  const image = data.images[0];
  return `<figure>
            <img src="${image.url}" alt="${image.altText}" />
            <figcaption>${image.caption} <span>${image.credit}</span></figcaption>
          </figure>
          <p>${data.description}</p>`;
}
export function listTemplate(data, contentTemplate) {
  const html = data.map(contentTemplate);
  return `<ul>${html.join("")}</ul>`;
}

function vcAddressTemplate(data) {
  return `<section>
            <h3>${data.type} Address</h3>
            <address>
              ${data.line1}<br />
              ${data.city}, ${data.stateCode} ${data.postalCode}
            </address>
          </section>`;
}

export function vcAddressesListTemplate(data) {
  const physical = data.find((address) => address.type === "Physical");
  const mailing = data.find((address) => address.type === "Mailing");
  let html = vcAddressTemplate(physical);
  if (mailing) {
    html += vcAddressTemplate(mailing);
  }
  return html;
}
export function vcAmenityTemplate(data) {
  return `<li>${data}</li>`;
}
export function vcDirectionsTemplate(data) {
  return `<p>${data}</p>`;
}
export function vcContactsTemplate(data) {
    let emailHTML = "<p>No email available.</p>";
    if (data.emailAddresses && data.emailAddresses.length > 0) {
        emailHTML = `<a href="mailto:${data.emailAddresses[0].emailAddress}">Send this visitor center an email</a>`;
    }

    let phoneHTML = "<p>No phone available.</p>";
    if (data.phoneNumbers && data.phoneNumbers.length > 0) {
        phoneHTML = `<a href="tel:+1${data.phoneNumbers[0].phoneNumber}">${data.phoneNumbers[0].phoneNumber}</a>`;
    }

    return `<section class="vc-contact__email">
                <h3>Email Address</h3>
                ${emailHTML}
            </section>
            <section class="vc-contact__phone">
                <h3>Phone numbers</h3>
                ${phoneHTML}
            </section>`;
}



export function vcImageTemplate(data) {
  return `<li><img src="${data.url}" alt="${data.altText}" ><li>`;
}