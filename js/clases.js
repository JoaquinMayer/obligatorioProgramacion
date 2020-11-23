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

    seriePorNombre(nombre) {
        let result = this.series.find(obj => {
            return obj.nombre === nombre
        })

        return result;
    }

    seriesSinOpiniones() {
        return this.series.filter(serie => serie.opiniones.length == 0)
    }

    topSeries() {
        return this.series.sort(function (a, b) {
            if (a.opiniones.length > b.opiniones.length) {
                return -1;
            }
            if (a.opiniones.length < b.opiniones.length) {
                return 1;
            }
            return 0;
        }).filter(serie => serie.opiniones.length > 0).slice(0, 3);
    }

    ordenar(orden) {
        if (orden == 'nombre') {
            return this.series.sort(function (a, b) {
                if (a.nombre > b.nombre) {
                    return 1;
                }
                if (a.nombre < b.nombre) {
                    return -1;
                }
                return 0;
            });

        } else {
            return this.series.sort(function (a, b) {
                if (a.opiniones.length > b.opiniones.length) {
                    return -1;
                }
                if (a.opiniones.length < b.opiniones.length) {
                    return 1;
                }
                return 0;
            });

        }
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

    promedioOpinion() {
        let sum = 0
        this.opiniones.forEach(opinion => {
            sum += parseInt(opinion.puntaje)
        })
        let avg = sum / this.opiniones.length
        return avg ? avg : ''
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