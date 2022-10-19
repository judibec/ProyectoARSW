var apiclient=apiclient;
var app = (function(){
    function getPregunta(){
        apiclient.getPreguntaCodigo(crearTabla);
    }

    var crearTabla = function(data){
        const datanew = data.map((elemento)=>{
            return{
                pregunta: elemento.pregunta,
                respuestas:elemento.respuestas
            }
        });
        datanew.map((elemento) =>{
            console.log(elemento.respuestas.length)
            document.getElementById("pregunta").innerHTML = elemento.pregunta;
            for(let i=0;i<elemento.respuestas.length;i++){
                $("#respuestas").append($("<button>"+elemento.respuestas[i].respuesta+"</button>"))
            }
        });
    }

    return{
        getPregunta:getPregunta
    }
})();