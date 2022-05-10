//my works object
let works = {
  "avocode": {
    "title": "Avocode Portfolio",
    "description": "A daily selection of privately personalized reads; no accounts or sign-ups required.",
    "featured_image": "images/works/avocode.jpeg",
    "lang_list": ["javascript", "html", "css"],
    "breadcrumbs": ["Home", "Works", "Calenda"],
    "link": "",
    "source": "",
    "live_demo": "",
  },
  "calenda": {
    "title": "Calenda Web App",
    "description": "A daily selection of privately personalized reads; no accounts or sign-ups required.",
    "featured_image": "images/works/availability.jpeg",
    "lang_list": ["javascript", "html", "css"],
    "breadcrumbs": ["Home", "Works", "Calenda"],
    "link": "",
    "source": "",
    "live_demo": "",
  },
  "printing": {
    "title": "Printing Made Easy",
    "description": "A daily selection of privately personalized reads; no accounts or sign-ups required.",
    "featured_image": "images/works/printing.png",
    "lang_list": ["javascript", "html", "css"],
    "breadcrumbs": ["Home", "Works", "Calenda"],
    "link": "",
    "source": "",
    "live_demo": "",
  },
  "gymfit": {
    "title": "GymFit",
    "description": "A daily selection of privately personalized reads; no accounts or sign-ups required.",
    "featured_image": "images/works/gymfit.png",
    "lang_list": ["javascript", "html", "css"],
    "breadcrumbs": ["Home", "Works", "Calenda"],
    "link": "",
    "source": "",
    "live_demo": "",
  }
}

//select the works container
let workCardContainer = document.querySelector(".works-grid-container");
let workCard = "";
let index = 0;

//create the work cards
for (let work in works) {
  index++;
  workCard +=
    `
    <div class="flex works-grid-item ${wordCardShouldReverse(index)}">
      <div class="work-image">
        <img class="width-100" src="${works[work].featured_image}" alt="${works[work].title}">
      </div>
      <div class="flex work-details-wrapper">
      <h3 class="section-title margin-top-12">${works[work].title}</h3>
      <div class="work-period"> ${breadcrumbsHtml(works, work)} </div > 
      <p class="work-description text-color-primary margin-top-20">${works[work].description}</p>
      ${languageHtml(works, work)}
      <button type="button" class="button button-enabled">See Project</button>
      </div>
    </div>
  `;
}
//append the work cards to the works container
workCardContainer.innerHTML = workCard;

//reverse the order of the work cards
function wordCardShouldReverse() {
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