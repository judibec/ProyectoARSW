var apiclient=apiclient;
var app = (function(){

    var codPreg = 1;
    function getPregunta(){
        apiclient.getPreguntaCodigo(codPreg,crearTabla);
    }

    var crearTabla = function(data){
        // datanew.map((elemento) =>{
            document.getElementById("pregunta").innerHTML = data.pregunta;
            for(let i=0;i<data.respuestas.length;i++){
                $("#respuestas").append($("<button id = 'btn-respuesta'>"+data.respuestas[i].respuesta+"</button>"))
            }
        // });
    }

    function clean(){
        $("#pregunta").empty();
        $("#respuestas").empty();
    }

    function siguientePregunta(){
        codPreg += 1;
        clean();
        getPregunta();
    }

    return{
        getPregunta:getPregunta,
        siguientePregunta:siguientePregunta
    }
})();