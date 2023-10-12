const UNSPLASH_URL = "https://api.unsplash.com/photos/";
const container = document.getElementById("container");
let images;
let ScrollY = 0;
let pageNumber = 1;
async function getPhotos(pageNumber) {
  const response = await fetch(`${UNSPLASH_URL}?page=${pageNumber}`, {
    headers: {
      Authorization: "Client-ID t5N7hzXGeGnPh6dmdwzRbbQuVmVFE3GRNmQ5SVE1EdQ",
    },
  });

  const data = await response.json();
  //console.log(`pageNumber ${pageNumber} - ${data[0].urls.small}`);
  return data;
}

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      console.log('before', entry);
      // entry.target.classList.toggle("hide", !entry.isIntersecting);
      if (!entry.isIntersecting) {
        entry.target.classList.add("hide");
      } else {
        entry.target.classList.remove("hide");
      }
      console.log('after', entry);
    });
  },
  {
    threshold: 0.5,
  });

function renderPhotos(photos) {
  photos.map((photo, index) => {
    let image = document.createElement("img");
    image.classList.add("image");
    image.src = photo.urls.small;
    image.id = `image-${pageNumber}-${index}`;
    image.loading = 'lazy'
    container.appendChild(image);
  });
  images = document.querySelectorAll(".image");
  // console.log(images);



  images.forEach((image) => {
    // console.log(image)
    observer.observe(image);
  });
}

const fetchData = async () => {
  if (
    window.scrollY + window.innerHeight >=
    document.body.offsetHeight - 1000
  ) {
    if (pageNumber > 0 && ScrollY > window.scrollY) {
      //pageNumber--;
    } else {
      pageNumber++;
    }
    const listPhotos = await getPhotos(pageNumber);
    renderPhotos(listPhotos);
    ScrollY = window.scrollY;
  }
};




window.addEventListener("scroll", fetchData);
fetchData();





