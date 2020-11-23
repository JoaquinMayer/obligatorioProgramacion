// Joaquín Mayer (212667) | Agustín Tosar (206570)
window.addEventListener("load", inicio);

var sistema = new Sistema()
var indexSerie = sistema.series.length - 1

function inicio() {
    document.forms['formSerie'].addEventListener('submit', agregarSerie)
    document.forms['formSerie'].addEventListener('reset', resetSerie)
    document.forms['formOpinion'].addEventListener('submit', agregarOpinion)
    document.getElementById('nombreSerie').addEventListener('keyup', updateUrlIMDB)
    document.getElementById('btnPrevioSeries').addEventListener('click', previaSerie)
    document.getElementById('btnSiguienteSeries').addEventListener('click', siguienteSerie)
    document.forms['tablaOrdenadas'].addEventListener('change', mostrarTabla)
    mostrarSeccion('series');
}

function agregarSerie(event) {
    event.preventDefault()
    let nombreSerie = document.getElementById('nombreSerie').value
    let descripcion = document.getElementById('descripcionSerie').value
    let cantTemporadas = document.getElementById('cantidadTemp').value
    let cantidadCap = document.getElementById('cantidadCap').value

    let chequearSerie = sistema.chequearSerie(nombreSerie)
    if (chequearSerie == -1) {
        let urlImdb = buildUrlImdb(nombreSerie)
        let serie = new Serie(nombreSerie, descripcion, cantTemporadas, cantidadCap, urlImdb)
        sistema.agregarSerie(serie)
    } else {
        sistema.series[chequearSerie].descripcion = descripcion
        sistema.series[chequearSerie].cantTemporadas = cantTemporadas
        sistema.series[chequearSerie].cantidadCap = cantidadCap
    }
    event.target.reset()
    document.getElementById('imdb').href = 'https://www.imdb.com/'
}

function resetSerie(event) {
    event.target.reset()
    document.getElementById('imdb').href = 'https://www.imdb.com/'
    document.getElementById('mensajeSeries').innerHTML = ''
    indexSerie = -1;
}

function previaSerie() {
    if (indexSerie > 0) {
        indexSerie--
        mostrarSerie(indexSerie)
    } else if (sistema.series.length) {
        indexSerie = sistema.series.length - 1
        mostrarSerie(indexSerie)
    }
}

function siguienteSerie() {
    if (indexSerie != (sistema.series.length - 1)) {
        indexSerie++
        mostrarSerie(indexSerie)
    } else if (sistema.series.length) {
        indexSerie = 0
        mostrarSerie(indexSerie)
    }
}

function mostrarSerie(index) {
    document.getElementById('nombreSerie').value = sistema.series[index].nombre
    document.getElementById('descripcionSerie').value = sistema.series[index].descripcion
    document.getElementById('cantidadTemp').value = sistema.series[index].cantTemporadas
    document.getElementById('cantidadCap').value = sistema.series[index].cantidadCap
    document.getElementById('imdb').href = buildUrlImdb(sistema.series[index].nombre)
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

    if (nombre == 'opiniones') {
        cargarSeries();
        cargarSerieInformacion();
        document.getElementById('formOpinion').reset();
    } else if (nombre == 'estadisticas') {
        cargarEstadisticas();
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

    let nombreSerie = document.getElementById("opcionesSeries").value;
    let opinionList = document.getElementById('opinionesSeries');
    opinionList.innerHTML = '';

    if (nombreSerie && sistema.chequearSerie(nombreSerie) >= 0) {
        const idxSerie = sistema.chequearSerie(nombreSerie)
        serie = sistema.series[idxSerie];

        let temporadas = document.getElementById("temporada");
        temporadas.setAttribute("max", serie.cantTemporadas);

        let capitulos = document.getElementById("capitulo");
        capitulos.setAttribute("max", serie.cantidadCap);

        serie.opiniones.forEach(opinion => {
            let li = document.createElement("li");
            li.appendChild(document.createTextNode(`Temp: ${opinion.temporada || '-'} Cap: ${opinion.capitulo || '-'} Puntaje: ${opinion.puntaje}. ${opinion.comentarios}`));
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

    if (nombreSerie && sistema.chequearSerie(nombreSerie) >= 0) {
        const idxSerie = sistema.chequearSerie(nombreSerie)
        serie = sistema.series[idxSerie];
        const opinion = new Opinion(nombreSerie, temporada, capitulo, puntaje, comentarios);

        serie.agregarOpinion(opinion);
        cargarSerieInformacion();
    }
}

function cargarEstadisticas() {
    cargarSeriesSinOpiniones()
    cargarTopSeries()
    mostrarTabla()
}

function cargarSeriesSinOpiniones() {
    document.getElementById('seriesSinOpiniones').innerHTML = ''
    let seriesSinOpiniones = sistema.seriesSinOpiniones()

    seriesSinOpiniones.forEach(item => {
        var node = document.createElement("LI");
        var textnode = document.createTextNode(`${item.nombre} - ${item.descripcion} (Temporadas: ${item.cantTemporadas}, capítulos: ${item.cantidadCap})`);
        node.appendChild(textnode);
        document.getElementById("seriesSinOpiniones").appendChild(node);
    })
}

function cargarTopSeries() {
    document.getElementById('topSeries').innerHTML = ''
    let topSeries = sistema.topSeries()

    topSeries.forEach(item => {
        var node = document.createElement("LI");
        var textnode = document.createTextNode(`${item.nombre} - ${item.descripcion} (Temporadas: ${item.cantTemporadas}, capítulos: ${item.cantidadCap})`);
        node.appendChild(textnode);
        document.getElementById("topSeries").appendChild(node);
    })
}

function mostrarTabla() {
    let tabla = document.getElementById("tablaSeries");
    let orden = document.querySelector('input[name="orden"]:checked').value;
    let serieMostrar = sistema.ordenar(orden);

    tabla.innerHTML = "";
    if (serieMostrar.length == 0) {
        tabla.innerHTML = "Sin datos";
    }
    else {
        let header = tabla.createTHead();
        let row = header.insertRow(0);
        let cellSerie = row.insertCell();
        cellSerie.classList.add("th");
        cellSerie.innerHTML = "Serie";
        let cellOpiniones = row.insertCell();
        cellOpiniones.classList.add("th");
        cellOpiniones.innerHTML = "Cantidad de opiniones";
        let cellPromedio = row.insertCell();
        cellPromedio.classList.add("th");
        cellPromedio.innerHTML = "Promedio general";

        for (let i = 0; i < serieMostrar.length; i++) {
            let fila = tabla.insertRow();
            let serie = serieMostrar[i];
            fila.insertCell().innerHTML = serie.nombre
            fila.insertCell().innerHTML = serie.opiniones.length
            fila.insertCell().innerHTML = serie.promedioOpinion()
        }
    }

}
