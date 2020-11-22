window.addEventListener("load", inicio);

var sistema = new Sistema()

function inicio() {
    document.forms['formSerie'].addEventListener('submit', agregarSerie)
    document.getElementById('nombreSerie').addEventListener('keyup', updateUrlIMDB)
    mostrarSeccion('series');
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

function mostrarSeccion(nombre) {

    const secciones = ['series', 'opiniones', 'estadisticas'];

    if (nombre == secciones[1]) {
        cargarOpinionesSelect();
    }

    secciones.forEach(el => {
        const show = el == nombre ? 'block' : 'none';
        document.getElementById(el).style.display = show;
    });

}

function cargarOpinionesSelect() {
    let optionList = document.getElementById('opcionesSeries');

    let i, listLength = optionList.options.length - 1;
    for (i = listLength; i >= 0; i--) {
        optionList.remove(i);
    }

    optionList.options.add(
        new Option('Seleccione una serie', 'Seleccione una serie', true)
    )

    sistema.series.forEach(option =>
        optionList.options.add(
            new Option(option.nombre, option.nombre, option.selected)
        )
    );
}