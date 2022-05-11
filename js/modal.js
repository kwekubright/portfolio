// show modal when see project button is clicked
const seeProjectButtons = document.querySelectorAll('.see-project-button');
seeProjectButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    showWorkModal(event.target.dataset.work);
    document.querySelector('.modal').style.display = 'flex';
  }
  );
});

// close modal when the close button is clicked
const closeModal = document.querySelector('.modal-close');
closeModal.addEventListener('click', () => {
  document.querySelector('.modal').style.display = 'none';
});

// show the modal with the work details
function showWorkModal(work) {
  // fetch the work from the works object
  const workDetails = works[work];
  // insert work title to the modal
  document.querySelector('.modal-title').innerHTML = workDetails.title;
  // insert work featured image to the modal
  document.querySelector('.featured-image').src = workDetails.featured_image;
  // insert work description to the modal
  document.querySelector('.modal-description').innerHTML = workDetails.details;
  // add the breadcrumbs to the modal
  document.querySelector('.work-modal-breadcrumbs').innerHTML = breadcrumbsHtml(works, work);
  // add the languages to the modal
  document.querySelector('.work-modal-languages').innerHTML = languageHtml(works, work);
  // add live demo link 
  document.querySelector('#work-modal-live-demo').href = workDetails.live_demo;
  // add source link
  document.querySelector('#work-modal-source').href = workDetails.source;
  // show the modal with transition
  document.querySelector('.modal').style.display = 'flex';
}
