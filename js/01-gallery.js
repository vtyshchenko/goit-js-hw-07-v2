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

function lightboxButtonsAdd(instance) {
  const elem = instance.element();
  elem.innerHTML += `<button type="button" title="Close" class="basicLightbox__nav--close-btn">×</button>
      <div class="basicLightbox__nav">
        <button type="button" title="Previous" class="prev basicLightbox__nav--arrow">
          Previous</button
        ><button type="button" title="Next" class="next basicLightbox__nav--arrow">Next</button>
      </div>`;

  navButtons = elem.querySelector(".basicLightbox__nav");
  closeButton = elem.querySelector(".basicLightbox__nav--close-btn");
}

function lightboxListenersAdd() {
  closeButton.addEventListener("click", onCloseButton);
  navButtons.addEventListener("click", onClickButton);
  window.addEventListener("keyup", onKeyPress);
}

function lightboxListenersRemove() {
  closeButton.removeEventListener("click", onCloseButton);
  navButtons.removeEventListener("click", onClickButton);
  window.removeEventListener("keyup", onKeyPress);
}

function onClickButton(e) {
  if (e.target.classList.contains("next")) {
    idx = getImageForView(idx, 1);
  } else if (e.target.classList.contains("prev")) {
    idx = getImageForView(idx, -1);
  }
}

function onClickPicture(e) {
  e.preventDefault();
  if (e.target.tagName === "IMG") {
    idx = Number(e.target.attributes.id.value.substring(1));

    newInstance = basicLightbox.create(
      `<img src="${galleryItems[idx].original}" alt="${galleryItems[idx].description}">`,
      {
        onShow: (instance) => {
          lightboxButtonsAdd(instance);
          lightboxListenersAdd();
        },
        onClose: (instance) => {
          lightboxListenersRemove();
        },
      }
    );

    newInstance.show();
  }
}

function onCloseButton(e) {
  newInstance.close();
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
