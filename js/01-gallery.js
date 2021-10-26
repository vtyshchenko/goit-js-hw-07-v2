import { galleryItems } from "./gallery-items.js";
// Change code below this line

const galleryRef = document.querySelector(".gallery");
galleryRef.innerHTML = createMarkup();
galleryRef.addEventListener("click", onClickPicture);

let newInstance = "";
let navButtons = "";
let closeButton = "";
let idx = 0;

function createMarkup() {
  let markup = "";
  for (let i = 0; i < galleryItems.length; i += 1) {
    const { preview, original, description } = galleryItems[i];
    markup += `<div class="gallery__item">
      <a class="gallery__link" href="${original}">
        <img
          id="#${i}"
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
        />
      </a>
    </div>`;
  }

  return markup;
}

function onKeyPress(event) {
  switch (event.key) {
    case "Esc":
    case "Escape":
      newInstance.close();
      break;
    case "Left":
    case "ArrowLeft":
      idx = getImageForView(idx, -1);
      break;
    case "Right":
    case "ArrowRight":
      idx = getImageForView(idx, 1);
      break;
  }
}

function getImageForView(number, step) {
  const element = newInstance.element();
  number += step;
  if (number < 0) {
    number = galleryItems.length - 1;
  } else if (number === galleryItems.length) {
    number = 0;
  }
  element.firstElementChild.children[0].src = galleryItems[number].original;
  element.firstElementChild.children[0].alt = galleryItems[number].description;

  return number;
}

function onClickPicture(e) {
  e.preventDefault();
  if (e.target.tagName === "IMG") {
    idx = Number(e.target.attributes.id.value.substring(1));

    newInstance = basicLightbox.create(
      `<img src="${galleryItems[idx].original}" alt="${galleryItems[idx].description}">`,
      {
        onShow: (instance) => {
          const elem = instance.element();
          elem.innerHTML += `<button type="button" title="Close" class="slbCloseBtn">×</button>
            <div class="slbArrows">
              <button type="button" title="Previous" class="prev slbArrow">
                Previous</button
              ><button type="button" title="Next" class="next slbArrow">Next</button>
            </div>`;

          navButtons = elem.querySelector(".slbArrows");
          closeButton = elem.querySelector(".slbCloseBtn");

          navButtons.addEventListener("click", onClickButton);
          closeButton.addEventListener("click", onCloseButton);

          window.addEventListener("keyup", onKeyPress);
        },
        onClose: (instance) => {
          navButtons.removeEventListener("click", onClickButton);
          closeButton.removeEventListener("click", onCloseButton);
          window.removeEventListener("keyup", onKeyPress);
        },
      }
    );

    newInstance.show();
  }
}

function onClickButton(e) {
  console.log(e);
  if (e.target.classList.contains("next")) {
    idx = getImageForView(idx, 1);
  } else if (e.target.classList.contains("prev")) {
    idx = getImageForView(idx, -1);
  }
}

function onCloseButton(e) {
  newInstance.close();
}
