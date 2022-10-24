var apiclient = apiclient;
var app = (function(){
    var respuestas;
    var ejex;
    var ejey = [];
    var topico = 0;
    var stompClient = null;
    var conexion = false;
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
        sessionStorage.setItem("codigoIngresadoV",codigoCues);
        window.location="admin_wait.html"
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

    var nickname;
    var codigoIngresado;
    function revisarCues(){
        nickname = $("#nickname").val();
        codigoIngresado = $("#codigo").val();
        nickname.oninvalid = function(event){
            event.target.setCustomValidity('Debe ingresar nickname')
        }
        codigoIngresado.oninvalid = function(event){
            event.target.setCustomValidity('Debe ingresar codigo')
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
        // $("#usuarios").detach()
        $("#usuarios tbody").empty();
        apiclient.getUsuarios(usuarios)
    }

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
        stompClient.send("/app"+topico, {},JSON.stringify(nick))
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
            //    alert(JSON.parse(eventbody.body));
                // var ques=JSON.parse(eventbody.body);
                // revisarCues();
                cargarWait();
                
            })
        });

    };

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
        
        connect: function(){
            var questik = sessionStorage.getItem("codigoIngresadoV");
            topico = "/newquestik."+questik;
            connectAndSubscribe();
            setTimeout(()=>{addToTopic(questik);},1000)
            // alert(questik);
            // while(conexion){
            //     addToTopic(questik);
            //     revisarCues();  
            // }
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