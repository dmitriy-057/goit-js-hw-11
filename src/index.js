import axios from "axios";
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';

// подключение библиотеки SimpleLightbox
let gallery = new SimpleLightbox(".gallery a", {
  captions:true,
  captionSelector: "img",
  // captionsData: "alt",
  // captionPosition: "bottom",
  // captionDelay: 250,
  enableKeyboard: true,
});

const refsEl ={
  form: document.querySelector(".search-form"),
  input:document.querySelector("input"),
  getBtn: document.querySelector("button"),
  galleryContainer: document.querySelector(".gallery")
}

refsEl.getBtn.addEventListener("click", sumbitSurch);

function sumbitSurch(e) {
  e.preventDefault()
  getPosts()
}

const getPosts = async () => {
  // e.preventDefault()
  try {
    const response = await axios.get(`https://pixabay.com/api/?key=29209271-716f3ea82b952e36eef48fa19&q=${refsEl.input.value}&image_type=photo&orientation=horizontal&safesearch=true`);
    
    createList(response.data.hits);
    
  
    // createImagesCardsMarkup(response.galleryItems)
  } catch (error) {
    console.log(error);
  }
};

// getPosts()


function createList(data) {
  const result = data.map(({ webformatURL,  largeImageURL, tags, likes, views, comments, downloads}) => {
    return `
    <div class="img-thumb">
    <a href="${webformatURL}">
  <img  src="${largeImageURL}" alt="${tags }  loading="lazy" 
  />
  </a>

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
};









