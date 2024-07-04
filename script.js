const id = (x) => {
  return document.getElementById(x);
};

let input = id("input");
let addBtn = id("add_btn");
let itemlist = localStorage.itemlist ? JSON.parse(localStorage.itemlist) : [];
let completedList = localStorage.completedList
  ? JSON.parse(localStorage.completedList)
  : [];
let listContainer = id("item_list_container");
let completedContainer = id("completed_list_container");
const renderList = function () {
  listContainer.innerHTML = "";

  for (let i = itemlist.length - 1; i >= 0; i--) {
    listContainer.innerHTML += `
        <div class="list-container">
          <div class="list-item" id="item-${i}">${itemlist[i]}</div>
          <div class="item-actions">
            <button onclick="editItem(${i})">Edit</button>
            <button onclick="deleteItem(${i})">Delete</button>
            <button id='completed${i}' onclick="completedItem(${i})">Completed</button>
          </div>
        </div>
      `;
    if (i == itemlist.length - 1)
      current_tasks.innerHTML = "<h1>Current tasks</h1>";
  }
  if (itemlist.length == 0) current_tasks.innerHTML = "";
};
renderList();
const renderCompleted = function () {
  if (completedList.length > 0)
    completedContainer.innerHTML = "<h1>Completed Tasks</h1>";

  console.log(completedList.length);
  for (let i = completedList.length - 1; i >= 0; i--) {
    completedContainer.innerHTML += `
       <div class="list-container">
          <div class="list-item" id="item-${i}">${completedList[i]}</div>
          <div class="item-actions">
          
            <button onclick="deleteCompleted(${i})">Delete</button>
          
          </div>
        </div>
    `;
  }
};

const addEvent = function () {
  let value = input.value.trim();
  if (value.length > 0) {
    itemlist.push(value);
    input.value = "";
    localStorage.setItem("itemlist", JSON.stringify(itemlist));
    renderList();
  } else {
    alert("Please enter a task.");
  }
};

addBtn.addEventListener("click", function (e) {
  e.preventDefault();
  addEvent();
});

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addEvent();
  }
});

const editItem = function (index) {
  let itemElement = id(`item-${index}`);
  let currentItem = itemlist[index];

  let inputField = document.createElement("input");
  inputField.type = "text";
  inputField.value = currentItem;

  itemElement.innerHTML = "";
  itemElement.appendChild(inputField);

  inputField.focus();

  inputField.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      saveChanges(index, inputField.value.trim());
    }
  });

  inputField.addEventListener("blur", function () {
    saveChanges(index, inputField.value.trim());
  });
};

const saveChanges = function (index, newValue) {
  if (newValue.length > 0) {
    itemlist[index] = newValue;
    localStorage.setItem("itemlist", JSON.stringify(itemlist));
    renderList();
  } else {
    alert("Please enter something.");
    renderList();
  }
};

const deleteItem = function (index) {
  itemlist.splice(index, 1);
  localStorage.setItem("itemlist", JSON.stringify(itemlist));
  renderList();
};
const deleteCompleted = function (index) {
  completedItem.splice(index, 1);
  localStorage.setItem("completedList", JSON.stringify(completedList));
  // renderCompleted();
};
const completedItem = function (index) {
  completedList.push(...itemlist.splice(index, 1));

  localStorage.itemlist = JSON.stringify(itemlist);
  localStorage.setItem("completedList", JSON.stringify(completedList));

  let itemElement = id(`item-${index}`);
  let btn = id(`completed${index}`);
  itemElement.classList.add("completed");
  btn.classList.add("disabled");
};
window.onload = function () {
  renderList();
  // renderCompleted();
};
