class Sistema {
    constructor() {
        this.series = []
    }

    agregarSerie(serie) {
        this.series.push(serie)
    }

    chequearSerie(nombre) {
        return this.series.some((serie) =>
            serie.nombre.toLowerCase() == nombre.toLowerCase()
        )
    }
}

class Serie {
    constructor(nombre, descripcion, cantTemporadas, cantidadCap, urlImdb) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.cantTemporadas = cantTemporadas;
        this.cantidadCap = cantidadCap;
        this.url = urlImdb;
        this.opiniones = []
    }

    agregarOpinion(opinion) {
        this.opinion.push(opinion)
    }
}

class Opinion {
    constructor(serie, temporada, capitulo, puntaje, comentarios) {
        this.serie = serie
        this.temporada = temporada
        this.capitulo = capitulo
        this.puntaje = puntaje
        this.comentarios = comentarios
    }
}