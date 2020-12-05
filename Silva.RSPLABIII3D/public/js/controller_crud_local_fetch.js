import { createFilters, createTable, loadColumnsMenu } from "./table.js";
import { createForm } from "./form.js";
export { getInfo, postInfo, updateInfo, deleteInfo, getFilteredInfo, emptyForm, loadInitalForm, updateList, deleteNodes, calcularPromMinMax };

function getInfo() {
    //FETCH
    const tableDiv = document.getElementById('tableDiv');
    const spinner = document.getElementById('spinner');
    const filters = document.getElementById('filters');
    const columns = document.getElementById('columns');
    let lastId;

    deleteNodes(tableDiv);
    deleteNodes(filters);
    deleteNodes(columns);

    if (!spinner.hasChildNodes()) spinner.appendChild(createSpinner());

    fetch('http://localhost:3000/anuncios')
        .then(res => {
            if (!res.ok) return Promise.reject(res);
            return res.json();
        })
        .then(datos => {
            localStorage.setItem("anuncios", JSON.stringify(datos));
            updateList(datos);
            if (datos.length > 0) {
                lastId = datos.reduce(function(a, b) {
                    return Math.max(a.id, b.id);
                }, 0);
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
    //FETCH
    const tableDiv = document.getElementById('tableDiv');
    const spinner = document.getElementById('spinner');
    const filters = document.getElementById('filters');
    const columns = document.getElementById('columns');
    const config = {
        method: "POST",
        headers: {
            "Content-type": "application/json;charset=utf-8"
        },
        body: JSON.stringify(anuncio)
    };

    deleteNodes(tableDiv);
    deleteNodes(filters);
    deleteNodes(columns);

    if (!spinner.hasChildNodes()) spinner.appendChild(createSpinner());

    fetch('http://localhost:3000/anuncios', config)
        .then(res => {
            if (!res.ok) return Promise.reject(res);
            return res.json();
        })
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

function updateInfo(anuncio) {
    //FETCH
    const tableDiv = document.getElementById('tableDiv');
    const filters = document.getElementById('filters');
    const columns = document.getElementById('columns');
    const spinner = document.getElementById('spinner');
    const config = {
        method: "PUT",
        headers: {
            "Content-type": "application/json;charset=utf-8"
        },
        body: JSON.stringify(anuncio)
    };

    deleteNodes(tableDiv);
    deleteNodes(filters);
    deleteNodes(columns);
    if (!spinner.hasChildNodes()) spinner.appendChild(createSpinner());

    fetch('http://localhost:3000/anuncios/' + anuncio.ID, config)
        .then(res => {
            if (!res.ok) return Promise.reject(res);
            return res.json();
        })
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

function deleteInfo(anuncio) {
    //FETCH
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

    fetch('http://localhost:3000/anuncios/' + anuncio.ID, config)
        .then(res => {
            if (!res.ok) return Promise.reject(res);
            return res.json();
        })
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
        calcularPromMinMax(list, 'inputAvg', '=');
        calcularPromMinMax(list, 'inputAvgP', '=p');
        calcularPromMinMax(list, 'inputMax', '+');
        calcularPromMinMax(list, 'inputMin', '-');
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
    let datos = JSON.parse(localStorage.getItem('anuncios')) || [];
    let filteredData = datos;

    deleteNodes(tableDiv);

    if (filter != 'Todos') {
        filteredData = datos.filter((element) => {
            return element.transaccion == filter;
        });
    } else {
        filteredData = datos;
    }

    updateList(tableDiv, filteredData);
    let sinFiltro = document.getElementById('optionPlaceholder');
    let filtroSeleccionado = document.getElementById('option' + filter);
    sinFiltro.selected = false;
    filtroSeleccionado.selected = true;

}

// function calcularPromedio(datos) {
//     let inputAvg = document.getElementById('inputAvg');

//     let promedio = parseFloat(datos.reduce((prev, actual) => {
//         return prev + parseFloat(actual.precio);
//     }, 0.0) / datos.length);

//     inputAvg.value = promedio;
// }

// function calcularPromedioPot(datos) {
//     let inputAvgP = document.getElementById('inputAvgP');

//     let promedio = parseFloat(datos.reduce((prev, actual) => {
//         return prev + parseFloat(actual.potencia);
//     }, 0.0) / datos.length);

//     inputAvgP.value = promedio;
// }

// function calcularMinimo(datos) {
//     let inputMin = document.getElementById('inputMin');

//     let minimo = parseFloat(datos.reduce((prev, actual) => {
//         return prev < parseFloat(actual.precio) ? prev : parseFloat(actual.precio);
//     }, 9999999));

//     inputMin.value = minimo;
// }

// function calcularMaximo(datos) {
//     let inputMax = document.getElementById('inputMax');

//     let maximo = parseFloat(datos.reduce((prev, actual) => {
//         return prev > parseFloat(actual.precio) ? prev : parseFloat(actual.precio);
//     }, 0));

//     inputMax.value = maximo;
// }

function calcularPromMinMax(datos, id, tipo) {
    let input = document.getElementById(id);

    switch (tipo) {
        case '=':
            let promedio = parseFloat(datos.reduce((prev, actual) => {
                return prev + parseFloat(actual.precio);
            }, 0.0) / datos.length);

            input.value = promedio;
            break;
        case '=p':
            let promediop = parseFloat(datos.reduce((prev, actual) => {
                return prev + parseFloat(actual.potencia);
            }, 0.0) / datos.length);

            input.value = promediop;
            break;
        case '+':
            let maximo = parseFloat(datos.reduce((prev, actual) => {
                return prev > parseFloat(actual.precio) ? prev : parseFloat(actual.precio);
            }, 0));

            input.value = maximo;
            break;
        case '-':
            let minimo = parseFloat(datos.reduce((prev, actual) => {
                return prev < parseFloat(actual.precio) ? prev : parseFloat(actual.precio);
            }, 9999999));

            input.value = minimo;
            break;
    }
}