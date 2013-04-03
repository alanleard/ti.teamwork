/**
 * Provides a Titanium wrapper around calls to the TeamworkPM APIs.
 * API set documentation: http://developer.teamworkpm.net/introduction
 */
var teamApi = (function() {
    // +-----------------------+
    // | Private members.      |
    // +-----------------------+
    
    var urlRoot = 'http://appcelerator.teamworkpm.net/';
    var responseType = '.json';
    var logLevel = 'debug';
    var publicMethods = {};

    var API = {
        getAccount:{url:'account',type:'GET'},
        authenticate:{url:'authenticate',type:'GET'},
        getLatestActivity:{url:'latestActivity',type:'GET'},
        getLatestProjectActivity:{url:'projects/{id}/latestActivity',type:'GET'},
        createMessageCategory:{url:'projects/{id}/messageCategories',type:'POST'},
        getMessageCategory:{url:'messageCategories/{id}',type:'GET'},
        getProjectMessageCategories:{url:'projects/{id}/messageCategories',type:'GET'},
        updateMessageCategory:{url:'messageCategories/{id}',type:'PUT'},
        deleteMessageCategory:{url:'messageCategories/{id}',type:'DELETE'},
        createFileCategory:{url:'projects/{id}/fileCategories',type:'POST'},
        getFileCategory:{url:'fileCategories/{id}',type:'GET'},
        getProjectFileCategories:{url:'projects/{id}/fileCategories',type:'GET'},
        updateFileCategory:{url:'fileCategories/{id}',type:'PUT'},
        deleteFileCategory:{url:'fileCategories/{id}',type:'DELETE'},
        createNotebookCategory:{url:'projects/{id}/notebookCategories',type:'POST'},
        getNotebookCategory:{url:'notebookCategories/{id}',type:'GET'},
        getProjectNotebookCategories:{url:'projects/{id}/notebookCategories',type:'GET'},
        updateNotebookCategory:{url:'notebookCategories/{id}',type:'PUT'},
        deleteNotebookCategory:{url:'notebookCategories/{id}',type:'DELETE'},
        createLinkCategory:{url:'projects/{id}/linkCategories',type:'POST'},
        getLinkCategory:{url:'linkCategories/{id}',type:'GET'},
        getProjectLinkCategories:{url:'projects/{id}/linkCategories',type:'GET'},
        updateLinkCategory:{url:'linkCategories/{id}',type:'PUT'},
        deleteLinkCategory:{url:'linkCategories/{id}',type:'DELETE'},
        createProjectCategory:{url:'projectcategories',type:'POST'},
        getProjectCategory:{url:'projectCategories/{id}',type:'GET'},
        getAllProjectCategories:{url:'projectCategories',type:'GET'},
        updateProjectCategory:{url:'projectCategories/{id}',type:'PUT'},
        deleteProjectCategory:{url:'projectCategories/{id}',type:'DELETE'},
        getCategories:{url:'projects/{id}/messageCategories',type:'POST'},
        getRecentComments:{url:'{id}/{alt_id}/comments',type:'GET'},
        getComment:{url:'comments/{id}',type:'DELETE'},
        createComment:{url:'/{id}/{alt_id}/comments',type:'GET'},
        updateComment:{url:'comments/{id}',type:'PUT'},
        deleteComment:{url:'comments/{id}',type:'DELETE'},
        createCompany:{url:'companies',type:'GET'},
        updateCompany:{url:'companies/{id}',type:'PUT'},
        deleteCompany:{url:'companies/{id}',type:'DELETE'},
        getCompany:{url:'companies/{id}',type:'GET'},
        getAllCompanies:{url:'companies',type:'GET'},
        getProjectCompanies:{url:'projects/{id}/companies',type:'GET'},
        getAllFiles:{url:'projects/{id}/files',type:'GET'},
        getFile:{url:'files/{id}',type:'GET'},
        addFile:{url:'projects/{id}/files',type:'POST'},
        deleteFiles:{url:'files/{id}',type:'DELTE'},
        uploadFile:{url:'pendingfiles',type:'POST'},
        createMessage:{url:'projects/{id}/post',type:'POST'},
        getMessage:{url:'posts/{id}',type:'GET'},
        getLatestMessages:{url:'projects/{id}/posts',type:'GET'},
        getAllCategoryMessages:{url:'projects/{id}/cat/{alt_id}/posts',type:'GET'},
        updateMessage:{url:'posts/{id}',type:'PUT'},
        getArchivedMessages:{url:'projects/{id}/posts/archive',type:'GET'},
        getArchivedCategoryMessages:{url:'projects/{id}/cat/{alt_id}/posts/archive',type:'GET'},
        archiveMessage:{url:'messages/{id}/archive',type:'GET'},
        unarchiveMessage:{url:'messages/{id}/unarchive',type:'GET'},
        deleteMessage:{url:'posts/{id}',type:'DELETE'},
        createMessageReply:{url:'messages/{id}/messageReplies',type:'POST'},
        getMessageReply:{url:'messageReplies/{id}',type:'GET'},
        getMessageReplies:{url:'messages/{id}/replies',type:'GET'},
        updateMessageReply:{url:'messageReplies/{id}',type:'PUT'},
        deleteMessageReply:{url:'messageReplies/{id}',type:'DELETE'},
        getAllMilestones:{url:'milestones',type:'GET'},
        getProjectMilestones:{url:'projects/{id}/milestones',type:'GET'},
        getMilestone:{url:'milestones/{id}',type:'GET'},
        markMilestoneComplete:{url:'milestones/{id}/complete',type:'PUT'},
        markMilestoneUncomplete:{url:'milestones/{id}/uncomplete',type:'PUT'},
        createMilestone:{url:'projects/{id}/milestones',type:'POST'},
        updateMilestone:{url:'milestones/{id}',type:'PUT'},
        deleteMilestone:{url:'milestones/{id}',type:'DELETE'},
        getAllNotebooks:{url:'notebooks',type:'GET'},
        getProjectNotebooks:{url:'projects/{id}/notebooks',type:'GET'},
        getNotebook:{url:'notebooks/{id}',type:'GET'},
        createNotebook:{url:'projects/{id}/notebooks',type:'POST'},
        updateNotebook:{url:'notebooks/{id}',type:'PUT'},
        lockNotebook:{url:'notebooks/{id}/lock',type:'PUT'},
        unloackNotebook:{url:'notebooks/{id}/unlock',type:'PUT'},
        deleteNotebook:{url:'notebooks/{id}',type:'DELETE'},
        addUser:{url:'people',type:'POST'},
        editUser:{url:'people/{id}',type:'PUT'},
        deleteUser:{url:'people/{id}',type:'DELETE'},
        getMe:{url:'me',type:'GET'},
        getPeople:{url:'people',type:'GET'},
        getAllPeople:{url:'projects/{id}/people',type:'GET'},
        getPersonPermissions:{url:'projects/{id}/people/{alt_id}',type:'GET'},
        getCompanyPeople:{url:'companies/{id}/people',type:'GET'},
        getPerson:{url:'people/{id}',type:'GET'},
        getAPIKeys:{url:'people/APIKeys',type:'GET'},
        createMyStatus:{url:'me/status',type:'POST'},
        createStatus:{url:'people/{id}/status',type:'POST'},
        updateMyStatus:{url:'me/status/{id}',type:'PUT'},
        updateStatus:{url:'people/status/{id}',type:'PUT'},
        deleteMyStatus:{url:'me/status/{id}',type:'DELETE'},
        deleteStatus:{url:'people/status/{id}',type:'DELETE'},
        getMyStatus:{url:'me/status',type:'GET'},
        getStatus:{url:'people/{id}/statuses',type:'GET'},
        getEveryonesStatus:{url:'people/status',type:'GET'},
        addProjectUser:{url:'projects/{id}/people/{id}',type:'POST'},
        removeProjectUser:{url:'projects/{id}/people/{id}',type:'DELETE'},
        getUserProjectPermissions:{url:'projects/{id}/people/{id}',type:'GET'},
        updateUserProjectPermissions:{url:'projects/{id}/people/{id}',type:'PUT'},
        createProject:{url:'projects',type:'POST'},
        updateProject:{url:'projects/{id}',type:'PUT'},
        deleteProject:{url:'projects/{id}',type:'DELETE'},
        getAllProjects:{url:'projects',type:'GET'},
        getProject:{url:'projects/{id}',type:'GET'},
        getStarredProjects:{url:'projects/starred',type:'GET'},
        starProject:{url:'projects/{id}/star',type:'PUT'},
        unstarProject:{url:'projects/{id}/unstar',type:'PUT'},
        getAllLinks:{url:'links',type:'GET'},
        getProjectLinks:{url:'projects/{id}/links',type:'GET'},
        getLink:{url:'links/{id}',type:'GET'},
        createLink:{url:'projects/{id}/links',type:'POST'},
        updateLink:{url:'links/{id}',type:'PUT'},
        deleteLink:{url:'links/{id}',type:'DELETE'},
        getAllTime:{url:'time_entries',type:'GET'},
        getAllProjectTime:{url:'projects/{id}/time_entries',type:'GET'},
        getTaskTime:{url:'todo_items/{id}/time_entries',type:'GET'},
        createTime:{url:'projects/{id}/time_entries',type:'POST'},
        createTaskTime:{url:'todo_items/{id}/time_entries',type:'POST'},
        getTime:{url:'time_entries/{id}',type:'GET'},
        updateTime:{url:'time_entries/{id}',type:'PUT'},
        deleteTime:{url:'time_entries/{id}',type:'DELETE'},
        getAllTaskLists:{url:'projects/{id}/todo_lists',type:'GET'},
        getTaskList:{url:'todo_lists/{id}',type:'GET'},
        updateTaskList:{url:'todo_lists/{id}',type:'PUT'},
        createTaskList:{url:'projects/{id}/todo_lists',type:'POST'},
        deleteTaskList:{url:'todo_lists/{id}',type:'DELETE'},
        reorderTaskLists:{url:'projects/{id}/todo_lists/reorder',type:'GET'},
        getAllTasks:{url:'todo_lists/{id}/tasks',type:'GET'},
        getTask:{url:'todo_items/{id}',type:'GET'},
        markTaskComplete:{url:'todo_items/{id}/complete',type:'PUT'},
        markTaskUncomplete:{url:'todo_items/{id}/uncomplete',type:'PUT'},
        addTask:{url:'todo_lists/{id}/todo_items',type:'POST'},
        editTask:{url:'todo_items/{id}',type:'PUT'},
        deleteTask:{url:'todo_items/{id}',type:'DELETE'},
        reorderTasks:{url:'todo_lists/{id}/todo_items/reorder',type:'GET'},
        getEvents:{url:'events',type:'GET'}
    };
    var log = {
        info: function(params){
            if(logLevel == 'info'){
                Ti.API.info(params);
            } else if (logLevel == 'debug'){
                Ti.API.debug(params);
            }
        },
        debug: function(params){
            if(logLevel == 'info'){
                Ti.API.info(params);
            } else if (logLevel == 'debug'){
                Ti.API.debug(params);
            }
    
        },
        error: function(params){
            if(logLevel == 'info'){
                Ti.API.info(params);
            } else if (logLevel == 'debug'){
                Ti.API.error(params);
            }
            
        }      
    };
    
    var fetch = function(params) {
        
       if(Ti.App.Properties.hasProperty('ti.teamwork.auth')){
            var url_params = params.url_params || null;
            var url = encodeURI(urlRoot + params.url + responseType + "?"+ url_params);
            var body = params.body || null;
            var type = params.type?params.type:"GET";
            var onload = params.onload || null;
            var onerror = params.onerror || null;
            var xhr = Ti.Network.createHTTPClient();
            log.debug("Teamwork Request: "+url)
            xhr.onload = function(e) {
                e.status = this.status;
                if (this.status == 200 || this.status == 201) {
                        onload && onload(JSON.parse(this.responseText));
                        log.debug("Teamwork Response: "+this.responseText);
                   
                } else if(this.status === 204){
                    log.debug("Teamwork Response: NO CONTENT");
                    onload && onload("No Available Content");
                    
                } else{
                    log.debug("Teamwork Error: "+this.status+"("+e+")");
                    this.onerror(e);
                }
            };
            
            xhr.onerror = function(e) {
                log.debug("Teamwork Request Error: "+this.status);
                e.status = this.status;
                onerror && onerror(e);
            };
            
            xhr.open(type, url);
            
            xhr.setRequestHeader('Authorization', Ti.App.Properties.getString('ti.teamwork.auth'));
            
            xhr.send(body);
            
        } else {
            log.error("TeamworkPM API Key Required.");
        }
    };
    
    // +-----------------------+
    // | Public members.       |
    // +-----------------------+
          
    publicMethods.setAuth = function(params){
        if(params && params!="clear"){
            if(params.apiKey){
                 Ti.App.Properties.setString('ti.teamwork.auth','Basic ' + Titanium.Utils.base64encode(params.apiKey + ':password'));
                 log.debug("Teamwork API Key Set");
            }
        } 
    };
    
    publicMethods.checkAuth = function(){
        if(!Ti.App.Properties.hasProperty('ti.teamwork.auth')){
            return false;
        } else {
            return true;
        }
    };
    publicMethods.setLogLevel = function(params){
        if(params && params == 'debug'){
            logLevel = 'debug';
        } else if (params && params == 'info'){
            logLevel = 'info'
        }
    };
    publicMethods.setResponseType = function(params){
        if(params && params=="json"){
            responseType = ".json"
        } else if(params && params=="xml"){
            responseType = ".xml"
        } else {
            log.error("MODULE ti.teamwork responseType accepts 'json' or 'xml' only.");
        }
    };
    
    //Generate public API methods
    for(var method in API){
        createMethod(method)
    }
     
     /* Teamwork API Set.
     *  params:{
     *          id:         The primary id of the object request
     *          alt_id:     Some API's require a second ID
     *          body:       JSON body to pass with "POST" or "PUT" sample format: '{"todo-list":{"name":"Test","private":true,"pinned":true,"tracked":true,"description":"Test"}}'
     *          onload:     The onload callback, returns single parameter as parsed JSON
     *          onerror:    The onerror callback, returns single parameter as error response
     *  }
     */

    function createMethod(_method){
        if(API[_method].url.indexOf("{id}")!=-1 && API[_method].url.indexOf("{alt_id}")!=-1){
            
             publicMethods[_method] = function(params){
                if (params && params.id && params.alt_id) {
                    params.url = API[_method].url.replace('{id}',params.id).replace('{alt_id}',params.alt_id);
                    params.type =API[_method].type;
                    fetch(params);
                } else if(params && !params.id){
                    log.error("MODULE ti.teamwork: Missing required parameter 'alt_id' for "+_method);
                } else if(params && !params.alt_id){
                    log.error("MODULE ti.teamwork: Missing required parameter 'id' for "+_method);
                } else {
                    log.error("MODULE ti.teamwork: Missing parameters for "+_method);
                }
            };
             
        } else if (API[_method].url.indexOf("{id}")!=-1){
             
             publicMethods[_method] = function(params){
                if (params && params.id) {
                    params.url = API[_method].url.replace('{id}',params.id);
                    params.type =API[_method].type; 
                    fetch(params);
                } else if(params && !params.id){
                    log.error("MODULE ti.teamwork: Missing required parameter 'id' for "+_method);
                } else {
                    log.error("MODULE ti.teamwork: Missing parameters for "+_method);
                }
             };
             
        } else {
             
             publicMethods[_method] = function(params){
                params.url = API[_method].url; 
                params.type =API[_method].type; 
                fetch(params);
            };
             
        }
    };
    
    return publicMethods;  
   
})();

module.exports = teamApi;