"use script";

const inputName = document.getElementById("name");
const inputAutor = document.getElementById("autor");
const selectGenre = document.getElementById("genre");
const inputYear = document.getElementById("year");
const inputPages = document.getElementById("pages");
const inputCost = document.getElementById("cost");
const inputAvail = document.getElementById("avail");
const submitBtn = document.getElementById("sumbit-btn");
const table = document.getElementById("tab");
const form = document.getElementById("form");
const thead = document.getElementById("thead");
const tbody = document.getElementById("tbody");
const bookData =
  JSON.parse(localStorage.getItem("bookData")) !== null
    ? JSON.parse(localStorage.getItem("bookData"))
    : [];

class Book {
  constructor(name, autor, year) {
    this.name = name;
    this.autor = autor;
    this.year = year;
  }
}

class Sience extends Book {
  constructor(name, autor, year, pages, cost, avail) {
    super(name, autor, year);
    this.genre = "Научная фантастика";
    this.pages = pages;
    this.cost = cost;
    this.avail = avail;
  }
}

class Horror extends Book {
  constructor(name, autor, year, pages, cost, avail) {
    super(name, autor, year);
    this.genre = "Ужасы";
    this.pages = pages;
    this.cost = cost;
    this.avail = avail;
  }
}

const saveBook = () => {
  const newBook =
    selectGenre.value === "sci"
      ? new Sience(
          inputName.value,
          inputAutor.value,
          inputYear.value,
          inputPages.value,
          inputCost.value,
          inputAvail.value
        )
      : new Horror(
          inputName.value,
          inputAutor.value,
          inputYear.value,
          inputPages.value,
          inputCost.value,
          inputAvail.value
        );
  bookData.push(newBook);
  console.log(bookData);
  localStorage.setItem("bookData", JSON.stringify(bookData));
  showTab();
};

const showTab = () => {
  tbody.innerHTML = "";
  bookData.forEach(function (item, index) {
    const remove = document.createElement("tr");
    remove.innerHTML = `<button class="delete-btn">Удалить книгу</button>`;
    const tr = document.createElement("tr");
    tr.innerHTML = `<th>${item.name}</th>
            <th>${item.autor}</th>
            <th>${item.genre}</th>
            <th>${item.year}</th>
            <th>${item.pages}</th>
            <th>${item.cost}</th>
            <th>${item.avail === "on" ? "Есть" : "Нет"}</th>
            <th>${remove.innerHTML}</th>`;
    tbody.append(tr);
    const deletBtn = document.querySelectorAll(".delete-btn");
    deletBtn[index].addEventListener("click", () => {
      tr.innerHTML = "";
      bookData.splice(index, 1);
      localStorage.setItem("bookData", JSON.stringify(bookData));
      showTab();
    });
    inputName.value = "";
    inputAutor.value = "";
    selectGenre.childNodes[0].selected = true;
    inputYear.value = "";
    inputPages.value = "";
    inputCost.value = "";
    inputAvail.value = "";
  });
};

if (bookData !== []) {
  showTab();
}

form.addEventListener("submit", saveBook);
