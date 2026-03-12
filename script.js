import { createElement } from "./functions/dom.js";
import { TodoItem } from "./Components/TodoList.js";

const inputBox = document.getElementById('input-box') //input field (to write our task)
const taskList = document.querySelector('.task-list ul') // the element that content the task list
const addButton = document.getElementById('add-btn') // the button to add a new task to the task list

/****************************task adding***************************** */
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

        //we update the LocalStorage to ad this task
        update()
        
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



/************* filter *************/
const button = document.querySelectorAll('.btn-box .btn');
button.forEach(button => { 
    button.addEventListener('click', e =>toggelFilter(e))
});
/**
 * This function is used to filter tasks according to their status: all, to do, done.
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


/*************** Adapt the filtering********************/
taskList.addEventListener('toggle', (e)=> selfToggelFilter(e))
/**
 * if a stain no longer matches a filter, it disappears (we hide it)
 */
const selfToggelFilter = (e) => {
    //we save the current filter btn
    const activeFilter = document.querySelector('.btn.active').getAttribute('data-filter');
    //we save the the element that have emit the toggle event
    const taskElement = e.target;
    //the task is hide if we are in the "todo" filter and we check it
    if(activeFilter === 'todo' && taskElement.classList.contains('completed')){
        taskElement.classList.add('hidden');
    //the task is hide if we are in the "done" filter and we uncheck it
    }else if(activeFilter === 'done' && !taskElement.classList.contains('completed')){
        taskElement.classList.add('hidden');

    }
    taskElement.onu
};



/******************add and save task in localstorage************************/
const update = () => {
     // we take the "taskList" as a table and 
     // for each task we save the title of the task and we note if it completed or not
    const todosData = Array.from(taskList.children).map(li => {
        return {
            title: li.querySelector('label').innerText, //we save the title of the task
            completed: li.classList.contains('completed') //we not if the task is completed or not
        };
    });

    // we convert our object table in JSON file and we save it in the LocalStorage
    localStorage.setItem('todos', JSON.stringify(todosData));
};

//we update the LocalStorage by removing of a task (delete event) and by status changing (toggle event)
//we have also update the LocalStorage in the "addTask" function (up)
taskList.addEventListener('toggle', ()=> update())
taskList.addEventListener('delete', ()=> {
    //We wait for the "remove" method of file "TodoList.js" to execute before starting to execute "update" function after the "delete" event.
    //we wait a short moment
    /**
     * setTimeout(0) is necessary because dispatchEvent is synchronous.
     * We delay update() in the queue to ensure that it executes 
     * AFTER the element has actually been removed from the DOM by the ‘.remove()’ method.
     */
    setTimeout(() => update(), 0)
})



/******************display task saved in LocalStorage************************/
const todosInStorage = localStorage.getItem('todos')
let todos = []
if(todosInStorage){
    try {
        //the localstorage variable "todosInStorage" is a string
        //we transfor it into a table (a table of objects)
        const savedtodos = JSON.parse(todosInStorage);
        //for each data of of "savedtodos" we create an object "todoItem" which represent a task
        savedtodos.forEach( todosData => {
            const task = new TodoItem(todosData.title);
            //if we must show that the task was already completed 
            if(todosData.completed){
                //we access to the checkbox of our task
                const checkbox = task.element.querySelector('input[type="checkbox"]');
                // and we checked the checkbox
                checkbox.checked = true;
                //we add the class "completed" to our completed task
                task.toggle(checkbox) 
            }
            //we add the task in the tasklist
            taskList.append(task.element);
        })
    }catch (e){
        console.error('An error appear by reading localstorage')
    }
}




