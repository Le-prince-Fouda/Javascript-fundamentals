import { createElement } from "./functions/dom.js";
import { TodoItem } from "./Components/TodoList.js";

const inputBox = document.getElementById('input-box') //input field (to write our task)
const taskList = document.querySelector('.task-list ul') // the element that content the task list
const addButton = document.getElementById('add-btn') // the button to add a new task to the task list
function addTask(event){
    // We are blocking the default action of our “Submit” button.
    //if we a "button" button instead of a "submit" button, the next line is useless
     event.preventDefault(); 
    //we show a message if the text field is empty
    if (inputBox.value.trim() === '') {
        alert('You must write your task!');
    }else{
        /**
         * if the user write a valide text as a tak
         * we create a new task 
         * and we add it on the top of the tasklist (we display it on the scren)
         */
        const task = new TodoItem(inputBox.value)
        taskList.prepend(task.element)

        /**to add the task at the end of the task list */
        // task.appendTo(taskList)
    }
    //we remove the text of the added task from the text field
    inputBox.value = ''
}

//we call the function addTask when we click the add button (we add a new task when we click on Add)
addButton.addEventListener('click', addTask)