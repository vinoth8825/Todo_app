let openTaskBtn = document.querySelector("#openTaskBtn");
let addTaskBtn = document.querySelector("#addTaskBtn");

let addTaskContainer = document.querySelector("#addTaskContainer");

let taskContainer = document.querySelector("#taskContainer");

//let displayClass, displayClass1;

let todosArray = [];

const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

openTaskBtn.addEventListener("click", () => {
  addTaskContainer.classList.remove("hidden");
});

function addTask() {
  let taskNameInp = document.querySelector("#taskINput");
  let taskDueDate = document.querySelector("#dueDateInput");

  let taskObj = {
    taskname: taskNameInp.value,
    taskDueDate: taskDueDate.value,
  };

  todosArray.push(taskObj);

  taskNameInp.value = "";
  taskDueDate.value = "";
  addTaskContainer.classList.add("hidden");
}

addTaskBtn.addEventListener("click", () => {
  addTask();
  //taskContainer.innerHTML = "";
  renderOutput();
});

function renderOutput() {
  taskContainer.innerHTML = "";

  let addStatusClass = "";

  todosArray.forEach((elem, index) => {
    if (elem.status == "done") {
      addStatusClass = "bg-green-50 border border-green-400";
    } else {
      addStatusClass = "bg-white border border-neutral-400";
    }

    let newDiv = document.createElement("div");
    let newDate;
    if (elem.taskDueDate != "") {
      let date = new Date(elem.taskDueDate);

      newDate = date.toLocaleDateString("en", options);
    } else {
      newDate = "";
    }

    newDiv.innerHTML = ` <div
          class=" w-[440px] mx-auto p-4 mt-4 rounded-xl ${addStatusClass}"
        >
          <h3 class="text-neutral-800 font-semibold" id="taskName">${elem.taskname}</h3>
          <p class="text-neutral-500 mt-2" id="deadline">${newDate}</p>

          <div class="flex gap-6 mt-3">
            <button id="task_completed" data-id="${index}"
              class="task_completed flex items-center text-neutral-400 gap-2 hover:text-green-700 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-check2-circle"
                viewBox="0 0 16 16"
              >
                <path
                  d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0"
                />
                <path
                  d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"
                />
              </svg>
              Mark as Done
            </button>

            <button id="task_not_completed" class="task_not_completed flex  items-center text-neutral-400 gap-2" data-id="${index}">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                  </svg>

                  Mark as not done
            
            </button>



            <button id="delete_task" data-id="${index}"
              class="flex items-center text-neutral-400 gap-2 hover:text-red-600 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-trash3"
                viewBox="0 0 16 16"
              >
                <path
                  d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"
                />
              </svg>
              Delete
            </button>
          </div>
        </div>
      </div>`;

    taskContainer.appendChild(newDiv);

    console.log(todosArray);
  });

  let task_completed = document.querySelectorAll("#task_completed");

  let delete_task = document.querySelectorAll("#delete_task");

  let task_not_completed = document.querySelectorAll("#task_not_completed");

  task_completed.forEach((taskComplted) => {
    taskComplted.addEventListener("click", (e) => {
      let id = e.target.getAttribute("data-id");

      todosArray[id].status = "done";

      //console.log(todosArray);

      renderOutput();
    });
  });

  delete_task.forEach((deletetaskbtn, index) => {
    deletetaskbtn.addEventListener("click", (e) => {
      let index = e.target.getAttribute("data-id");

      todosArray.splice(index, 1);

      renderOutput();
    });
  });

  task_not_completed.forEach((tasknotcompleted, index) => {
    tasknotcompleted.addEventListener("click", (e) => {
      let index = e.target.getAttribute("data-id");

      todosArray[index].status = "";

      renderOutput();
    });
  });
}

let element = document.getElementById("taskContainer");

new Sortable(element, {
  animation: 150,
  ghostClass: "blue-background-class",
});
