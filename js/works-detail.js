// reverse the order of the work cards
function workCardShouldReverse(index) {
  if (index % 2 === 0) {
    return 'row-reverse';
  }
  return '';
}

// create the breadcrumbs
function breadcrumbsHtml(workObj, key, bread = '') {
  /* eslint-disable no-restricted-syntax */
  for (let breadcrumb in workObj[key].breadcrumbs) {
    bread += `<li>${workObj[key].breadcrumbs[breadcrumb]}</li>`;
  }
  /* eslint-enable no-restricted-syntax */

  return bread;
}

// create the language list
function languageHtml(workObj, key, langList = '') {
  /* eslint-disable no-restricted-syntax */
  for (let lang in workObj[key].lang_list) {
    langList += `<li><span>${workObj[key].langList[lang]}</span></li>`;
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
  index++;
  workCard +=
    `
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
/* eslint-enable no-restricted-syntax */

// append the work cards to the works container
workCardContainer.innerHTML = workCard;