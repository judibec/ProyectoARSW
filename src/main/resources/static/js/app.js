var apiclient = apiclient;
var app = (function(){
    var intervalo;
    var restar = 0;
    var respuestas;
    var ejex;
    var ejey = [];
    var topico = 0;
    var stompClient = null;
    var codPreg = 1;
    var codCues = 0;
    var pregunta = 1;

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
        sessionStorage.setItem("codigoIngresadoV",codigoCues);
        sessionStorage.setItem('codPreg', codPreg)
        window.location="admin_wait.html"
    }


    function empezar(){
        localStorage.setItem("global", 0);
        localStorage.setItem("bandera",0);
        var questik = sessionStorage.getItem("codigoIngresadoV");
        topico = "/newquestik."+questik;
        connectAndSubscribe();
        setTimeout(()=>{stompClient.send("/app/siguientePregunta"+topico);},1000)
    }



    function getPregunta(){
        if(localStorage.getItem("bandera") < 1){
            localStorage.setItem("bandera",1);
        }
        var x = document.getElementById("juego");
        var y = document.getElementById("puntajes");
        x.style.display = "block";
        y.style.display = "none";
        var questik = sessionStorage.getItem("codigoIngresadoV");
        topico = "/newquestik."+questik;
        connectAndSubscribe();
        apiclient.getCodCues(funIntermedia);
    }

    var funIntermedia = function(data){
        console.log(data);
        codCues=data
        console.log(sessionStorage.getItem('codPreg'))

        apiclient.getPreguntaCodigo(codCues, localStorage.getItem("bandera") ,crearTabla);
    }

    var crearTabla = function(data){
        //console.log(localStorage.getItem("uwu"))
        ejex = [];
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
            setTimeout(finTiempo,(data.tiempo)*1000)
        }else{
            window.location = "index.html"
        }
    }

    function cronometro(tiempo){
        document.getElementById('crono').innerHTML = tiempo + restar;
        restar -= 1;
    }

    function finTiempo(){
        clearInterval(intervalo)
        restar = 0;
        var preg = localStorage.getItem("bandera")
        preg --
        localStorage.setItem("bandera", preg)
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
        var preg = localStorage.getItem("bandera")
        preg ++
        localStorage.setItem("bandera", preg)
        var questik = sessionStorage.getItem("codigoIngresadoV");
        topico = "/newquestik."+questik;
        connectAndSubscribe();
        setTimeout(()=>{stompClient.send("/app/puntajes"+topico);},500)
    }

    function adminNextQ(){
        accionSiguientePregunta();
    }

    function accionSiguientePregunta(){
        var x = document.getElementById("juego");
        var y = document.getElementById("puntajes");
        y.style.display = "block";
        x.style.display = "none";
        clean();
    }

    function next(){
        var preg = localStorage.getItem("bandera")
        preg ++
        localStorage.setItem("bandera", preg)
        var questik = sessionStorage.getItem("codigoIngresadoV");
        topico = "/newquestik."+questik;
        setTimeout(()=>{stompClient.send("/app/siguientePregunta"+topico);},500)
        getPregunta()
    }

    var nickname;
    var codigoIngresado;
    function revisarCues(){
        nickname = $("#nickname").val();
        codigoIngresado = $("#codigo").val();
        nickname.oninvalid = function(event){
            event.target.setCustomValidity('Debe ingresar nickname');
        }
        codigoIngresado.oninvalid = function(event){
            event.target.setCustomValidity('Debe ingresar codigo');
        }
        if(nickname && codigoIngresado){
            apiclient.revisarCues(nickname,codigoIngresado,validarCues);
        }
        
        
    }

    var validarCues = function(data){
        var existe = data
        if(existe === true){
            sessionStorage.setItem("codigoIngresadoV",$("#codigo").val());
            window.location="user_wait.html"
        }else{
            alert("no existe el cuestionario")
        }
    }

    function cargarWait(){
        $("#codigoJugar").empty();
        $("#codigoJugar").append(sessionStorage.getItem("codigoIngresadoV"))        
        $("#usuarios tbody").empty();
        apiclient.getUsuarios(usuarios)
    }

    var usuarios = function(data){
        localStorage.setItem("uwu", data.length)
        
            const datanew = data.map((elemento) =>{
                return{
                    nickname: elemento.o1,
                    puntaje : elemento.o2
                }
            });
            datanew.map((element) => {
                $("#usuarios > tbody:last").append($("<tr><td>" + element.nickname + "</td><td>" + 
                "<button id=" + element.nickname + " class= 'eliminar' onclick=app.borrarUsu("+element.nickname+")>Eliminar</button>" + "</td>"));
            });
    }

    function borrarUsu(nick){
        stompClient.send("/app"+topico, {},JSON.stringify(nick))
    }

    function setRtasSelec(str){
        apiclient.setRtasSelec(str);
    }

    function prueba(){
        document.getElementById('publico').style.display = 'none';
        setInterval(ayudaPubl, 1000)
    }

    function ayudaPubl(){
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
    };

    var addToTopic = function(questik){
        stompClient.send("/app"+topico, {},JSON.stringify(questik));
    };

    var connectAndSubscribe = function () {
        console.info('Connecting to WS...');
        var socket = new SockJS('/stompendpoint');
        stompClient = Stomp.over(socket);
        
        //subscribe to /topic/TOPICXX when connections succeed
        stompClient.connect({}, function (frame) {
            console.log('Connected: ' + frame);
            stompClient.subscribe("/topic"+topico, function (eventbody) {
                if(eventbody.body==="nextQuestion"){
                    if(localStorage.getItem("global")==0){                      
                        //sessionStorage.setItem("bandera",1)
                        window.location="game.html"
                    }
                }
                if(eventbody.body==="puntos"){
                    adminNextQ();
                    //accionSiguientePregunta();
                    getPuntajes();
                }else{
                    cargarWait();
                }
            })
        });
    };

    function getPuntajes(){
        $("#puntajesA tbody").empty()
        apiclient.getPuntajes(showScore);
        
    }

    var showScore = function(data){
        console.log(data)
        const datanew = data.map((element) =>{
            return{
                nickname: element.o1,
                puntaje: element.o2
            }
        });
        datanew.map((element) =>{
            $("#puntajesA > tbody:last").append($("<tr><td>" + element.nickname + "</td><td>" + 
            element.puntaje.toString() + "</td>"));
        })
    }

    return{
        getPregunta:getPregunta,
        siguientePregunta:siguientePregunta,
        getNombres: getNombres,
        entrarCues: entrarCues,
        revisarResp:revisarResp,
        revisarCues:revisarCues,
        cargarWait:cargarWait,
        ayudaPubl: ayudaPubl,
        borrarUsu:borrarUsu,
        ayudaPubl: ayudaPubl,
        next: next,
        prueba: prueba,
        getPuntajes: getPuntajes,
        empezar:empezar,
        
        connect: function(){
            var questik = sessionStorage.getItem("codigoIngresadoV");
            topico = "/newquestik."+questik;
            connectAndSubscribe();
            setTimeout(()=>{addToTopic(questik);},1000)
        },

        disconnect: function () {
            if (stompClient !== null) {
                stompClient.disconnect();
            }
            setConnected(false);
            console.log("Disconnected");
        }
    }
})();