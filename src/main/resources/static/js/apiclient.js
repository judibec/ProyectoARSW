var apiclient = (function(){
    return {
        getCuestionariosNombres: function(callback){
            callback(
                JSON.parse($.ajax({type: 'GET', url: 'questiks/', async: false}).responseText)
            )
        }
    }
})();