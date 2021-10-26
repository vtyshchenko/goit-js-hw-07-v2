import { galleryItems } from "./gallery-items.js";
// Change code below this line

const galleryRef = document.querySelector(".gallery");
galleryRef.innerHTML = createMarkup();
// galleryRef.addEventListener("click", onClickPicture);

let newInstance = "";
let navButtons = "";
let closeButton = "";
let idx = 0;

function createMarkup() {
  let markup = "";
  for (const { preview, original, description } of galleryItems) {
    markup += `<a class="gallery__item"  href="${original}"> <img class="gallery__image" src="${preview}" alt="${description}" /></a>`;
  }

  return markup;
}

// function onKeyPress(event) {
//   switch (event.key) {
//     case "Esc":
//     case "Escape":
//       newInstance.close();
//       break;
//     case "Left":
//     case "ArrowLeft":
//       idx = getImageForView(idx, -1);
//       break;
//     case "Right":
//     case "ArrowRight":
//       idx = getImageForView(idx, 1);
//       break;
//   }
// }

// function getImageForView(number, step) {
//   const element = newInstance.element();
//   number += step;
//   if (number < 0) {
//     number = galleryItems.length - 1;
//   } else if (number === galleryItems.length) {
//     number = 0;
//   }
//   element.firstElementChild.children[0].src = galleryItems[number].original;
//   element.firstElementChild.children[0].alt = galleryItems[number].description;

//   return number;
// }

// function onClickPicture(e) {
//   e.preventDefault();
//   if (e.target.tagName === "IMG") {
//     idx = Number(e.target.attributes.id.value.substring(1));

//     newInstance = basicLightbox.create(
//       `<img src="${galleryItems[idx].original}" alt="${galleryItems[idx].description}">`,
//       {
//         onShow: (instance) => {
//           const elem = instance.element();
//           elem.innerHTML += `<button type="button" title="Close" class="basicLightbox__nav--close-btn">×</button>
//             <div class="basicLightbox__nav">
//               <button type="button" title="Previous" class="prev basicLightbox__nav--arrow">
//                 Previous</button
//               ><button type="button" title="Next" class="next basicLightbox__nav--arrow">Next</button>
//             </div>`;

//           navButtons = elem.querySelector(".basicLightbox__nav");
//           closeButton = elem.querySelector(".basicLightbox__nav--close-btn");

//           navButtons.addEventListener("click", onClickButton);
//           closeButton.addEventListener("click", onCloseButton);

//           window.addEventListener("keyup", onKeyPress);
//         },
//         onClose: (instance) => {
//           navButtons.removeEventListener("click", onClickButton);
//           closeButton.removeEventListener("click", onCloseButton);
//           window.removeEventListener("keyup", onKeyPress);
//         },
//       }
//     );

//     newInstance.show();
//   }
// }

// function onClickButton(e) {
//   if (e.target.classList.contains("next")) {
//     idx = getImageForView(idx, 1);
//   } else if (e.target.classList.contains("prev")) {
//     idx = getImageForView(idx, -1);
//   }
// }

// function onCloseButton(e) {
//   newInstance.close();
// }
