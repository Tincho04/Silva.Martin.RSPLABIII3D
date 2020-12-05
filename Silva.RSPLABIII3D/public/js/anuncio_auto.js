import Anuncio from "./anuncio.js";
export { Anuncio_auto, createAnuncioAuto }
class Anuncio_auto extends Anuncio {

    constructor(id, titulo, descripcion, transaccion, precio, puertas, kms, potencia) {
        super(id, titulo, descripcion, transaccion, precio);
        this.Puertas = puertas;
        this.Kilometros = kms;
        this.Potencia = potencia;
    }

    set Puertas(puertas) {
        this.puertas = puertas;
    }

    set Kilometros(kms) {
        this.kilometros = kms;
    }

    set Potencia(potencia) {
        this.potencia = potencia;
    }

    get Puertas() {
        return this.puertas;
    }

    get Kilometros() {
        return this.kilometros;
    }

    get Potencia() {
        return this.potencia;
    }


    equals(object) {
        return (
            this.Id == object.id &&
            this.Titulo == object.titulo &&
            this.Descripcion == object.descripcion &&
            this.Transaccion == object.transaccion &&
            this.Precio == object.precio &&
            this.Puertas == object.puertas &&
            this.Kilometros == object.kilometros &&
            this.Potencia == object.potencia
        );
    }
}

function createAnuncioAuto(form, id) {
    const newAnuncio = new Anuncio_auto(
        id,
        form.txtTitulo.value,
        form.txtDescripción.value,
        form.transaction.value,
        form.txtPrecio.value,
        form.txtPuertas.value,
        form.txtKMs.value,
        form.txtPotencia.value
    );

    return newAnuncio;
}