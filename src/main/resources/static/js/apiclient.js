var apiclient = (function(){
    return {
        getCuestionariosNombres: function(callback){
            callback(
                JSON.parse($.ajax({type: 'GET', url: 'questiks/', async: false}).responseText)
            )
        },
        
        getPreguntaCodigo: function(codCues,codPreg,callback){
            callback(
                JSON.parse($.ajax({type: 'GET', url: 'questiks/'+codCues+'/'+codPreg+'/preg', async: false}).responseText)
            )},

        guardarCodigoCues: function(codCues){
            var codigo = JSON.stringify(codCues)
            $.ajax({type: 'POST', url: 'questiks/', data: codigo, contentType: "application/json" })
        },

        getCodCues: function(callback){
            callback(
                JSON.parse($.ajax({type: 'GET', url: 'questiks/cuestionario', async: false}).responseText)
            )
        },

        revisarCues: function(nickname,codigo,callback){
            callback(
                JSON.parse($.ajax({type: 'GET', url: 'questiks/'+nickname+'/'+codigo+'/bandera1/bandera2', async: false}).responseText)
            )
        }
    }
})();