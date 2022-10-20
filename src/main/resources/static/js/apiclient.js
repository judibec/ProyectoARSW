var apiclient=(function(){
    return{
        getPreguntaCodigo: function(codPreg,callback){
            callback(
                JSON.parse($.ajax({type: 'GET', url: 'questiks/12345/'+codPreg+'/'+'preg', async: false}).responseText)
            )},
    }
})();
