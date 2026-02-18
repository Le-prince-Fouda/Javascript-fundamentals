import { createElement } from "../functions/dom.js";
 export class TodoItem {
    #element
    /**
     * 
     * @param {string} todo 
     */
    constructor(todo){
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
    }

    /**
     * 
     * @param {HTMLElement} element 
     */
    appendTo(element){
        element.append(this.#element);
    }
}