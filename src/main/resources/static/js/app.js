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
    var numResp = 0;

    /*
    Realiza un get de los cuestionarios con su codigo
    */
    function getNombresCuestionarios(){
        apiclient.getCuestionariosNombres(poblarTablaCuestionarios);
    }

    /*
    Pinta una tabla con el nombre de cada cuestionario
    */
    var poblarTablaCuestionarios = function(data){
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
    
    /*
    Redireccion a la sala de espera del admin 
    Almacena el codigo del cuestionario
    */
    function entrarCues(codigoCues){
        apiclient.guardarCodigoCues(codigoCues);
        sessionStorage.setItem("codigoIngresadoV",codigoCues);
        sessionStorage.setItem('codPreg', codPreg)
        window.location="admin_wait.html"
    }

    /*
    Accion del admin para iniciar a un cuestionario, se conecta con el socket y redirige a traves del socket
    */
    function empezar(){
        var questik = sessionStorage.getItem("codigoIngresadoV");
        topico = "/newquestik."+questik;
        connectAndSubscribe();
        setTimeout(()=>{stompClient.send("/app/siguientePregunta"+topico);},1000)
    }

    
    /*
    Se activa al cargar el game.html, se conecta al socket y hace un get de las preguntas del cuestionario
    */
    function getPregunta(){
        if(sessionStorage.getItem("bandera") < 1){
            sessionStorage.setItem("bandera",1);
        }
        var x = document.getElementById("juego");
        var y = document.getElementById("puntajes");
        x.style.display = "block";
        y.style.display = "none";
        var boleano = sessionStorage.getItem("ayudaP")
        if(boleano == 'true'){
            document.getElementById('publico').style.display = 'none';
            var c = document.getElementById("grafica")
            var ctx = c.getContext("2d")
            ctx.clearRect(0, 0, c.width, c.height)
            if(window.document.querySelector("#grafica")){
                document.getElementById('grafic').style.display = 'none';
            }
        }
        var questik = sessionStorage.getItem("codigoIngresadoV");
        topico = "/newquestik."+questik;
        if(sessionStorage.getItem("global")==0){
            connectAndSubscribe();
        }
        sessionStorage.setItem("preguntaCarrera",1)
        apiclient.getCodCues(funIntermedia);
    }

    /*
    toma el codigo de la pregunta y realiza un get de esa pregunta
    */
    var funIntermedia = function(data){
        codCues=data
        apiclient.getPreguntaCodigo(codCues, sessionStorage.getItem("bandera") ,crearTabla);
    }

    /*
    Recibe pregunta con respuestas y las pinta, si no recibe pregunta me manda a la pagina final
    */
    var crearTabla = function(data){
        ejex = [];
        if(data.pregunta != undefined){
            document.getElementById("pregunta").innerHTML = data.pregunta;
            sessionStorage.setItem("tipoPregunta", data.tipo);
            if(sessionStorage.getItem("tipoPregunta")=='C'){
                $("#pregunta").append(" <span style='color:red'>CARRERA</span>")
            }
            for(let i=0;i<data.respuestas.length;i++){
                ejex.push('"' + data.respuestas[i].respuesta + '"')
                ejey.push(0)
                respuestas = data.respuestas;
                res = JSON.stringify(data.respuestas[i].respuesta)
                // $("#respuestas").append($("<button id =" + res + "class = 'btn-respuesta' onclick='app.revisarResp("+data.respuestas[i].correcta + "," + res + ")'>"+data.respuestas[i].respuesta+"</button>"))
                $("#respuestas").append($("<button id =" + res + "class = 'btn-respuesta' onclick='app.revisarResp("+ JSON.stringify(data.tipo) + "," + res + ")'>"+data.respuestas[i].respuesta+"</button>"))
            }
            intervalo = setInterval(cronometro, 1000, data.tiempo - 1)
            setTimeout(finTiempo,(data.tiempo)*1000)
        }else{
            var x = document.getElementById("juego");
            var y = document.getElementById("puntajes");
            var z = document.getElementById("fin")
            x.style.display = "none";
            y.style.display = "none";
            z.style.display = "block";
            apiclient.deleteAll();
        }
    }

    /*
    Pinta los numeros del tiempo restante
    */
    function cronometro(tiempo){
        document.getElementById('crono').innerHTML = tiempo + restar;
        restar -= 1;
    }

    /*
    cuando se acaba el tiempo me redirecciona a los puntajes
    */
    function finTiempo(){
        clearInterval(intervalo)
        restar = 0;
        siguientePregunta()
    }

    /*
    Accion del boton de las respuestas, revisa si esta bien y se pinta de verde o rojo respectivo
    */
    function revisarResp(tipo, str){
        var data;
        var preguntaActual = sessionStorage.getItem("bandera")
        $('.btn-respuesta').attr('disabled', true);
        $('.poderes').attr('disabled', true);
        var botones = document.getElementsByClassName('btn-respuesta')
        for (let i = 0; i<botones.length; i++){
            botones[i].style.backgroundColor = '#14263a';
        }
        if(tipo != 'C'){
            data = apiclient.revisarResp(str, preguntaActual);
            if(data){
                document.getElementById(str).style.backgroundColor = '#2e8b77';
                // console.log(sessionStorage.getItem("nickname"))
                apiclient.actualizarPuntajes(sessionStorage.getItem("nickname"))
            }else{
                document.getElementById(str).style.backgroundColor = '#FF0000';
            }
        }else{
            var questik = sessionStorage.getItem("codigoIngresadoV");
            topico = "/newquestik."+questik;
            stompClient.send("/app/carrera"+topico)
            // setTimeout(()=>{stompClient.send("/app/carrera"+topico);},500)
            data = apiclient.revisarCarrera(str, preguntaActual);
            if(data){
                setTimeout(()=>{document.getElementById(str).style.backgroundColor = '#2e8b77';},1000)
                apiclient.actualizarPuntajes(sessionStorage.getItem("nickname"))
            }else{
                sessionStorage.setItem("preguntaCarrera",0)
                setTimeout(()=>{document.getElementById(str).style.backgroundColor = '#FF0000';},1000)
                setTimeout(()=>{stompClient.send("/app/carrera"+topico);},1500)
            }
        }
        setRtasSelec(str)
    }

    function cambiarColor(){
        $('.btn-respuesta').attr('disabled', true);
        $('.poderes').attr('disabled', true);
        var botones = document.getElementsByClassName('btn-respuesta')
        for (let i = 0; i<botones.length; i++){
            botones[i].style.backgroundColor = '#AF67F0';
        }
    }

    function cambiarColorActivado(){
        $('.btn-respuesta').attr('disabled', false);
        $('.poderes').attr('disabled', false);
        var botones = document.getElementsByClassName('btn-respuesta')
        for (let i = 0; i<botones.length; i++){
            botones[i].style.backgroundColor = '#2e518b';
        }
    }

    /*
    Limpia la pantalla del game para poner una nueva pregunta
    */
    function clean(){
        $("#pregunta").empty();
        $("#respuestas").empty();
        var c = document.getElementById("grafica")
        var ctx = c.getContext("2d")
        ctx.clearRect(0, 0, c.width, c.height)
        ejey = [];
    }

    /*
    Cuando se acaba el tiempo se conecta al socket y me muestra los puntajes
    */
    function siguientePregunta(){
        var preg = sessionStorage.getItem("bandera")
        preg ++
        sessionStorage.setItem("bandera", preg)
        var questik = sessionStorage.getItem("codigoIngresadoV");
        topico = "/newquestik."+questik;
        setTimeout(()=>{stompClient.send("/app/puntajes"+topico);},500)
    }

    /*
    Visualmente parece que cambiara de preguntas a puntajes 
    */
    function accionSiguientePregunta(){
        if(sessionStorage.getItem("Url")=="start.html"){
            var btnnext = document.getElementById("btn-next");
            btnnext.style.display = "block";
        }
        var x = document.getElementById("juego");
        var y = document.getElementById("puntajes");
        y.style.display = "block";
        x.style.display = "none";
        clean();
    }

    /*
    Cuando se activa el boton de los puntajes suma 1 al cod de la pregunta se conecta al socket y llama a getPregunta
    */
    function next(){
        var questik = sessionStorage.getItem("codigoIngresadoV");
        topico = "/newquestik."+questik;
        setTimeout(()=>{stompClient.send("/app/siguientePregunta"+topico);},500)
    }

    var nickname;
    var codigoIngresado;

    /*
    Valida que nickname y usuarios no esten vacios, si esta correcto guarda el nickname en back
    */
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
            user.guardarUsuario(nickname);
            apiclient.revisarCues(nickname,codigoIngresado,validarCues);
        }
    }

    /*
    Revisa si el cuestionario ingresado existe
    */
    var validarCues = function(data){
        var existe = data
        if(existe === true){
            sessionStorage.setItem("codigoIngresadoV",$("#codigo").val());
            window.location="user_wait.html"
        }else{
            alert("no existe el cuestionario")
        }
    }

    /*
    Se muestra la sala de espera y realiza un get de los usuarios
    */
    function cargarWait(){
        $("#codigoJugar").empty();
        $("#codigoJugar").append(sessionStorage.getItem("codigoIngresadoV"))        
        $("#usuarios tbody").empty();
        // console.log(user.getUsuario())
        apiclient.getUsuarios(usuarios)
    }

    /*
    Pinta una tabla con los usuarios ingresados
    */
    var usuarios = function(data){
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
        alert("EN CONSTRUCCION")
        //stompClient.send("/app"+topico, {},JSON.stringify(nick))
    }


    function setRtasSelec(str){
        apiclient.setRtasSelec(str);
    }

    function prueba(){
        sessionStorage.setItem("ayudaP", true)
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

    /*
    Realiza la primera conexion para entrar a la sala de espera
    */
    var addToTopic = function(questik){
        stompClient.send("/app"+topico, {},JSON.stringify(questik));
    };



    var connectAndSubscribe = function () {
        console.info('Connecting to WS...');
        var socket = new SockJS('/stompendpoint');
        stompClient = Stomp.over(socket);
        stompClient.connect({}, function (frame) {
            console.log('Connected: ' + frame);
            stompClient.subscribe("/topic"+topico, function (eventbody) {
                if(eventbody.body==="nextQuestion"){
                    if(sessionStorage.getItem("global")==0){ 
                        sessionStorage.setItem("Url",document.referrer.split('/')[3])                   
                        window.location="game.html"
                    }else if(sessionStorage.getItem("global")==1){
                        getPregunta()
                    }
                }
                if(eventbody.body==="puntos"){
                    accionSiguientePregunta();
                    sessionStorage.setItem("global",1)
                    getPuntajes();
                }
                if(eventbody.body==="pausar"){
                    if(sessionStorage.getItem("preguntaCarrera") == 1){
                        sessionStorage.setItem("preguntaCarrera",2)
                        cambiarColor();
                    }else if(sessionStorage.getItem("preguntaCarrera") == 2){
                        sessionStorage.setItem("preguntaCarrera",1)
                        cambiarColorActivado()
                    }
                }
                else{
                    cargarWait();
                }
            })
        });
    };

    /*
    Realiza un get de los puntajes de cada jugador
    */
    function getPuntajes(){
        $("#puntajesA tbody").empty()
        apiclient.getPuntajes(showScore);
        
    }

    /*
    Pinta la tabla de puntajes de todos los jugadores
    */
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
        getNombresCuestionarios: getNombresCuestionarios,
        entrarCues: entrarCues,
        revisarResp:revisarResp,
        revisarCues:revisarCues,
        cargarWait:cargarWait,
        ayudaPubl: ayudaPubl,
        borrarUsu:borrarUsu,
        next: next,
        prueba: prueba,
        getPuntajes: getPuntajes,
        empezar:empezar,
        
        connect: function(){
            var questik = sessionStorage.getItem("codigoIngresadoV");
            topico = "/newquestik."+questik;
            connectAndSubscribe();
            sessionStorage.setItem("bandera",0);
            sessionStorage.setItem("global",0);
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