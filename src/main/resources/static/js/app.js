var apiclient = apiclient;
var app = (function(){
    function getNombres(){
        apiclient.getCuestionariosNombres(poblarTabla);
    }

    var poblarTabla = function(data){
        data.map((element) => {
             $("#table > tbody:last").append($("<tr><td>" + element + "</td><td>" + 
             "<button id=" + element + " class=" + "starts" + " onclick=app.prueba()>Iniciar</button>" + "</td>"));
        });
    }

    function prueba(){
        console.log("messi");
    }

    return{
        getNombres: getNombres,
        prueba: prueba

    }
})();