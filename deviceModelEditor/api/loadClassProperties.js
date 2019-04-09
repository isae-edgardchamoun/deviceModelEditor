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
        var responseCurrentClass = "class";
        var responseParentClass = "parent";
        var restrictedDefinitions = ['constructor', 'super', 'description', 'icon'];
        var propertyDefPrefix = ".definition";

        var classPath;
        var className;

        function getParentClass(className){
        return this[className].prototype.super;
        }

        function getClassDefinitions(className){
            
        var obj =  this[className] ? this[className]._definition : null;

        var result = {};
        result['attributes'] =  {};
        result['methods'] = [];
        if(!obj) return result;

        for(var i = 0 ; i < obj.length; i++){
            var propt = obj[i];
            if(restrictedDefinitions.indexOf(propt) == -1){
                if(typeof(this[className].prototype[propt]) != "function"){
                    if(obj.indexOf(propt + propertyDefPrefix) != -1){
                        result['attributes'][propt] =   this[className].prototype[propt + propertyDefPrefix];
                    }
                }else{
                    result['methods'].push({
                        "name": propt,
                        "method" :  this[className].prototype[propt].toString()
                    })
                }
        
            }
        }
            
        return result;
        
        }


        function getParentClassDefinitions(obj){
        var result =  {};
        result['attributes'] =  {};
        result['methods'] = [];
        for(var propt in obj){
            if(restrictedDefinitions.indexOf(propt) == -1){
                if(typeof(obj[propt]) != "function"){
                    if(obj[propt + propertyDefPrefix] != null){
                        result['attributes'][propt] = obj[propt + propertyDefPrefix];
                    }
                }else{
                    result['methods'].push({
                        "name": propt,
                        "method" :  obj[propt].toString()
                    })
                }
            }
        }
            
        return result;
        }

        function getClassMethods(className){
        return this[className].prototype.attributes
        }

        function getClassDefinition(className){
        return this[className]._definition;
        }

        /*
        function getClassMethods(className){
        var result = [];
        var definitions = getClassDefinition(className);
        for(var i = 0; i < definitions.length; i++){
            var definition = definitions[i];
            if(restrictedDefinitions.indexOf(definition) == -1){
                
            result.push({
                "name": definition,
                "method" :  this[className].prototype[definition].toString()
            })
            }
        }
        return result;
        }*/
        /*
        function getParentMethods(obj){
        var result =  [];
        for(var propt in obj){
            if(restrictedDefinitions.indexOf(propt) == -1){
                result.push({
                    "name": propt,
                    "method" :  obj[propt].toString()
                })
            }
        }
        return result;
        }
        */

        function getClassNameFromPath(path){
        return path.split('.').pop();
        }

        function get(path){
        classPath = path;
        className = getClassNameFromPath(path);
        import(classPath);
            
        var result = {};
        var classDef = getClassDefinitions(className);
        
        result[responseCurrentClass] = {};
        result[responseCurrentClass]['name'] = path
        result[responseCurrentClass]['attributes'] = classDef.attributes;
        result[responseCurrentClass]['methods'] = classDef.methods;
        result[responseCurrentClass]['description'] = this[className].prototype.description;
        result[responseCurrentClass]['icon'] = this[className].prototype.icon;
        result[responseCurrentClass]['super'] = this[className].prototype.super;
            
        var parentFullClassName = getParentClass(className);
        if(parentFullClassName){
            var parentClassName = getClassNameFromPath(parentFullClassName);
            var parentClassDef = getParentClassDefinitions(this[parentClassName].prototype)
            result[responseParentClass] = {};
            result[responseParentClass]['name'] = parentClassName;
            result[responseParentClass]['attributes'] = parentClassDef.attributes;
            result[responseParentClass]['methods'] = parentClassDef.methods;
        }
        return result;
        }



		]]>
	</code>
</script>




