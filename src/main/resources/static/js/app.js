var apiclient = apiclient;
var app = (function(){
    var respuestas;
    var ejex;
    var ejey = [];
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
        codCues=data
        apiclient.getPreguntaCodigo(codCues,codPreg,crearTabla);
    }

    var crearTabla = function(data){
        ejex = [];
        // datanew.map((elemento) =>{
            if(data.pregunta != undefined){
                document.getElementById("pregunta").innerHTML = data.pregunta;
                for(let i=0;i<data.respuestas.length;i++){
                    ejex.push('"' + data.respuestas[i].respuesta + '"')
                    ejey.push(0)
                    respuestas = data.respuestas;
                    res = JSON.stringify(data.respuestas[i].respuesta)
                    $("#respuestas").append($("<button id = 'btn-respuesta' class = 'btn-respuesta' onclick='app.revisarResp("+data.respuestas[i].correcta + "," + res +")'>"+data.respuestas[i].respuesta+"</button>"))
                }
                

                //setTimeout(finTiempo,(data.tiempo)*1000)
            }
        // });
    }

    function finTiempo(){
        siguientePregunta()
    }

    function revisarResp(booleano, str){
        $('.btn-respuesta').attr('disabled', true);
        if(booleano === true){
            console.log("tabn")
        }else{
            console.log("tamal")
        }
        setRtasSelec(str)
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

    function setRtasSelec(str){
        apiclient.setRtasSelec(str);
    }

    function ayudaPubl(){
        apiclient.ayudaPubl(ver)
    }

    var ver = function(data){
        //console.log(data)
        for(let i = 0; i<data.length; i++){
            if(ejex.includes(data[i].o1.toString())){
                var indice = ejex.indexOf(data[i].o1.toString())
                ejey[indice] = data[i].o2;
            }
        }
        console.log(ejey)
        const grafica = document.querySelector("#grafica");
        const grafico = {
            label: "prueba",
            data: ejey,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)', 
            borderWidth: 1
        }
        new Chart(grafica, {
            type: 'bar',
            data: {
                labels: ejex,
                datasets: [
                    grafico
                ]
            },
            options: {
                responsive: true, 
                maintainAspectRatio: false,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }],
                },
            }
        });
    }

    return{
        getPregunta:getPregunta,
        siguientePregunta:siguientePregunta,
        getNombres: getNombres,
        entrarCues: entrarCues,
        revisarResp:revisarResp,
        ayudaPubl: ayudaPubl
    }
})();