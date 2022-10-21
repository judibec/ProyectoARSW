var apiclient = apiclient;
var app = (function(){
    function getNombres(){
        apiclient.getCuestionariosNombres(poblarTabla);
    }

    var poblarTabla = function(data){
        const datanew = data.map((elemento) =>{
            return{
                codigo: elemento.o1,
                name : elemento.o2
            }
        });
        datanew.map((element) => {
             $("#table > tbody:last").append($("<tr><td>" + element.name + "</td><td>" + 
             "<button id=" + element.name + " class=" + "starts" + " onclick=app.entrarCues("+element.codigo+")>Iniciar</button>" + "</td>"));
        });
    }
    
    var codCues = 0;
    function entrarCues(codigoCues){
        apiclient.guardarCodigoCues(codigoCues);
        window.location="game.html"
    }

    // var redirigir = function(){
    //     console.log(":(")
    //     window.location="game.html"
    // }

    
    var codPreg = 1;
    function getPregunta(){
        apiclient.getCodCues(funIntermedia);
    }

    var funIntermedia = function(data){
        console.log(data)
        codCues=data
        apiclient.getPreguntaCodigo(codCues,codPreg,crearTabla);
    }

    var crearTabla = function(data){
        // datanew.map((elemento) =>{
            console.log(data)
            if(data.pregunta != undefined){
                document.getElementById("pregunta").innerHTML = data.pregunta;
                for(let i=0;i<data.respuestas.length;i++){
                    $("#respuestas").append($("<button id = 'btn-respuesta' onclick='app.revisarResp("+data.respuestas[i].correcta+")'>"+data.respuestas[i].respuesta+"</button>"))
                }
                console.log(data.tiempo)
                setTimeout(finTiempo,(data.tiempo)*1000)
            }
        // });
    }

    function finTiempo(){
        siguientePregunta()
    }

    function revisarResp(booleano){
        if(booleano === true){
            console.log("tabn")
        }else{
            console.log("tamal")
        }
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
        siguientePregunta:siguientePregunta,
        getNombres: getNombres,
        entrarCues: entrarCues,
        revisarResp:revisarResp
    }
})();