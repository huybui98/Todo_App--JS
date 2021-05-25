// Declare variable
const form = document.querySelector('#form');
const inputForm = document.querySelector('#task');
const inputSearch = document.querySelector('#search');
const list = document.querySelector('.list');

const addBtn = document.querySelector('.add');
const saveBtn = document.querySelector('.save');
const delBtn = document.querySelector('.delete');

let listTask = JSON.parse(localStorage.getItem('listTask')) || [];

// Save in localStorage
function addTask(task) {
	listTask.push(task);
	localStorage.setItem('listTask', JSON.stringify(listTask));
	render();
	form.reset();
}

// render
function render() {
	const html = listTask.map((task, id) => {
		return `<li >
                    <span onclick="toggleCompleted(${id})" id="span-${id}">${task}</span>
					<div class="icon-group">
                        <button id="edit-${id}" class="edit btn" onclick="editTask(${id})">
                            <i class="fas fa-edit icon icon-edit"></i>
                        </button>
                        <button class="del btn" onclick="deleteTask(${id})">
                            <i class="fas fa-trash icon icon-remove"></i>
                        </button>
                    </div>
				</li>`;
	});
	list.innerHTML = html.join('');
}

// edit task
function editTask(id) {
	if (confirm('Please re-fill form!')) {
		inputForm.value = listTask[id];
		addBtn.hidden = true;
		saveBtn.hidden = false;

		form.onsubmit = function (e) {
			e.preventDefault();
			addBtn.hidden = false;
			saveBtn.hidden = true;

			listTask[id] = inputForm.value;
			localStorage.setItem('listTask', JSON.stringify(listTask));
			render();
			location.reload();
		};

		saveBtn.onclick = function () {
			addBtn.hidden = false;
			saveBtn.hidden = true;

			listTask[id] = inputForm.value;
			localStorage.setItem('listTask', JSON.stringify(listTask));
			render();
			location.reload();
		};

		inputSearch.oninput = function () {
			searchTask();
		};
	}
}

// delete task
function deleteTask(id) {
	if (confirm('Are you sure you want to delete this task?')) {
		listTask.splice(id, 1);
		localStorage.setItem('listTask', JSON.stringify(listTask));
		render();
	}
}

// toggle completed
function toggleCompleted(id) {
	const spanTag = document.getElementById(`span-${id}`);
	const editBtn = document.getElementById(`edit-${id}`);
	spanTag.classList.toggle('completed');
	if (spanTag.classList.value) {
		editBtn.hidden = true;
	} else {
		editBtn.hidden = false;
	}
}

function start() {
	form.onsubmit = function (e) {
		e.preventDefault();
		addTask(inputForm.value);
	};
	addBtn.onclick = function () {
		addTask(inputForm.value);
	};

	// delete all task
	delBtn.onclick = function () {
		if (confirm('Are you sure you want to delete All tasks?')) {
			listTask = [];
			localStorage.setItem('listTask', JSON.stringify(listTask));
			render();
		}
	};
	render();
}
start();
