import { createForm } from "./form.js";
import { createAnuncioAuto } from "./anuncio_auto.js";
import { createFilters, createTable, hideColumns, saveFilters } from "./table.js";
//import { getInfo, getId, saveData, updateList, emptyForm, loadInitalForm } from "./controller.js";
// import { getInfo, postInfo, updateInfo, deleteInfo, getFilteredInfo, emptyForm, loadInitalForm } from "./controller_crud_local_fetch.js";
import { getInfo, postInfo, updateInfo, deleteInfo, getFilteredInfo, emptyForm, loadInitalForm } from "./controller_crud_local_xhr.js";
//import { getInfo, postInfo, updateInfo, deleteInfo, getFilteredInfo, emptyForm, loadInitalForm } from "./controller_crud_local_axios.js";

let frmAnuncios;
let nextId;
let filters = document.getElementById("filters");
let columns = document.getElementById("columns");
let unselectedCols = new Set();

window.addEventListener('load', initializeHandlers);

function initializeHandlers() {

    nextId = getInfo() + 1;
    frmAnuncios = document.getElementById("formDiv");
    frmAnuncios.appendChild(createForm());

    filters.addEventListener('change', e => {
        e.preventDefault();
        switch (e.target.value) {
            case "Venta":
                getFilteredInfo("Venta");
                unselectedCols.clear();
                break;
            case "Alquiler":
                getFilteredInfo("Alquiler");
                unselectedCols.clear();
                break;
            default:
                getFilteredInfo("Todos");
                unselectedCols.clear();
                document.getElementById('inputAvg').value = 'N/A';
                break;
        }

    })

    columns.addEventListener('change', e => {
        let activeFilters = document.getElementById('opcionesFiltro').value;
        if (unselectedCols.has(e.target.value)) {
            unselectedCols.delete(e.target.value);
        } else {
            unselectedCols.add(e.target.value);
        }

        hideColumns([...unselectedCols], activeFilters);
        saveFilters([...unselectedCols], activeFilters);
    });

    frmAnuncios.addEventListener("submit", e => {
        e.preventDefault();
        switch (e.submitter.id) {
            case "createButton":
                const anuncio = createAnuncioAuto(frmAnuncios.firstElementChild, nextId);
                let anuncioExists = false;

                if (anuncio && !anuncioExists) {
                    postInfo(anuncio);

                    emptyForm(frmAnuncios.firstElementChild);
                } else {
                    alert("Anuncio repetido.");
                }
                break;
            case "modifyButton":
                if (confirm("Confirmar edición de registro")) {

                    let anuncioEdit = createAnuncioAuto(frmAnuncios.firstElementChild, document.getElementById("txtID").value);
                    updateInfo(anuncioEdit);
                }

                loadInitalForm(formDiv);

                break;
            case "deleteButton":
                if (confirm("¿Está seguro de eliminar el registro?")) {
                    let anuncioDel = createAnuncioAuto(frmAnuncios.firstElementChild, document.getElementById("txtID").value);
                    deleteInfo(anuncioDel);
                }
                loadInitalForm(formDiv);
                break;
            case "cancelButton":
                emptyForm(frmAnuncios.firstElementChild);
                loadInitalForm(formDiv);
                break;
            default:
                alert("Error");
                break;
        }

    });

}