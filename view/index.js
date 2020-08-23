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
    titleItem.setAttribute('id', item._id);
    titleItem.setAttribute('class', 'item_title');
    li.appendChild(titleItem);

    let createDate = document.createElement('p');
    createDate.innerHTML = "Created: " + item.created;
    createDate.setAttribute('class', 'create_date');
    li.appendChild(createDate);

    let updateDate = item.updated;
    if(updateDate !== undefined) {
        updateP = document.createElement('p');
        updateP.innerHTML = "Updated: " + updateDate;
        updateP.setAttribute('class', 'update_date');
        li.appendChild(updateP);
    };

    let editButton = document.createElement("button");
    editButton.setAttribute("class", "edit_button");
    //<i class="far fa-edit"></i>
   // editButton.innerHTML = "Edit";

    li.appendChild(editButton);

    let deleteButton = document.createElement("button");
    deleteButton.setAttribute("class", "delete_button");
    deleteButton.setAttribute("id", "delete_button");
    //deleteButton.innerHTML = "X";

    li.appendChild(deleteButton);

    todoList.append(li);

    deleteButton.addEventListener('click', function(e) {
      deleteTodos(item);
    });

    editButton.addEventListener('click', function(e) {
        updateTodo(item);
    });

  };

//   const checkIfChecked = () => {
//     let checkBox = document.getElementById(id);
//     checkBox.addEventListener('change', function(e) {
//         updateTodo(item);
//         console.log(item);
//     });
//   }

  const getTodos = async () => {
    let request = await fetch("http://127.0.0.1:3000/todo");
    const todoItems = await request.json();

    todoItems.forEach(item => {
      createListItem(item);
    });
  };

  const postTodos = async () => {
    let title = document.getElementById("title").value;
    //let checkBox = document.getElementById('checkbox').checked;

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
    let titleItem = document.getElementById(item._id).value;    
    let checkBox = document.getElementById('checkbox').checked;
    console.log(checkBox);

    let data = {
      id: id,  
      title: titleItem,
      done: checkBox
    };

    let response = await fetch("http://127.0.0.1:3000/todo/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      },
      body: JSON.stringify(data)
    });
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

  document.getElementById('next_button').addEventListener('click', async function(e) {
    let next = 1;
    let request = await fetch("http://127.0.0.1:3000/todo/page/" + next);
    const todoItems = await request.json();
    console.log(todoItems);

    todoItems.forEach(item => {
      createListItem(item);
    });

    next = next +1;
    console.log(next);
});

  getTodos();

  let submit = document.getElementById("submit_todo");
  submit.addEventListener("click", function(e) {
    postTodos();
    let title = document.getElementById("title");
    title.innerHTML = " ";

  });


  //const pagination = async () => {

//}

});


