window.addEventListener("load", inicio);

var sistema = new Sistema()

function inicio() {
    document.forms['formSerie'].addEventListener('submit', agregarSerie)
    document.getElementById('nombreSerie').addEventListener('keyup', updateUrlIMDB)
}

function agregarSerie(event) {
    event.preventDefault()
    let nombreSerie = document.getElementById('nombreSerie').value
    let descripcion = document.getElementById('descripcionSerie').value
    let cantTemporadas = document.getElementById('cantidadTemp').value
    let cantidadCap = document.getElementById('cantidadCap').value

    if (!sistema.chequearSerie(nombreSerie)) {
        let urlImdb = buildUrlImdb(nombreSerie)
        let serie = new Serie(nombreSerie, descripcion, cantTemporadas, cantidadCap, urlImdb)
        sistema.agregarSerie(serie)
    } else {
        sistema.series[0].descripcion = 'Holaaa'
    }

}

function buildUrlImdb(nombre) {
    let imdbUrl = 'https://www.imdb.com/find?q='
    let nombreSerie = encodeURIComponent(nombre)
    let url = imdbUrl + nombreSerie
    return url
}

function updateUrlIMDB(event) {
    let anchorImdb = document.getElementById('imdb')
    let url = buildUrlImdb(event.target.value)
    anchorImdb.href = url
}