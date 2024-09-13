let listContainer = document.querySelector(".listContainer");
let formBtn = document.getElementById("formBtn");
let formText = document.getElementById("formText");

let listTask = [];

if (localStorage.getItem("listTask") !== null) {
  listTask = JSON.parse(localStorage.getItem("listTask"));
}

const saveLocalStorage = () => {
  localStorage.setItem("listTask", JSON.stringify(listTask));
};

formBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let taskContent = formText.value;
  if (taskContent !== "") {
    listTask.unshift({ content: taskContent, status: "" });
    saveLocalStorage();
    addToHTML();
    formText.value = "";
  }
});

function addToHTML() {
  listContainer.innerHTML = "";

  listTask.forEach((task, index) => {
    let newLi = document.createElement("li");

    if (task.status) {
      newLi.classList.add("complete");
    } else {
      newLi.classList.add("pending");
    }

    newLi.innerHTML = `
      <span><i class='bx bx-badge-check' data-index="${index}"></i></span>
      <h3>${task.content}</h3>
      <span><i class='bx bx-x' data-index="${index}"></i></span>
    `;
    listContainer.appendChild(newLi);
  });
}

listContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("bx-badge-check")) {
    const index = event.target.getAttribute("data-index");
    listTask[index].status =
      listTask[index].status === "pending" ? "" : "complete";
    saveLocalStorage();
    addToHTML();
  }

  if (event.target.classList.contains("bx-x")) {
    const index = event.target.getAttribute("data-index");
    listTask.splice(index, 1);
    saveLocalStorage();
    addToHTML();
  }
});

addToHTML();
