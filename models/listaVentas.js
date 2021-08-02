const mongoose = require('mongoose');


const ListaVentas = new mongoose.Schema({
    lista: {
        type: String,
        required: [true, ' se necesita una lista Master']
    },
    idLista: {
        type: String,
        required: [true, 'se requiere de un id de lista']
    },
    direccion: {
        type: String,
        required: [true, 'se requiere de una direccion']
    },
    colonia: {
        type: String,
        required: [true, 'se requiere de una colonia']
    },
    municipio: {
        type: String,
        required: [true, 'se requiere de un municipio']
    },
    estado: {
        type: String,
        required: [true, 'se requiere de un estado']
    },
    montoCesion: {
        type: Number,
        required: [true, 'se requiere de un monto de cesion']
    },
    honorarios: {
        type: Number,
        required: [true, 'se requiere de honorarios']
    },
    total: {
        type: Number,
        required: [true, 'se requiere de un total']
    },//Ventas has aqui
    expedienteAdmin: {
        type: String
    },
    fechaContrato: {
        type: String
    },
    formaPago: {
        type: String
    },
    cuentaPago: {
        type: String
    },
    fechaPago: {
        type: String
    },
    estatusAdmin: {
        type: String
    },
    cliente: {
        type: String
    },
    observacionesVenta: {
        type: String
    },
    vendedor: {
        type: String
    },
    jefeGrupo: {
        type: String
    },
    tipoVenta: {
        type: String
    },
    empresa: { // Grupo Marzuz, SPEJ
        type: String
    },
    oficina: {// tlaco , gayol, providencia queretaro
        type: String
    },
    observacionesAdmin: {
        type: String
    },
    contratoRealizado: {
        type: String
    },
    cartera: {
        type: String
    },
    numeroCredito: {
        type: String
    },
    deudor: {
        type: String
    },
    expediente: {
        type: String
    },
    juzgado: {
        type: String
    },
    estatusLista: {
        type: String
    },
    avaluo: {
        type: String
    },
    saldoPendiente: {
        type: String
    },
    jurisdiccion: {
        type: String
    },
    descripcion: {
        type: String
    },
    recuperadora: {
        type: String
    },
    brooker: {
        type: String
    },
    solicitante: {
        type: String
    },
    estatusJuridico: {
        type: String
    },
    fechaSolicitud: {
        type: String
    } ,
    comentario1J: {
        type: String
    },
    comentario2J: {
        type: String
    },
    comentario3J: {
        type: String
    },
    fechaFirmaCesion: {
        type: String
    },
    tramite: {
        type: String
    },
    comentario1: {
        type: String
    },
    comentario2: {
        type: String
    },
    comentario3: {
        type: String
    },
    cambio: {
        type: Boolean,
        default: false
    },
    status: {
        type: Boolean,
        default: true
    },
    mapa: {
        type: String
    },
    image: {
        type: String
    },
    baja: {
        type: Boolean,
        default: false
    },
    doblete: {
        type: Boolean,
        default: false
    },
    vendida: {
        type: Boolean,
        required: true,
        default: false
    }
})

module.exports = mongoose.model('listaVentas', ListaVentas);
