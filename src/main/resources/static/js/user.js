var apiclient = apiclient;
var user = (function(){
    // var nickname;

    function guardarUsuario(nickname){
        sessionStorage.setItem("nickname",nickname);
    }

    function getUsuario(){
        sessionStorage.getItem("nickname");
    }

    return{
        guardarUsuario:guardarUsuario,
        getUsuario:getUsuario
    }
})();