import { createFilters, createTable, hideColumns, loadColumnsMenu } from "./table.js";
import { createForm } from "./form.js";
export { getInfo, postInfo, updateInfo, deleteInfo, getFilteredInfo, emptyForm, loadInitalForm, updateList, deleteNodes };

function getInfo() {
    //AXIOS
    const tableDiv = document.getElementById('tableDiv');
    const spinner = document.getElementById('spinner');
    const filters = document.getElementById('filters');
    const columns = document.getElementById('columns');
    let lastId;

    deleteNodes(tableDiv);
    deleteNodes(filters);
    deleteNodes(columns);

    if (!spinner.hasChildNodes()) spinner.appendChild(createSpinner());

    axios.get('http://localhost:3000/anuncios')
        .then(res => {
            localStorage.setItem("anuncios", JSON.stringify(res.data));
            updateList(data);
            //conseguir el ultimo id
            if (datos.length > 0) {
                lastId = res.data.reduce(function(a, b) {
                    return Math.max(a.id, b.id);
                });
            } else {
                lastId = 1;
            }
        })
        .catch(err => {
            let mensaje = err.statusText || 'Se produjo un error.';
            console.error('Error: ' + err.status + '-' + mensaje);
        })
        .finally(() => {
            deleteNodes(spinner);
        });

    return lastId;
}

function postInfo(anuncio) {
    //AXIOS
    const tableDiv = document.getElementById('tableDiv');
    const spinner = document.getElementById('spinner');
    const filters = document.getElementById('filters');
    const columns = document.getElementById('columns');
    const config = {
        method: "POST",
        headers: {
            "Content-type": "application/json;charset=utf-8"
        },
        data: JSON.stringify(anuncio)
    };

    deleteNodes(tableDiv);
    deleteNodes(filters);
    deleteNodes(columns);

    if (!spinner.hasChildNodes()) spinner.appendChild(createSpinner());

    axios('http://localhost:3000/anuncios', config)
        .then(res => {
            console.log(res.data);
            getInfo();
        })
        .catch(err => {
            let mensaje = err.statusText || 'Se produjo un error.';
            console.error('Error: ' + err.status + '-' + mensaje);
        })
        .finally(() => {
            deleteNodes(spinner);
        });
}

function updateInfo(anuncio) {
    //AXIOS
    const tableDiv = document.getElementById('tableDiv');
    const filters = document.getElementById('filters');
    const columns = document.getElementById('columns');
    const spinner = document.getElementById('spinner');
    const config = {
        method: "PUT",
        headers: {
            "Content-type": "application/json;charset=utf-8"
        },
        data: JSON.stringify(anuncio)
    };

    deleteNodes(tableDiv);
    deleteNodes(filters);
    deleteNodes(columns);
    if (!spinner.hasChildNodes()) spinner.appendChild(createSpinner());

    axios('http://localhost:3000/anuncios/' + anuncio.ID, config)
        .then(res => {
            console.log(res.data);
            getInfo();
        })
        .catch(err => {
            let mensaje = err.statusText || 'Se produjo un error.';
            console.error('Error: ' + err.status + '-' + mensaje);
        })
        .finally(() => {
            deleteNodes(spinner);
        });
}

function deleteInfo(anuncio) {
    //AXIOS
    const tableDiv = document.getElementById('tableDiv');
    const filters = document.getElementById('filters');
    const columns = document.getElementById('columns');
    const spinner = document.getElementById('spinner');
    const config = {
        method: "DELETE",
        headers: {
            "Content-type": "application/json;charset=utf-8"
        }
    };

    deleteNodes(tableDiv);
    deleteNodes(filters);
    deleteNodes(columns);
    if (!spinner.hasChildNodes()) spinner.appendChild(createSpinner());

    axios('http://localhost:3000/anuncios/' + anuncio.ID, config)
        .then(() => {
            getInfo();
        })
        .catch(err => {
            let mensaje = err.statusText || 'Se produjo un error.';
            console.error('Error: ' + err.status + '-' + mensaje);
        })
        .finally(() => {
            deleteNodes(spinner);
        });

}

function updateList(list) {
    const tableDiv = document.getElementById('tableDiv');
    const filters = document.getElementById('filters');
    const columns = document.getElementById('columns');

    deleteNodes(tableDiv);
    deleteNodes(filters);
    deleteNodes(columns);

    tableDiv.appendChild(createTable(list));
    if (list.length > 0) {
        filters.appendChild(createFilters());
        columns.appendChild(loadColumnsMenu());
    }
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

    img.setAttribute('src', "./images/17.gif");
    img.setAttribute('alt', 'Imagen Spinner');

    return img
}

function deleteNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.lastChild);
    }
}


function getFilteredInfo(filter) {

    const tableDiv = document.getElementById('tableDiv');
    let datos = JSON.parse(localStorage.getItem('anuncios'));
    let filteredData;

    deleteNodes(tableDiv);

    if (filter != 'Todos') {
        filteredData = datos.filter((element) => {
            return element.transaccion == filter;
        });
    } else {
        filteredData = datos;
    }

    updateList(filteredData);
    //cambio de estado del boton filtro
    let sinFiltro = document.getElementById('optionPlaceholder');
    let filtroSeleccionado = document.getElementById('option' + filter);
    sinFiltro.selected = false;
    filtroSeleccionado.selected = true;

}