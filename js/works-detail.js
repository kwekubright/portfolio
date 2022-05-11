//select the works container
const workCardContainer = document.querySelector(".works-grid-container");
let workCard = "";
let index = 0;

//create the work cards
for (let key in works) {
  index++;
  workCard +=
    `
    <div class="flex works-grid-item ${wordCardShouldReverse(index)}">
      <div class="work-image">
        <img class="width-100" src="${works[key].featured_image}" alt="${works[key].title}">
      </div>
      <div class="flex work-details-wrapper">
      <h3 class="section-title margin-top-12">${works[key].title}</h3>
      <div class="work-period"> ${breadcrumbsHtml(works, key)} </div > 
      <p class="work-description text-color-primary margin-top-20">${works[key].description}</p>
      ${languageHtml(works, key)}
      <button type="button" class="button button-enabled see-project-button" data-work="${key}">See Project</button>
      </div>
    </div>
  `;
}

//append the work cards to the works container
workCardContainer.innerHTML = workCard;

//reverse the order of the work cards
function wordCardShouldReverse(integ) {
  if (index % 2 === 0) {
    return "row-reverse";
  } else {
    return "";
  }
}

//create the breadcrumbs
function breadcrumbsHtml(workObj, key) {
  let bread = "<ul>";
  for (let breadcrumb in workObj[key].breadcrumbs) {
    bread += `<li>${workObj[key].breadcrumbs[breadcrumb]}</li>`;
  }
  bread += "</ul>";
  return bread;
}

//create the language list
function languageHtml(workObj, key) {
  let lang_list = `<ul class="work-categories margin-top-12 padding-0">`;
  for (let lang in workObj[key].lang_list) {
    lang_list += `<li><span>${workObj[key].lang_list[lang]}</span></li>`;
  }
  lang_list += "</ul>";
  return lang_list;
}