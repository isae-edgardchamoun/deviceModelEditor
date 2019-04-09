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
        require("m/framr/Framr").init(this, {classPath: "/"});

        var get = require("./loadClassProperties");
        return get.get(request.parameters.className)
		]]>
	</code>
</script>
