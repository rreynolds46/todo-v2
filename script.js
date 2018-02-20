// wrapper, todo-header, todo-input, new-activity (ID), todo-list, todo-items

const itemsList = document.querySelector('.todo-list'); // todo-items
const addItems = document.querySelector('#new-activity');
const items = JSON.parse(localStorage.getItem('items')) || [];

/* Function */
function addItem(event) {
    if(event.keyCode === 13 && event.target.value != "") {
        event.preventDefault();
        const text = event.target.value;
        const item = {
            text,
            done: false
        } 
        items.push(item)
        populateList(items,itemsList);
        localStorage.setItem('items',JSON.stringify(items));
        document.getElementById('new-activity').value = "";
}
}

function populateList(todo = [], todoList) {
    todoList.innerHTML = todo.map((todoItem, i) => {
        return `
            <li>
                <div class="todo-item">
                    ${todoItem.text}
                    <div class="todo-item-buttons">
                        <button class="todo-complete"><i class="fas fa-check fa-2x"></i></button>
                        <button class="todo-remove"><i class="fas fa-trash-alt fa-2x"></i></button>
                    </div>               
                </div>
            </li>
        `;
    }).join('');
}

let currentElem = null;
function showButtons(event) {
    let currentTarget = event.target;
    if(currentElem) {
        return;
    }
    if(currentTarget.className == "todo-item") {
        event.target.childNodes[1].style.visibility = "visible";
    }
}
function hideButtons(event) {
    let currentTarget = event.target;
    if(currentTarget.className == "todo-item") {
        event.target.childNodes[1].style.visibility = "hidden";
    }
}

populateList(items, itemsList)
addItems.addEventListener('keydown',addItem);
itemsList.addEventListener('mouseover',showButtons);
itemsList.addEventListener('mouseout',hideButtons);
