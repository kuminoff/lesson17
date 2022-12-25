"use script";

const inputModel = document.getElementById("model");
const inputManufacturer = document.getElementById("manufacturer");
const selectBody = document.getElementById("body");
const inputYear = document.getElementById("year");
const inputСolour = document.getElementById("colour");
const inputCost = document.getElementById("cost");
const inputAvail = document.getElementById("avail");
const submitBtn = document.getElementById("sumbit-btn");
const table = document.getElementById("tab");
const form = document.getElementById("form");
const thead = document.getElementById("thead");
const tbody = document.getElementById("tbody");
const carData =
  JSON.parse(localStorage.getItem("carData")) !== null
    ? JSON.parse(localStorage.getItem("carData"))
    : [];

class Car {
  constructor(model, manufacturer, year) {
    this.model = model;
    this.manufacturer = manufacturer;
    this.year = year;
  }
}

class Liftback extends Car {
  constructor(model, manufacturer, year, colour, cost, avail) {
    super(model, manufacturer, year);
    this.body = "лифтбек";
    this.colour = colour;
    this.cost = cost;
    this.avail = avail;
  }
}

class Convertible extends Car {
  constructor(model, manufacturer, year, colour, cost, avail) {
    super(model, manufacturer, year);
    this.body = "кабриолет";
    this.colour = colour;
    this.cost = cost;
    this.avail = avail;
  }
}

const saveCar = () => {
  const newCar =
    selectBody.value === "liftback"
      ? new Liftback(
          inputModel.value,
          inputManufacturer.value,
          inputYear.value,
          inputСolour.value,
          inputCost.value,
          inputAvail.value
        )
      : new Convertible(
          inputModel.value,
          inputManufacturer.value,
          inputYear.value,
          inputСolour.value,
          inputCost.value,
          inputAvail.value
        );
  carData.push(newCar);
  console.log(carData);
  localStorage.setItem("carData", JSON.stringify(carData));
  showTab();
};

const showTab = () => {
  tbody.innerHTML = "";
  carData.forEach(function (item, index) {
    const remove = document.createElement("tr");
    remove.innerHTML = `<button class="delete-btn">Удалить машину</button>`;
    const tr = document.createElement("tr");
    tr.innerHTML = `<th>${item.model}</th>
            <th>${item.manufacturer}</th>
            <th>${item.body}</th>
            <th>${item.year}</th>
            <th>${item.colour}</th>
            <th>${item.cost}</th>
            <th>${item.avail === "on" ? "Есть" : "Нет"}</th>
            <th>${remove.innerHTML}</th>`;
    tbody.append(tr);
    const deletBtn = document.querySelectorAll(".delete-btn");
    deletBtn[index].addEventListener("click", () => {
      tr.innerHTML = "";
      carData.splice(index, 1);
      localStorage.setItem("carData", JSON.stringify(carData));
      showTab();
    });
    inputModel.value = "";
    inputManufacturer.value = "";
    selectBody.childNodes[0].selected = true;
    inputYear.value = "";
    inputСolour.value = "";
    inputCost.value = "";
    inputAvail.value = "";
  });
};

if (carData !== []) {
  showTab();
}

form.addEventListener("submit", saveCar);
