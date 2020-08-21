document.addEventListener('DOMContentLoaded', (e) => {

    const createListItem = (item, done) => {
        let todoList = document.getElementById('todo-list');
        let li = document.createElement('LI');
        li.setAttribute('class', 'list_items');

        let checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        checkBox.value = item.done;
        li.appendChild(checkBox);

        let titleItem = item.title;
        li.appendChild(document.createTextNode(titleItem));
        console.log(titleItem);

        let createDate = item.created;
        li.appendChild(document.createTextNode(createDate));
        
        todoList.append(li);
    }

    const getTodos = async () => {
        let request = await fetch ('http://127.0.0.1:3000/todo');
        const todoItems = await request.json();
        console.log(todoItems);

        todoItems.forEach(item => {
            console.log(item);

            createListItem(item);
           
        });
    };

    let form = document.getElementById('submit_todo');

    const postTodos = async () => {

        let title = document.getElementById('title').value
        let data = {
            title: title,
            done: false
          };
          
          let response = await fetch('http://127.0.0.1:3000/todo', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
          });
          
          let item = await response.json();

          createListItem(item);

};

    getTodos();

    form.addEventListener('click', function (e) {
    postTodos();
    // location.reload();

    });
    
});