<script>
	<scriptACL>
		<execute>authenticated</execute>
		<read>nobody</read>
		<write>nobody</write>
	</scriptACL>
	<code>
		<![CDATA[
		/***************************************************************************
		 * This script is deployed as a system script. This means that it will be 
		 * available for all apstrata accounts, including the apstrata account 
		 * corresponding to a scriptr user. Thus, this script can be invoked while
		 * passing the scriptr user access token, and hence will be invoked under the 
		 * apstrata account corresponding to the scriptr user whose access token is 
		 * provided. (The access token of a scriptr user is actually the access token
		 * of a device created under the apstrata account associated with the scriptr
		 * user)
		 ***************************************************************************/
		var hogan = require("../../mustache/mustache.js").Mustache;
        var file =  require("file");
        var templateString = file.get("../../MoustacheTemplate.html").result.content;
        var scriptContentType =  "application/vnd.scriptr-javascript";
        function getClassNameFromPath(path){
            return path.split('.').pop();
        }

        function rename(params){
        var oldname;
        var newname;
        var params = {
            "apsdb.name": oldname,
            "apsdb.newName": newname,
            "apsdb.update":true
        }

        var resp = apsdb.callApi("SaveFile", params, null);

        return resp;
        }

        function remove(params){
        var params = {
            "apsdb.name": getFilePath( params.classPath)
        }
        var resp = apsdb.callApi("DeleteFile", params, null);
        return resp;
        }

        function getFilePath(classPath, output){
        var output =  output ? output : "/";
        var path= classPath.replace(/\./g,'/');
        return output + path;
        }

        function create(params){
        var ancestorClass = params.ancestorClass
        var classPath = params.classPath;
        var className = getClassNameFromPath(classPath);
        var methods = params.methods ? JSON.parse(params.methods) : [];
        var update = params.update;
        var attributes = params.attributes ? JSON.parse(params.attributes) : [];
        var icon = params.icon;
        var description = params.description;
        var newName = params.newName;
        var oldName = params.oldName;
        var script = hogan.render(templateString, {
                "AncestorClass": ancestorClass,
                "ClassName": className,
                "ClassPath": classPath,
                "attributes": attributes,
                "methods" : methods,
                "icon":icon,
                "description":description
        }); 
        var scriptName ="";
        if(newName!=null && newName != undefined && newName!=""){
                scriptName =  getFilePath(oldName, params.output);
        }else{
                scriptName =  getFilePath(classPath, params.output);
        }
        
        var params = {
            "apsdb.name": scriptName,
            "apsdb.content": JSON.stringify({ 
                "content" : script,
                "contentType": scriptContentType
            }),
            "apsdb.update":update
        }
        
        if(newName!=null && newName != undefined && newName!=""){
            params["apsdb.newName"] = getFilePath(newName, params.output);;
        }

        var resp = apsdb.callApi("SaveFile", params, null);

        return resp;
        }


		]]>
	</code>
</script>
