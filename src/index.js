import { fetchImages } from "./js/fetchImages";
import Notiflix from "notiflix";
import createGalleryCards from "./templates/gallery-card.hbs";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const searchFormEl = document.getElementById("search-form");
const galleryEl = document.querySelector(".gallery");
const loadMoreBtEl = document.querySelector(".load-more");

let query = "";
let page = 1;
const perPage = 40;

searchFormEl.addEventListener("submit", onSearchForm);

function renderGalleryImages(images) {
 if (!galleryEl) {
  return;
 }
 galleryEl.innerHTML = createGalleryCards(images);
 loadMoreBtEl.classList.remove("is-hidden");
}

function onSearchForm(e) {
 e.preventDefault();
 page = 1;
 query = e.currentTarget.elements.searchQuery.value.trim();
 galleryEl.innerHTML = "";

 if (query === "") {
  loadMoreBtEl.classList.add("is-hidden");
  Notiflix.Notify.failure(
   "The search string cannot be empty. Please specify your search query."
  );
  return;
 }

 fetchImages(query, page, perPage)
  .then((data) => {
		if (data.totalHits === 0) {
		loadMoreBtEl.classList.add("is-hidden");
    Notiflix.Notify.failure(
     "Sorry, there are no images matching your search query. Please try again."
    );
		} else {
    renderGalleryImages(data.hits);
    simpleLightBox = new SimpleLightbox(".gallery a").refresh();
    Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
   }
  })
  .catch((error) => console.log(error))
  .finally(() => {
   searchFormEl.reset();
  });
}

function handleMoreBtClick() {
	page += 1;
	fetchImages(query, page, perPage)
  .then((data) => {
   galleryEl.insertAdjacentHTML("beforeend", createGalleryCards(data.hits));
		simpleLightBox = new SimpleLightbox('.gallery a').refresh();
		
		const totalPages = Math.ceil(data.totalHits / perPage )
		if (page >= totalPages) {
		 loadMoreBtEl.classList.add("is-hidden");
   		Notiflix.Notify.failure(
   		'Sorry, there are no more pictures according to your request',
   	);
   }
		
   const { height: cardHeight } = document
    .querySelector(".gallery")
    .firstElementChild.getBoundingClientRect();

   window.scrollBy({
    top: cardHeight * 2,
    behavior: "smooth",
   });
	}).catch((err) => {
   console.log(err);
  });
}

loadMoreBtEl.addEventListener("click", handleMoreBtClick);