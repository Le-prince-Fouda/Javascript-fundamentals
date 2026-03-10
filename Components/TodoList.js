import { createElement } from "../functions/dom.js";


/**
 * This class describe the process and the creation of one task (todoItem)
 */
 export class TodoItem {
    #element
    #todo
    /**
     * 
     * @param {string} todo 
     */
    constructor(todo){
        this.#todo = todo //?????????????
        const todoID = todo.replaceAll(" ", ""); //Remove all spaces inside and outside the character string.
        const li = createElement('li')
        const checkbox = createElement('input', {
            type: "checkbox",
            id: todoID
        })
        const label = createElement('label', {
            for: todoID
        })
        label.innerHTML= todo;
        const btnEdit = createElement('button', {
            type:"button",
            class:"btn edit"
        })
        btnEdit.innerHTML='<i class="fa-solid fa-pen-to-square"></i>'
        const btnDelete = createElement('button', {
            type:"button",
            class:"btn delete"
        })
        btnDelete.innerHTML = '<i class="fa-solid fa-trash"></i>'
        // we add all aour created element to the li element
        li.append(checkbox);
        li.append(label);
        li.append(btnEdit);
        li.append(btnDelete);
        // we save the li in a private attribute of our class
        this.#element = li

        //we delete the task/TodoItem when we click on the delete button
        btnDelete.addEventListener('click', (e) => this.remove(e))

        //We change the state of a task
        checkbox.addEventListener('change', (e) => this.toggle(e.currentTarget))
        
    }

    /**
     * This methode add a TodoItem in the DOM
     * 
     * @param {HTMLElement} element 
     */
    appendTo(element){
        element.append(this.#element);
    }

    /**
     * @returns {HTMLElement} 
     */
    get element (){
        return this.#element;
    }

    /**
     * This methode delete a TodoItem in the DOM
     * 
     * @param {HTMLElement} element 
     */
    remove(e){
        e.preventDefault() // not too necessary

        // we create a new custom event "delete"
        const event = new CustomEvent('delete', {
            detail: this.#todo,
            bubbles: true,
            cancelable: true
        })
        //we dispatchEvent the "delete" event
        this.#element.dispatchEvent(event)
        //if the "delete" event is call with "preventDefault", we do nothing (we block the normal behaviour of the event)
        if(event.defaultPrevented){
            return
        }

        //we delete the current element
        this.#element.remove(); 
    }

    /**
     * this methode change the state of the task to differentiate the finished tasks to the not completed task
     * @param {HTMLElement} checkbox 
     */
    toggle(checkbox){
        if(checkbox.checked){
            //we add the class "completed" to a task (li) if his checkbox is checked
            this.#element.classList.add('completed')
        }else{
            //and we remove the class the if it isn't
            // all the unchecked checkboxes haven't the class "completed", even if the checkbox was initially checked
            this.#element.classList.remove('completed')
        }

        // we create a new custom event "toggle" to indicate the change on the checkbox
        const event = new CustomEvent('toggle', {
            detail: this.#todo,
            bubbles: true,
        })
        //we dispatchEvent the "toggle" event
        this.#element.dispatchEvent(event)
    }

    /**
     * 
     */
    onUpdate(){
        localStorage.setItem('todos', JSON.stringify(this.#element))
    }
    
}