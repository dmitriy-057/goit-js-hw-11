import axios from "axios";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';

var lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
//Параметри для пагінації
const params = {
  page: 1,
  per_page: 40,
  q: '',
};

const refsEl ={
  form: document.querySelector(".search-form"),
  input:document.querySelector("input"),
  getBtn: document.querySelector("button"),
  galleryContainer: document.querySelector(".gallery")
}

refsEl.getBtn.addEventListener("click", onSumbitForm);

function onSumbitForm() {
  // const getGallery = refsEl.input.value;
  // if(getGallery = "") {
  //   return
  // }
   getPosts()
}

const getPosts = async () => {

  try {
    const response = await axios.get(`https://pixabay.com/api/?key=29209271-716f3ea82b952e36eef48fa19&q=${refsEl.input.value}&image_type=photo&orientation=horizontal&safesearch=true`);
    
    createList(response.data.hits);
  } 
  
  catch (error) {
    error =>
      Notiflix.Notify.warning("Sorry, there are no images matching your search query. Please try again.")
  
};

}


function createList(data) {
  const result = data.map(({ webformatURL,  largeImageURL, tags, likes, views, comments, downloads}) => {
    return `
    <div class="photo-card">
      <div class="img-thumb">
          <a class="gallery_link" href="${webformatURL}">
          <img  class="gallery__image" 
           src="${largeImageURL}" alt="${tags }  loading="lazy" 
          />
        </a>
      </div>
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
  
  .join('');
  
  refsEl.galleryContainer.insertAdjacentHTML(
    "beforeend", result);
    gallery.refresh()
    refsEl.input.innerHTML = '';
};









