import { galleryItems } from "./gallery-items.js";
// Change code below this line
const listGallery = document.querySelector(".gallery");

listGallery.insertAdjacentHTML("beforeend", renderMarkup(galleryItems));
listGallery.addEventListener("click", onClick);

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

function onClick(event) {
  event.preventDefault();

  if (!event.target.classList.contains("gallery__image")) {
    return;
  }

  const instance = basicLightbox.create(
    `
	    <img
            src="${event.target.dataset.source}"
            alt="${event.target.alt}"
        />
`,
    {
      onShow: () => {
        window.addEventListener("keydown", onCloseModal);
      },
      onClose: () => {
        window.removeEventListener("keydown", onCloseModal);
      },
    }
  );
  function onCloseModal(event) {
    if (event.code === "Escape") {
      instance.close(() => console.log("lightbox not visible anymore"));
    }
  }
  instance.show();
}
