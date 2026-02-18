/**
 * this function create an element with a list of ettribute
 * @param {string} tagName 
 * @param {object} attribute 
 * @return {HTMLElement}
 */
export function createElement(tagName, attributes= {}){
    //we create an element with his tagname
    const element = document.createElement(tagName)
    //we add to the created element all his indicated attributes 
    for (const [attribute, value] of Object.entries(attributes)){
        element.setAttribute(attribute, value) // assigning values to attributes
    }
    return element
}
