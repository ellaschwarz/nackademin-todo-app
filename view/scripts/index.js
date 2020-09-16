document.addEventListener('DOMContentLoaded', e => {
	const createListItem = (item, done) => {
		let todoList = document.getElementById('todo-list');
		let li = document.createElement('LI');
		li.setAttribute('class', 'list_items');

		let checkBox = document.createElement('input');
		checkBox.setAttribute('id', 'checkbox');
		checkBox.type = 'checkbox';
		checkBox.value = item.done;
		li.appendChild(checkBox);

		let titleItem = document.createElement('input');
		titleItem.type = 'text';
		titleItem.value = item.title;
		titleItem.style.backgroundColor = 'none';
		titleItem.setAttribute('id', item._id);
		titleItem.setAttribute('class', 'item_title');
		li.appendChild(titleItem);

		let createDate = document.createElement('p');
		createDate.innerHTML = 'Created: ' + item.created;
		createDate.setAttribute('class', 'create_date');
		li.appendChild(createDate);

		let updateDate = item.updated;
		if (updateDate !== undefined) {
			updateP = document.createElement('p');
			updateP.innerHTML = 'Updated: ' + updateDate;
			updateP.setAttribute('class', 'update_date');
			li.appendChild(updateP);
		}

		let editButton = document.createElement('button');
		editButton.setAttribute('class', 'edit_button');
		//<i class="far fa-edit"></i>
		// editButton.innerHTML = "Edit";

		li.appendChild(editButton);

		let deleteButton = document.createElement('button');
		deleteButton.setAttribute('class', 'delete_button');
		deleteButton.setAttribute('id', 'delete_button');
		//deleteButton.innerHTML = "X";

		li.appendChild(deleteButton);

		todoList.append(li);

		deleteButton.addEventListener('click', function(e) {
			deleteTodos(item);
			deleteListItem(item);
		});

		editButton.addEventListener('click', function(e) {
			updateTodo(item);
		});
	};

	const deleteListItem = item => {
		let itemToBeDeletedChild = document.getElementById(item._id);
		itemToBeDeletedChild.parentNode.remove();
	};

	//   const checkIfChecked = () => {
	//     let checkBox = document.getElementById(id);
	//     checkBox.addEventListener('change', function(e) {
	//         updateTodo(item);
	//         console.log(item);
	//     });
	//   }

	const token = sessionStorage.getItem('token');
	const bearer = 'Bearer ' + token;

	const getUser = async () => {

		let request = await fetch('https://glacial-plains-71562.herokuapp.com/users/user', {
			headers: { Authorization: bearer }
		});

		console.log(request.data);
	};



	const getTodos = async () => {
		let request = await fetch('https://glacial-plains-71562.herokuapp.com/todos', {
			headers: { Authorization: bearer }
		});
		const todoItems = await request.json();
		todoItems.forEach(item => {
			createListItem(item);
		});
	};

	getUser();



	if (sessionStorage.getItem('token')) {
		document.getElementById('app').style.display = 'block';
		document.getElementById('login_app').style.display = 'none';
		getUser();
		getTodos();

	} else {
		document.getElementById('app').style.display = 'none';
		document.getElementById('login_app').style.display = 'block';
	}


	const postTodos = async () => {
		let title = document.getElementById('title').value;

		let data = {
			title: title,
			done: false
		};

		let response = await fetch('https://glacial-plains-71562.herokuapp.com/todos', {
			method: 'POST',

			headers: {
				'Content-Type': 'application/json;charset=utf-8',
				Authorization: bearer
			},
			body: JSON.stringify(data)
		});

		console.log(response);

		let item = await response.json();

		createListItem(item);
	};

	const updateTodo = async item => {
		let id = item._id;
		let titleItem = document.getElementById(item._id).value;
		let checkBox = document.getElementById('checkbox').checked;
		console.log(checkBox);

		let data = {
			id: id,
			title: titleItem,
			done: checkBox
		};

		let response = await fetch('https://glacial-plains-71562.herokuapp.com/todos/' + id, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
				Authorization: bearer
			},
			body: JSON.stringify(data)
		});
	};

	const deleteTodos = async item => {
		let id = item._id;

		let response = await fetch('https://glacial-plains-71562.herokuapp.com/todos/' + id, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
				Authorization: bearer
			}
		});
	};



	// document
	// 	.getElementById('next_button')
	// 	.addEventListener('click', async function(e) {
	// 		let next = 1;
	// 		let request = await fetch('http://127.0.0.1:3000/todos/page/' + next);
	// 		const todoItems = await request.json();
	// 		console.log(todoItems);

	// 		todoItems.forEach(item => {
	// 			createListItem(item);
	// 		});

	// 		next = next + 1;

	// 		console.log(next);
	// 	});

	let submit = document.getElementById('submit_todo');
	submit.addEventListener('click', function(e) {
		postTodos();
		let title = document.getElementById('title');
		title.value = ' ';
		// title.placeholder = "Add a todo";
	});

	//module.exports = {getTodos};
	//const pagination = async () => {

	//}


	const modal = document.getElementById('myModal');
	const btn = document.getElementById('myBtn');
	const span = document.getElementsByClassName('close')[0];

	btn.onclick = function() {
		modal.style.display = 'block';
	};

	span.onclick = function() {
		modal.style.display = 'none';
	};

	window.onclick = function(event) {
		if (event.target == modal) {
			modal.style.display = 'none';
		}
	};

	const signout = document.getElementsByClassName('sign_out')[0];
	console.log(signout);
	signout.onclick = function () {
		console.log('klicklkc')
		document.getElementById('app').style.display = 'none';
		document.getElementById('login_app').style.display = 'block';
		sessionStorage.removeItem('token');
	};

	const addUser = document.getElementsByClassName('add_user');
	

	// let button = document.getElementsByClassName('button');

	// button.addEventListener('click', function () {
	// 	let buttonId = button.setAttribute('id');
	// 	document.getElementById('modal-container').removeAttribute('class').classList.add(buttonId);
	// 	document.getElementsByTagName('body').classList.add('modal-active');
	// });

	// document.getElementById('modal-container').addEventListener('click', function() {
	// 	button.classList.add('out');
	// 	document.getElementsByName('body').classList.remove('modal-active');
	// });

	// $('.button').click(function(){
	// 	var buttonId = $(this).attr('id');
	// 	$('#modal-container').removeAttr('class').addClass(buttonId);
	// 	$('body').addClass('modal-active');
	//   })

	//   $('#modal-container').click(function(){
	// 	$(this).addClass('out');
	// 	$('body').removeClass('modal-active');
	//   });
});
