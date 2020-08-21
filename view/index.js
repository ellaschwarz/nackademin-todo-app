document.addEventListener("DOMContentLoaded", e => {
  const createListItem = (item, done) => {
    let todoList = document.getElementById("todo-list");
    let li = document.createElement("LI");
    li.setAttribute("class", "list_items");

    let checkBox = document.createElement("input");
    checkBox.setAttribute('id', 'checkbox');
    checkBox.type = "checkbox";
    checkBox.value = item.done;
    li.appendChild(checkBox);

    let titleItem = document.createElement('input');
    titleItem.type = "text";
    titleItem.value = item.title;
    titleItem.setAttribute('id', 'item_title');
    li.appendChild(titleItem);
    console.log(titleItem);

    let createDate = item.created;
    li.appendChild(document.createTextNode(createDate));

    let deleteButton = document.createElement("button");
    deleteButton.setAttribute("class", "delete_button");
    deleteButton.setAttribute("id", "delete_button");
    deleteButton.innerHTML = "Delete";

    li.appendChild(deleteButton);

    let editButton = document.createElement("button");
    editButton.setAttribute("class", "edit_button");
    editButton.innerHTML = "Edit";

    li.appendChild(editButton);

    todoList.append(li);

    console.log(deleteButton);

    deleteButton.addEventListener('click', function(e) {
      deleteTodos(item);
    });

    editButton.addEventListener('click', function(e) {
        updateTodo(item);
    });
  };

  const getTodos = async () => {
    let request = await fetch("http://127.0.0.1:3000/todo");
    const todoItems = await request.json();
    console.log(todoItems);

    todoItems.forEach(item => {
      console.log(item);

      createListItem(item);
    });
  };

  const postTodos = async () => {
    let title = document.getElementById("title").value;
    let data = {
      title: title,
      done: false
    };

    let response = await fetch("http://127.0.0.1:3000/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      },
      body: JSON.stringify(data)
    });

    let item = await response.json();

    createListItem(item);
  };

  const updateTodo = async (item) => {

    let id = item._id;
    let titleItem = document.getElementById("item_title").value;
    let checkBox = document.getElementById('checkbox').value;

    let data = {
      id: id,  
      title: titleItem,
      done: checkBox
    };

    let response = await fetch("http://127.0.0.1:3000/todo/" + id, {
      method: "UPDATE",
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      },
      body: JSON.stringify(data)
    });

    let itemRes = await response.json();

    createListItem(itemRes);
  };

  const deleteTodos = async item => {
    let id = item._id;

    let response = await fetch("http://127.0.0.1:3000/todo/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      }
    });
  };

  getTodos();

  let submit = document.getElementById("submit_todo");
  submit.addEventListener("click", function(e) {
    postTodos();
  });
});
