class Sistema {
    constructor() {
        this.series = []
    }

    agregarSerie(serie) {
        this.series.push(serie)
    }

    chequearSerie(nombre) {
        return this.series.findIndex((serie) =>
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
        const idxOpinion = this.chequearOpinion(opinion.temporada, opinion.capitulo);
        if (idxOpinion == -1) {
            this.opiniones.push(opinion);
        } else {
            this.opiniones[idxOpinion].puntaje = opinion.puntaje;
            this.opiniones[idxOpinion].comentarios = opinion.comentarios;
        }
    }

    chequearOpinion(temporada, capitulo) {
        return this.opiniones.findIndex(opinion =>
            opinion.temporada == temporada &&
            opinion.capitulo == capitulo
        )
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