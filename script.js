// Get the API key from the meta tag
let apiKey = document.querySelector('meta[name="api-key"]').getAttribute('content');

function loadImages() {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.pexels.com/v1/search?query=montagna', true); 
  xhr.setRequestHeader('Authorization', apiKey);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      let response = JSON.parse(xhr.responseText);
      let imageRow = document.getElementById('imageRow');

      // Remove existing images
      while (imageRow.firstChild) {
        imageRow.removeChild(imageRow.firstChild);
      }

      // Load images from the API response
      response.photos.forEach(function (photo) {
        let card = document.createElement('div');
        card.classList.add('col-md-4');
        card.innerHTML = `
          <div class="card mb-4 shadow-sm">
            <img src="${photo.src.medium}" alt="${photo.photographer}" class="bd-placeholder-img card-img-top">
            <div class="card-body">
              <h5 class="card-title">${photo.photographer}</h5>
              <p class="card-text">${photo.photographer_url}</p>
            </div>
          </div>
        `;
        imageRow.appendChild(card);
      });
    }
  };

  xhr.send();
}