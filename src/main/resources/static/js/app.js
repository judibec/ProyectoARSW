var apiclient = apiclient;
var app = (function(){
    var intervalo;
    var restar = 0;
    var respuestas;
    var ejex;
    var ejey = [];
    var codPreg = 1;
    var codCues = 0;

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
    
    function entrarCues(codigoCues){
        apiclient.guardarCodigoCues(codigoCues);
        sessionStorage.setItem("codigoIngresadoV", codigoCues);
        sessionStorage.setItem('codPreg', codPreg)
        window.location="game.html"
    }

    // var redirigir = function(){
    //     console.log(":(")
    //     window.location="game.html"
    // }

    
    function getPregunta(){
        
        apiclient.getCodCues(funIntermedia);
    }

    var funIntermedia = function(data){
        codCues=data
        console.log(sessionStorage.getItem('codPreg'))
        apiclient.getPreguntaCodigo(codCues, sessionStorage.getItem('codPreg') ,crearTabla);
    }

    var crearTabla = function(data){
        //intervalo = setInterval(cronometro, 1000, data.tiempo - 1)
        // intervalo = setInterval(() => {
        //     document.getElementById('crono').innerHTML = data.tiempo  + restar;
        //     restar -= 1;
        // }, 1000)
        ejex = [];
        // datanew.map((elemento) =>{
            if(data.pregunta != undefined){
                document.getElementById("pregunta").innerHTML = data.pregunta;
                for(let i=0;i<data.respuestas.length;i++){
                    ejex.push('"' + data.respuestas[i].respuesta + '"')
                    ejey.push(0)
                    respuestas = data.respuestas;
                    res = JSON.stringify(data.respuestas[i].respuesta)
                    $("#respuestas").append($("<button id =" + res + "class = 'btn-respuesta' onclick='app.revisarResp("+data.respuestas[i].correcta + "," + res + ")'>"+data.respuestas[i].respuesta+"</button>"))
                }
                
                intervalo = setInterval(cronometro, 1000, data.tiempo - 1)
                //setTimeout(finTiempo,(data.tiempo)*1000)
                // var dat = new Date(Date.now())
                // console.log(dat.getSeconds())
            }
        // });
    }

    function cronometro(tiempo){
        document.getElementById('crono').innerHTML = tiempo + restar;
        restar -= 1;
    }

    function finTiempo(){
        clearInterval(intervalo)
        restar = 0;
        siguientePregunta()
    }

    function revisarResp(booleano, str){
        var prueba = "#" + str
        var prueba2 = '.btn-respuesta'
        $('.btn-respuesta').attr('disabled', true);
        var botones = document.getElementsByClassName('btn-respuesta')
        console.log(botones)
        for (let i = 0; i<botones.length; i++){
            botones[i].style.backgroundColor = '#14263a';
        }
        document.getElementById(str).style.backgroundColor = '#2e8b77';
 

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
        var c = document.getElementById("grafica")
        var ctx = c.getContext("2d")
        ctx.clearRect(0, 0, c.width, c.height)
        ejey = [];
    }

    function siguientePregunta(){
        var cod = sessionStorage.getItem('codPreg')
        console.log(cod)
        cod ++
        sessionStorage.setItem('codPreg', cod)
        console.log(sessionStorage.getItem('codPreg'))
        window.location="answer.html"
        //codPreg += 1;
        //clean();
        //getPregunta();
    }

    function next(){
        window.location="game.html"
        //getPregunta();
    }

    function setRtasSelec(str){
        apiclient.setRtasSelec(str);
    }

    function prueba(){
        document.getElementById('publico').style.display = 'none';
        setInterval(ayudaPubl, 1000)
    }

    function ayudaPubl(){
        //document.getElementById('publico').style.display = 'none';
        apiclient.ayudaPubl(ver)

    }

    var ver = function(data){
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
        ayudaPubl: ayudaPubl,
        next: next,
        prueba: prueba
    }
})();