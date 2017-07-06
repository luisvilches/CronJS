
/*
minuto [0-59]
hora [0-23]
dia del mes [0-31]
mes [0-12]
dia semana [0-7]
ejecutable
 */

class CronJS {
    constructor(scope){
        this.scope = scope;
        this.items = [];
        this.interval = null;
        this.init();
    }

    parse(strUnix){
        return strUnix.match(/^(\d+|\*) (\d+|\*) (\d+|\*) (\d+|\*) (\d|\*)/);
    }

    check(){
        var hoy = new Date();
        var test = [new Date(), hoy.getMinutes(), hoy.getHours(), hoy.getDate(), hoy.getMonth(), hoy.getDay()];
        for (var i in this.items) {
            var exec = 0;
            var t = this.parse(this.items[i][1]);
            for (var x in t)
            if (t[x] && (t[x] == test[x] || t[x] == "*"))exec++;
            if (exec == 5 && this.items[i][0] == 0) {
                    this.items[i][2]();
                    if (!this.items[i][3])
                                                                this.items[i][0] = 1;
            } else if (exec < 5 && this.items[i][0] == 1) {
                this.items[i][0] = 0;
            }
        }
    }

    set(strUnix, func, rep){
        if (!/^(\d+|\*) (\d+|\*) (\d+|\*) (\d+|\*) (\d|\*)/.test(strUnix)) return new Error("Formato invalido");
        this.items.push([0, strUnix, func, (rep || false)]);
    }

    init(seg){
        var seg = seg || 1000;
        this.interval = setInterval(this.scope+".check()", seg);
    }
}


//se inicia el servicio y como parametro se pasa el nombre de la variable con la que instanciamos el objeto CronJS.
var cronJS = new CronJS('cronJS');
cronJS.set("27 17 * * *", function() {
    console.log('hola');
});