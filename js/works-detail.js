// ============================================================
// Work object
// ============================================================

const works = {
  avocode: {
    title: 'Avocode Portfolio',
    description: 'A daily selection of privately personalized reads; no accounts or sign-ups required.',
    details: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it 1960s with the releaLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it 1960s with the releorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum han printer took a galley of type and scrambled it 1960s with the releawn printer took a galley of type and scrambled it 1960s with the releaLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it 1960s with the relea',
    featured_image: 'images/works/avocode.jpeg',
    lang_list: ['javascript', 'html', 'css'],
    breadcrumbs: ['Home', 'Works', 'Calenda'],
    source: 'https://github.com/kwekubright/portfolio',
    live_demo: 'https://kwekubright.github.io/portfolio/',
  },
  calenda: {
    title: 'Calenda Web App',
    description: 'A daily selection of privately personalized reads; no accounts or sign-ups required.',
    details: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it 1960s with the releaLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it 1960s with the releorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum han printer took a galley of type and scrambled it 1960s with the releawn printer took a galley of type and scrambled it 1960s with the releaLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it 1960s with the relea',
    featured_image: 'images/works/availability.jpeg',
    lang_list: ['javascript', 'html', 'css'],
    breadcrumbs: ['Home', 'Works', 'Calenda'],
    source: 'https://github.com/kwekubright/portfolio',
    live_demo: 'https://kwekubright.github.io/portfolio/',
  },
  printing: {
    title: 'Printing Made Easy',
    description: 'A daily selection of privately personalized reads; no accounts or sign-ups required.',
    details: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it 1960s with the releaLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it 1960s with the releorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum han printer took a galley of type and scrambled it 1960s with the releawn printer took a galley of type and scrambled it 1960s with the releaLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it 1960s with the relea',
    featured_image: 'images/works/printing.png',
    lang_list: ['javascript', 'html', 'css'],
    breadcrumbs: ['Home', 'Works', 'Calenda'],
    source: 'https://github.com/kwekubright/portfolio',
    live_demo: 'https://kwekubright.github.io/portfolio/',
  },
  gymfit: {
    title: 'GymFit',
    description: 'A daily selection of privately personalized reads; no accounts or sign-ups required.',
    details: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it 1960s with the releaLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it 1960s with the releorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum han printer took a galley of type and scrambled it 1960s with the releawn printer took a galley of type and scrambled it 1960s with the releaLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it 1960s with the relea',
    featured_image: 'images/works/gymfit.png',
    lang_list: ['javascript', 'html', 'css'],
    breadcrumbs: ['Home', 'Works', 'Calenda'],
    source: 'https://github.com/kwekubright/portfolio',
    live_demo: 'https://kwekubright.github.io/portfolio/',
  },
};

// ============================================================
// Work Detail Logic
// ============================================================

// reverse the order of work card
function workCardShouldReverse(index) {
  if (index % 2 === 0) {
    return 'row-reverse';
  }
  return '';
}

// create the breadcrumbs
function breadcrumbsHtml(workObj, key, bread = '') {
  /* eslint-disable no-restricted-syntax */
  for (const breadcrumb in workObj[key].breadcrumbs) {
    if (breadcrumb) {
      bread += `<li>${workObj[key].breadcrumbs[breadcrumb]}</li>`;
    }
  }
  /* eslint-enable no-restricted-syntax */

  return bread;
}

// create the language list
function languageHtml(workObj, key, langList = '') {
  /* eslint-disable no-restricted-syntax */
  for (const lang in workObj[key].lang_list) {
    if (lang) {
      langList += `<li><span>${workObj[key].lang_list[lang]}</span></li>`;
    }
  }
  /* eslint-enable no-restricted-syntax */

  return langList;
}

//  select the works container
const workCardContainer = document.querySelector('.works-grid-container');
let workCard = '';
let index = 0;

// create the work cards

/* eslint-disable no-restricted-syntax */
for (const key in works) {
  if (key) {
    index += 1;
    workCard
      += `
        <div class="flex works-grid-item ${workCardShouldReverse(index)}">
          <div class="work-image">
            <img class="width-100" src="${works[key].featured_image}" alt="${works[key].title}">
          </div>
          <div class="flex work-details-wrapper">
          <h3 class="section-title margin-top-12">${works[key].title}</h3>
          <div class="work-period"> <ul>${breadcrumbsHtml(works, key)} </ul> </div> 
          <p class="work-description text-color-primary margin-top-20">${works[key].description}</p>
          <ul class="work-categories margin-top-12 padding-0">${languageHtml(works, key)}</ul>
          <button type="button" class="button button-enabled see-project-button" data-work="${key}">See Project</button>
          </div>
        </div>
      `;
  }
}
/* eslint-enable no-restricted-syntax */

// append the work cards to the works container
workCardContainer.innerHTML = workCard;

// ============================================================
// Work Modal Logic
// ============================================================

// function to  show the modal with the work details
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
  document.querySelector('.work-modal-breadcrumbs > ul').innerHTML = breadcrumbsHtml(works, work);
  // add the languages to the modal
  document.querySelector('.work-modal-languages > ul').innerHTML = languageHtml(works, work);
  // add live demo link
  document.querySelector('#work-modal-live-demo').href = workDetails.live_demo;
  // add source link
  document.querySelector('#work-modal-source').href = workDetails.source;
  // show the modal with transition
  document.querySelector('.modal').style.display = 'flex';
}

// show modal when see project button is clicked
const seeProjectButtons = document.querySelectorAll('.see-project-button');
seeProjectButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    showWorkModal(event.target.dataset.work);
    document.querySelector('.modal').style.display = 'flex';
  }, false);
});

// close modal when the close button is clicked
const closeModal = document.querySelector('.modal-close');
closeModal.addEventListener('click', () => {
  document.querySelector('.modal').style.display = 'none';
});