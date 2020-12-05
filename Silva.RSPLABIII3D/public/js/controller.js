//TODO
//tratar de hacer las funciones lo mas reutilizables posible
import createTable from "./table.js";
import { createForm } from "./form.js";
export { getInfo, getId, saveData, updateList, emptyForm, loadInitalForm };

function getInfo() {
    return JSON.parse(localStorage.getItem("anuncios")) || [];
}

function getId() {
    return JSON.parse(localStorage.getItem("nextId")) || 20000;
}

function saveData(anuncios, nextId) {
    localStorage.setItem("anuncios", JSON.stringify(anuncios));
    localStorage.setItem("nextId", JSON.stringify(nextId));
}

function updateList(table, list, spinner) {
    spinner.appendChild(createSpinner());

    while (table.firstChild) {
        tableDiv.removeChild(table.lastChild);
    }

    setTimeout(() => {
        while (spinner.hasChildNodes()) {
            spinner.removeChild(spinner.lastChild);
        }
        table.appendChild(createTable(list));
    }, 3000);
}

function emptyForm(form) {
    form.txtTitulo.value = '';
    form.txtDescripción.value = '';
    form.transaction.value = '';
    form.txtPrecio.value = '';
    form.txtPuertas.value = '';
    form.txtKMs.value = '';
    form.txtPotencia.value = '';
}

function loadInitalForm(div) {
    while (div.firstChild) {
        div.removeChild(div.lastChild);
    }
    div.appendChild(createForm());
}

function createSpinner() {
    const img = document.createElement('img');

    img.setAttribute('src', "./img/17.gif");
    img.setAttribute('alt', 'Imagen Spinner');

    return img
}