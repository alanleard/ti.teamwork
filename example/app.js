var win = Ti.UI.createWindow();
var team = require('ti.teamwork');
win.open();

if(!team.checkAuth()){
    team.setAuth({
        apiKey:"YOUR-API-KEY", //Instructions: http://developer.teamworkpm.net/enabletheapiandgetyourkey
    });
}

sampleFunction();

function sampleFunction(){
/* params:{
 *          id:         The primary id of the object request
 *          alt_id:     Some API's require a second ID
 *          body:       JSON body to pass with "POST" or "PUT" sample format: '{"todo-list":{"name":"Test","private":true,"pinned":true,"tracked":true,"description":"Test"}}'
 *          onload:     The onload callback, returns single parameter as parsed JSON
 *          onerror:    The onerror callback, returns single parameter as error response
 *  }
 */
    team.getPersonPermissions({
        id:"PROJECT-ID",
        alt_id:"PERSON-ID",
        onload:function(e){
            alert("Success: "+JSON.stringify(e));
        },
        onerror:function(e){
            alert("Error: "+e.status);
        }
    });
};





