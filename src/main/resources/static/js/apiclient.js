var apiclient = (function(){
    return {
        getCodigoCuestionario: function(callback){
            callback(
                JSON.parse($.ajax({type: 'GET', url: 'questiks/', async: false}).responseText)
            )
        }
    }
})();