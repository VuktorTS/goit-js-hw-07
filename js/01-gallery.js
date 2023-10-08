import { galleryItems } from "./gallery-items.js";
// Change code below this line
const listGallery = document.querySelector(".gallery");

function renderMarkup(galleryItems) {
  return galleryItems
    .map(({ description, original, preview }) => {
      return `
    <li class="gallery__item">
        <a class="gallery__link" href="${original}">
            <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
            />
        </a>
    </li>
    `;
    })
    .join("");
}

listGallery.insertAdjacentHTML("beforeend", renderMarkup(galleryItems));
listGallery.addEventListener("click", onClick);

function onClick(event) {
  event.preventDefault();

  if (!event.target.classList.contains("gallery__image")) {
    return;
  }

  const instance = basicLightbox.create(`
	    <img
            src="${event.target.dataset.source}"
            alt="${event.target.alt}"
        />
`);

  instance.show();
}
