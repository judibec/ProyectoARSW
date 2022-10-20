var apiclient=(function(){
    return{
        getPreguntaCodigo: function(callback){
            callback(
                JSON.parse($.ajax({type: 'GET', url: 'questiks/67890', async: false}).responseText)
            )},
    }
})();
