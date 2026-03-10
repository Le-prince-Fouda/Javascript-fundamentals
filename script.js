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
        
        // this contante save the text of the active filter button
        const activeFilterButton = document.querySelector('.active').textContent;

        /**
         * all the added tasks are to do tasks so
         * we add the task, but we diplay it only in the two case:
         * "All" filter button is active or "To do" filter button is active
         */
        if(activeFilterButton !== 'All' && activeFilterButton !== 'To do'){
            task.element.classList.add('hidden')
        }

        /**to add the task at the end of the task list */
        // task.appendTo(taskList)
    }
    //we remove the text of the added task from the text field
    inputBox.value = ''
    
}

//we call the function addTask when we click the "add" button (we add a new task when we click on "Add")
addButton.addEventListener('click', addTask)


const button = document.querySelectorAll('.btn-box .btn');
button.forEach(button => { 
    button.addEventListener('click', e =>toggelFilter(e))
});

/**
 * This function is used to filter tasks according to their status: all, to do, done.
 * @param {*} e 
 */
function toggelFilter(e){
    e.preventDefault();
    const filter = e.currentTarget.getAttribute('data-filter');
    //this is the list of all created tasks
    const tasksItem = taskList.children;
    console.log(tasksItem)
    // we save the completed tasks
    const completedTask = Array.from(tasksItem).filter(enfant => enfant.classList.contains('completed'))
    //the 2 next lines active the right button (the one we click on)
    e.currentTarget.parentElement.querySelector('.active').classList.remove('active');
    e.currentTarget.classList.add('active');
    // We hide all the tasks
    Array.from(tasksItem).forEach(task => task.classList.add('hidden'));
    if(filter === 'all'){
         Array.from(tasksItem).forEach(task => task.classList.remove('hidden'));

    }else if(filter === 'todo'){
        Array.from(tasksItem).forEach(task => task.classList.remove('hidden'));
        Array.from(completedTask).forEach(task => task.classList.add('hidden'));


    }else if(filter === 'done'){
         Array.from(completedTask).forEach(task => task.classList.remove('hidden'));
    }

  

    console.log(completedTask)
    // console.log(taskList.children)

    // completedTask.forEach(result => console.log(el.dataset.filter));



}

