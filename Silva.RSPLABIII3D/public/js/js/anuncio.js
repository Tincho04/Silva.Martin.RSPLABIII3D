export default class Anuncio {
    constructor(id, titulo, descripcion, transaccion, precio) {
        this.Id = id;
        this.Titulo = titulo;
        this.Descripcion = descripcion;
        this.Transaccion = transaccion;
        this.Precio = precio;
    }

    set Id(newId) {
        this.id = newId;
    }

    set Titulo(titulo) {
        this.titulo = titulo;
    }

    set Descripcion(descripcion) {
        this.descripcion = descripcion;
    }

    set Transaccion(transaccion) {
        this.transaccion = transaccion;
    }

    set Precio(precio) {
        this.precio = precio;
    }

    get ID() {
        return this.id;
    }

    get Titulo() {
        return this.titulo;
    }

    get Descripcion() {
        return this.descripcion;
    }

    get Transaccion() {
        return this.transaccion;
    }

    get Precio() {
        return this.precio;
    }

}