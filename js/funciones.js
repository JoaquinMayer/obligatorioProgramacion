window.addEventListener("load", inicio);

var sistema = new Sistema()

function inicio() {
    document.forms['formSerie'].addEventListener('submit', agregarSerie)
    document.forms['formOpinion'].addEventListener('submit', agregarOpinion)
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
        cargarSeries();
    }

    secciones.forEach(el => {
        const show = el == nombre ? 'block' : 'none';
        document.getElementById(el).style.display = show;
    });

}

function cargarSeries() {
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

function cargarSerieInformacion() {

    const nombreSerie = document.getElementById("opcionesSeries").value;

    if (nombreSerie && sistema.chequearSerie(nombreSerie)) {
        serie = sistema.seriePorNombre(nombreSerie);

        let temporadas = document.getElementById("temporada");
        temporadas.setAttribute("max", serie.cantTemporadas);

        let capitulos = document.getElementById("capitulo");
        capitulos.setAttribute("max", serie.cantidadCap);

        let opinionList = document.getElementById('opinionesSeries');

        opinionList.innerHTML = '';

        serie.opiniones.forEach(opinion => {
            let li = document.createElement("li");
            li.appendChild(document.createTextNode(`Temp: ${opinion.temporada} Cap: ${opinion.capitulo} Puntaje: ${opinion.puntaje}. ${opinion.comentarios}`));
            opinionList.appendChild(li);
        });
    }
}

function agregarOpinion(event) {
    event.preventDefault()
    let nombreSerie = document.getElementById("opcionesSeries").value;
    let temporada = document.getElementById('temporada').value;
    let capitulo = document.getElementById('capitulo').value;
    let puntaje = document.getElementById('puntaje').value;
    let comentarios = document.getElementById('comentarios').value;

    if (nombreSerie && sistema.chequearSerie(nombreSerie)) {
        serie = sistema.seriePorNombre(nombreSerie);
        const opinion = new Opinion(nombreSerie, temporada, capitulo, puntaje, comentarios);

        serie.agregarOpinion(opinion);
        cargarSerieInformacion();
    }
}