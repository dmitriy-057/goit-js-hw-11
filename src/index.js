import axios from "axios";
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox"; 
import "simplelightbox/dist/simple-lightbox.min.css";

const refsEl ={
  form: document.querySelector(".search-form"),
  input:document.querySelector("input"),
  getBtn: document.querySelector("button"),
  galleryContainer: document.querySelector(".gallery")
}

const getPosts = async (e) => {
  e.preventDefault()
  try {
    const response = await axios.get(`https://pixabay.com/api/?key=29210870-5c756012ce316252fd55732c8&q=${refsEl.input.value}&image_type=photo&orientation=horizontal&safesearch=true`);
    createImagesCardsMarkup(response.galleryItems)
  } catch (error) {
    console.log(error);
  }
};





function createImagesCardsMarkup(galleryItems) {
  return galleryItems
    .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
      return `
       <div class="photo-card">
      <img href="${webformatURL}" src="${largeImageURL}" alt="${tags }" loading="lazy" />
      <div class="info">
        <p class="info-item">
          <b>${likes}</b>
        </p>
        <p class="info-item">
          <b>${views}</b>
        </p>
        <p class="info-item">
          <b>${comments}</b>
        </p>
        <p class="info-item">
          <b>${downloads}</b>
        </p>
      </div>
    </div>
       `;
    })
    .join("");
}


refsEl.getBtn.addEventListener("click", getPosts);
refsEl.galleryContainer.insertAdjacentHTML(
  "beforeend",
  createImagesCardsMarkup(galleryItems)
);