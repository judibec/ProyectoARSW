
var apiclient = (function(){
    return {
        getCuestionariosNombres: function(callback){
            callback(
                JSON.parse($.ajax({type: 'GET', url: 'questiks/', async: false}).responseText)
            )
        },
        
        getPreguntaCodigo: function(codPreg,callback){
            callback(
                JSON.parse($.ajax({type: 'GET', url: 'questiks/12345/'+codPreg+'/'+'preg', async: false}).responseText)
            )},
    }
})();

