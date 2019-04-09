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
        function saveManifest(){
            var params = {
                "apsdb.name": "deviceModelsEditor/api/manifest.json",
                "apsdb.content": JSON.stringify({
                                    "content":request.parameters.content,
                                    "contentType": "text/plain",
                                    "ACL" : {"execute":"anonymous" , "read":"anonymous", "write":"anonymous" }
                    }),
                "apsdb.update":true
            }
                return apsdb.callApi("SaveFile", params, null);
        }

        if(request.parameters.classParams){
            var resp;
            var file = require('./manager/file');
            var classParams = JSON.parse(request.parameters.classParams);
                if(classParams['method']  == 'delete'){
                resp = file.remove(classParams);
            }else{
                resp = file.create(classParams);
            }

            if(resp.metadata.status == "success" || resp.metadata.errorCode == "FILE_NOT_FOUND"){
                return saveManifest();
            }else{
                return resp;
            }
            
        }else{
            return saveManifest();
        }
		]]>
	</code>
</script>









