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
        var file =  require("file");
        require("m/framr/Framr").init(this, {classPath: "/"})

        function getClassNameFromPath(path){
            return path.split('.').pop();
        }

        function create(){
        var ancestorClass = request.parameters.ancestorClass
        var classPath = request.parameters.classPath;
        var output = request.parameters.output;
        var className = request.parameters.className ? request.parameters.className : getClassNameFromPath(classPath);
        var methods = request.parameters.methods;
        var update = request.parameters.update;
        var attributes = request.parameters.attributes;
        var newName = request.parameters.newName;
        var oldName = request.parameters.oldName;
        var icon = request.parameters.icon;
        var description = request.parameters.description;
        
        var params = {
                "ancestorClass": ancestorClass,
                "className": className,
                "classPath": classPath,
                "attributes": attributes,
                "methods" : methods,
                "output": output,
                "icon": icon,
                "description": description,
                "update" : update,
                "newName" : newName,
                "oldName" : oldName
        }; 
            var file = require('./manager/file');
            return file.create(params);
        }

        return create();

		]]>
	</code>
</script>


