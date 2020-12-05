export { createForm, createFormEditDelete }

function createForm() {
    const form = document.createElement("form");
    const fieldset = createMainFieldSet()

    form.className = "form-group";
    //titulo - text
    fieldset.appendChild(createTextLabel("Titulo"));
    addLineBreak(fieldset, 1);
    //transaccion - radio 
    fieldset.appendChild(createRadioBtnLabel("Transacción"))
    addLineBreak(fieldset, 1);
    //descripcion - text
    fieldset.appendChild(createTextLabel("Descripción"));
    addLineBreak(fieldset, 1);
    //precio - text (numero)
    fieldset.appendChild(createTextLabel("Precio"));
    addLineBreak(fieldset, 1);
    //puertas - text (numero)
    fieldset.appendChild(createTextLabel("Puertas"));
    addLineBreak(fieldset, 1);
    //KMs - text (numero)
    fieldset.appendChild(createTextLabel("KMs"));
    addLineBreak(fieldset, 1);
    //potencia - text (numero)
    fieldset.appendChild(createTextLabel("Potencia"));
    addLineBreak(fieldset, 1);
    //botones
    fieldset.appendChild(createDivButtons());

    form.appendChild(fieldset);

    return form;
}

function createFormEditDelete() {
    const form = document.createElement("form");
    const fieldset = createMainFieldSet()

    form.className = "form-group";
    //inserts id label 
    fieldset.appendChild(createTextLabel("ID"));
    addLineBreak(fieldset, 1);
    //titulo - text
    fieldset.appendChild(createTextLabel("Titulo"));
    addLineBreak(fieldset, 2);
    //transaccion - radio 
    fieldset.appendChild(createRadioBtnLabel("Transacción"))
    addLineBreak(fieldset, 1);
    //descripcion - text
    fieldset.appendChild(createTextLabel("Descripción"));
    addLineBreak(fieldset, 1);
    //precio - text (numero)
    fieldset.appendChild(createTextLabel("Precio"));
    addLineBreak(fieldset, 1);
    //puertas - text (numero)
    fieldset.appendChild(createTextLabel("Puertas"));
    addLineBreak(fieldset, 1);
    //KMs - text (numero)
    fieldset.appendChild(createTextLabel("KMs"));
    addLineBreak(fieldset, 1);
    //potencia - text (numero)
    fieldset.appendChild(createTextLabel("Potencia"));
    addLineBreak(fieldset, 1);
    //botones
    fieldset.appendChild(createDivButtonsEditDelete());

    form.appendChild(fieldset);

    return form;
}


function createTextLabel(labelName) {
    const label = document.createElement("label");

    label.innerHTML = labelName + ": ";
    label.id = labelName;

    label.appendChild(createTextInput(labelName, true));

    return label;
}


function createRadioBtnLabel(labelName) {
    const div = document.createElement('div');
    const label0 = document.createElement("label");
    const label1 = document.createElement("label");
    const label2 = document.createElement("label");

    div.className = "form-check form-check-inline";
    label0.innerHTML = labelName + ": ";
    label0.id = labelName;

    createTransactionRadioButton(label1, label2)
    label0.append(label1);
    label0.append(label2);

    div.appendChild(label0);
    return div;
}

function createTextInput(id, required) {
    const input = document.createElement("input");

    (id == 'Descripción' || id == 'Titulo') ? input.type = "text": input.type = "number";
    input.id = "txt" + id;
    input.required = required;
    input.className = "form-control form-control-lg";
    //when creating the id field, it is set to be read-only
    if (id == "ID") {
        input.disabled = true;
    }
    return input;
}

function addLineBreak(fatherNode, lines) {
    for (let i = 0; i < lines; i++) {
        fatherNode.appendChild(document.createElement('br'));
    }
}

function createTransactionRadioButton(label1, label2) {

    label1.appendChild(document.createTextNode("Venta"));
    label1.className = 'form-check-label';
    label1.appendChild(createRadioButton("transaction", "rdoVenta", "Venta", false));
    label1.setAttribute('for', 'rdoVenta');

    label2.appendChild(document.createTextNode("Alquiler"));
    label2.className = 'form-check-label';
    label2.appendChild(createRadioButton("transaction", "rdoAlq", "Alquiler", false));
    label2.setAttribute('for', 'rdoAlq');

}

function createMainFieldSet() {
    const fieldset = document.createElement("fieldset");
    const legend = document.createElement("legend");

    legend.innerHTML = "Información Del Anuncio";

    fieldset.appendChild(legend);

    return fieldset;
}

function createRadioButton(name, id, value, checked) {
    const radioButton = document.createElement("input");

    radioButton.type = "radio";
    radioButton.name = name;
    radioButton.id = id;
    radioButton.value = value;
    radioButton.checked = checked;
    radioButton.className = 'form-check-input';
    radioButton.required = true;
    return radioButton;
}

function createDivButtons() {
    const div = document.createElement("div");

    //div.className = "buttons";
    div.className = "btn btn-outline-primary btn-block";
    div.appendChild(createButton("createButton", "Guardar"));
    return div;
}

function createDivButtonsEditDelete() {
    const div = document.createElement("div");

    //div.className = "buttons";
    div.className = "btn-group btn-outline-primary btn-block";
    div.setAttribute('role', 'group');
    div.setAttribute('aria-label', '...');
    div.appendChild(createButton("modifyButton", "Modificar"));
    div.appendChild(createButton("deleteButton", "Baja"));
    div.appendChild(createButton("cancelButton", "Cancelar"));
    return div;
}

function createButton(id, name) {
    const button = document.createElement("button");

    //bootstrap
    button.type = "submit";

    switch (name) {
        case "Modificar":
            button.className = "btn btn-warning";
            break;
        case "Baja":
            button.className = "btn btn-danger";
            break;
        case "Cancelar":
            button.className = "btn btn-secondary";
            break;
        case "Guardar":
        default:
            button.className = "btn btn-default";
            break;
    }

    if (name == "Guardar") {

        const icon = document.createElement('i');
        icon.className = "fas fa-cloud-upload-alt";
        button.appendChild(icon);
        button.className = "btn btn-success";
        button.innerHTML = button.innerHTML + ' ';
    }

    button.innerHTML = button.innerHTML + name;
    button.id = id;
    return button;
}