let root = document.querySelector(".root .container .row");
let select = document.querySelector("form .container .select");
let fil = document.querySelector(".filter .container .row");
let search = document.querySelector(".search .container .row");
let detail = document.querySelector(".details .container .row");
let input = document.querySelector("form .input");
let icon = document.querySelector("header .icon");
let dark = document.querySelector("header .icon .dark");
let light = document.querySelector("header .icon .light");
let up = document.querySelector(".up i");
let data = [];
let filter = [];
let searchFilter = [];

window.addEventListener("scroll", (e) => {
  if (window.scrollY >= 900) {
    up.classList.add("d-block");
  } else {
    up.classList.remove("d-block");
  }
});

up.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

icon.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
  dark.classList.toggle("d-none");
  light.classList.toggle("d-none");
});

input.addEventListener("focus", () => {
  if (document.body.classList.contains("dark-theme")) {
    input.style.backgroundColor = "hsl(209, 23%, 22%)";
    input.style.color = "#fff";
  } else {
    input.style.backgroundColor = "#fff";
    input.style.color = "hsl(200, 15%, 8%)";
  }
});

document.forms[0].addEventListener("submit", (e) => {
  e.preventDefault();
});

input.addEventListener("change", () => {
  searchFilter = data.filter((ser) => {
    return ser.name.common.toLowerCase() == input.value.toLowerCase();
  });
  if (searchFilter.length == 0) {
    input.value = "";
    input.setAttribute("placeholder", "Invalid Country Name...");
  } else {
    search.innerHTML = "";
    root.classList.add("d-none");
    displayone(searchFilter);
    document.querySelector(".search").classList.remove("d-none");
    document.querySelector(".filter").classList.add("d-none");
  }
});

select.addEventListener("change", () => {
  fil.innerHTML = "";
  let strUser = select.options[select.selectedIndex].text;
  filter = data.filter((dta) => {
    return dta.region.includes(strUser);
  });
  root.classList.add("d-none");
  displaycountr(filter);
  document.querySelector(".filter").classList.remove("d-none");
  document.querySelector(".search").classList.add("d-none");
  input.value = "";
});

const loadapi = async () => {
  const res = await fetch("https://restcountries.com/v3.1/all");
  data = await res.json();
  displaycountry(data);
};
loadapi();

const displaycountry = (data) => {
  data.map((el) => {
    let col = document.createElement("div");
    col.classList.add("col-md-6", "col-lg-3");
    let card = document.createElement("div");
    card.classList.add("item", "card", "border-0");
    col.appendChild(card);
    let img = document.createElement("img");
    img.classList.add("card-img-top");
    img.setAttribute("src", el.flags.svg);
    img.setAttribute("alt", "...");
    card.append(img);
    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    cardBody.innerHTML = `
            <h5 class="card-title fw-bold">${el.name.common}</h5>
            <h6>
              population: <span>${el.population.toLocaleString()}</span>
            </h6>
            <h6>
              region: <span>${el.region}</span>
            </h6>
            <h6>
              capital: <span>${el.capital}</span>
            </h6>`;
    card.appendChild(cardBody);
    root.appendChild(col);
  });
};
const displaycountr = (data) => {
  data.map((el) => {
    let col = document.createElement("div");
    col.classList.add("col-md-6", "col-lg-3");
    let card = document.createElement("div");
    card.classList.add("item", "card", "border-0");
    col.appendChild(card);
    let img = document.createElement("img");
    img.classList.add("card-img-top");
    img.setAttribute("src", el.flags.svg);
    img.setAttribute("alt", "...");
    card.append(img);
    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    cardBody.innerHTML = `
            <h5 class="card-title fw-bold">${el.name.common}</h5>
            <h6>
              population: <span>${el.population.toLocaleString()}</span>
            </h6>
            <h6>
              region: <span>${el.region}</span>
            </h6>
            <h6>
              capital: <span>${el.capital}</span>
            </h6>`;
    card.appendChild(cardBody);
    fil.appendChild(col);
  });
};
const displayone = (data) => {
  data.map((el) => {
    let col = document.createElement("div");
    col.classList.add("col-md-6", "col-lg-3");
    let card = document.createElement("div");
    card.classList.add("item", "card", "border-0");
    col.appendChild(card);
    let img = document.createElement("img");
    img.classList.add("card-img-top");
    img.setAttribute("src", el.flags.svg);
    img.setAttribute("alt", "...");
    card.append(img);
    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    cardBody.innerHTML = `
            <h5 class="card-title fw-bold">${el.name.common}</h5>
            <h6>
              population: <span>${el.population.toLocaleString()}</span>
            </h6>
            <h6>
              region: <span>${el.region}</span>
            </h6>
            <h6>
              capital: <span>${el.capital}</span>
            </h6>`;
    card.appendChild(cardBody);
    search.appendChild(col);
  });
};

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("card-title")) {
    console.log(e.target.innerHTML);
    let l = data.filter((d) => {
      return d.name.common == e.target.innerHTML;
    });
    let details = l[0];
    console.log(details);
    console.log(details.name.nativename);
    console.log(details.currencies[Object.keys(details.currencies)[0]].name);
    console.log(details.borders);
    let html = `
    <div class="container">
      <button class="back"><i class="bi bi-arrow-left"></i> Back</button>
    </div>
    <div class="col-12 col-lg-6">
            <img src="${details.flags.svg}" alt="" />
          </div>
          <div class="col-12 col-lg-6 info">
            <h2 class="name fw-bold pb-2">${details.name.common}</h2>
            <div class="other">
              <div class="row">
                <div class="col-6">
                  <p class="native">Native Name: <span>${
                    details.name.common
                  }</span></p>
                  <p class="population">Population: <span>${details.population.toLocaleString()}</span></p>
                  <p class="region">Region: <span>${details.region}</span></p>
                  <p class="sub">Sub Region: <span>${
                    details.subregion
                  }</span></p>
                  <p class="capital">Capital: <span>${
                    details.capital
                  }</span></p>
                </div>
                <div class="col-6">
                  <p class="top">Top Level Domain: <span>${
                    details.tld[0]
                  }</span></p>
                  <p class="curr">Currencies: <span>${
                    details.currencies[Object.keys(details.currencies)[0]].name
                  }</span></p>
                  <p class="lang">Languages: <span>${
                    details.languages[Object.keys(details.languages)[0]]
                  }</span></p>
                </div>
              </div>
            </div>
            <div class="borderr pt-2 d-flex flex-wrap">
              Border Countries: ${
                details.borders !== undefined
                  ? details.borders.map((b) => `<span>${b}</span>`)
                  : `<span>Don't have borders</span>`
              }
            </div>
          </div>
    `;
    detail.innerHTML = html;
    document.querySelector(".details").classList.remove("d-none");
    root.classList.add("d-none");
    document.querySelector(".search").classList.add("d-none");
    document.querySelector(".filter").classList.add("d-none");
    document.forms[0].classList.add("d-none");
  }
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("back")) {
    root.classList.remove("d-none");
    document.querySelector(".details").classList.add("d-none");
    document.forms[0].classList.remove("d-none");
    input.value = "";
    select.value = "0";
  }
});
