const request = require('request');
const colors = require('colors');

if(process.argv.find((item) => item === "--debug")){
	process.argv.forEach((item) => {
		console.log('['+colors.gray("DEBUG")+']['+colors.cyan("COMMAND")+'][Arg] '+item);
	});
}

const Command = require('./Command');

if(!Command.token || Command.token === ""){
	console.error("--token REQUIRED");
	process.exit(1);
}

if(!Command.domain || Command.domain === ""){
        console.error("--domain REQUIRED");
	process.exit(1);
}

let baseURL = 'https://'+Command.domain+'/v3';

function createRequest(requestOptions,callback){

	if(!requestOptions.method){
		requestOptions.method = "GET";
	}

	if(Command.debug){
		console.log('['+colors.gray("DEBUG")+']['+colors.cyan("REQUEST")+'][Domain] '+Command.domain);
		console.log('['+colors.gray("DEBUG")+']['+colors.cyan("REQUEST")+'][Path] '+requestOptions.path);
		console.log('['+colors.gray("DEBUG")+']['+colors.cyan("REQUEST")+'][Method] '+requestOptions.method);
		if(requestOptions.json){
			console.log('['+colors.gray("DEBUG")+']['+colors.cyan("REQUEST")+'][JSON] ',requestOptions.json);
		}
	}

	request({
        	uri: baseURL+requestOptions.path,
        	auth: {
        	        bearer: Command.token
        	},
		method: requestOptions.method,
        	json: requestOptions.json ? requestOptions.json : true
	},(error,response,data) => { 
		if(Command.debug){
                	console.log('['+colors.gray("DEBUG")+']['+colors.cyan("DATA")+'][JSON]',data);
                }
		if(callback){
			callback(error,response,data);
		}
	});
}

if(Command.projects){
	createRequest({
		path: '/project/'
	},(error,response,body) => {
		if(body.data && body.data.length > 0){
			body.data.forEach((item) => {
				if(item.state === "active"){
					console.log('['+colors.green("Project")+']['+colors.gray(item.id)+'] '+item.name);
					if(Command.components && item.links){
						for (let property in item.links) {
    							if (item.links.hasOwnProperty(property)) {
    								let idx = item.links[property].lastIndexOf("/");

                                                        	if(idx > -1){
                                                                	console.log('['+colors.cyan("Component")+']['+colors.gray(property)+'] '+item.links[property].substring(idx));
                                                        	}
							}
						}
					}
				}else{
					console.log('['+colors.green("Project")+']['+colors.yellow(item.id)+'] '+item.name);
				}
			});
		}
	});
}

if(Command.project){
	let path = '/project/'+Command.project;
	if(Command.component){
		path += '/'+Command.component+'/';
		console.log('['+colors.green("Project")+']['+colors.gray(Command.project)+']');
		if(Command.namespace && Command.name){
			
			console.log('['+colors.cyan("Component")+']['+colors.gray(Command.component)+']');
			console.log('['+colors.cyan("Namespace")+']['+colors.gray(Command.namespace)+']');
			
			if(Command.type){
				console.log('['+colors.cyan("Type")+']['+colors.gray(Command.type)+']');
				path += Command.type+":";
			}

			path += Command.namespace+":"+Command.name;

			createRequest({
				path: path
			},(error,response,body) => {
                                console.log('['+colors.green("Resource")+']['+colors.gray(Command.namespace)+'] '+Command.name);
				if(!error){
                			if(body && body.containers && body.containers.length > 0 && (Command.deploy || Command.deploy2)){
						
						if(Command.deploy){
							if(!body.containers[0].environment){
								body.containers[0].environment = {};
							}
						}else if(Command.deploy2){
							if(!body.containers[0].env){
								body.containers[0].env = {};
							}
						}
						
						//Modify Enviroment Var
                				let newDate = new Date().toString();
                				let originalDate = "";
						if(Command.deploy){
							originalDate = body.containers[0].environment.deployment ? body.containers[0].environment.deployment : "";
							body.containers[0].environment.deployment = newDate;
                                                	//console.log(body.containers[0].environment);
						}else if(Command.deploy2){
							originalDate = body.containers[0].env.deployment ? body.containers[0].env.deployment : "";
							body.containers[0].env.deployment = newDate;
                                                	//console.log(body.containers[0].env);
						}
                
                				//Make Put with modified data
                				createRequest({
							path: path,
							method: "PUT",
							json: body
						},(error,response,body) => {
							if(!error){
								console.log("Updated Deployment value from "+originalDate+" to "+newDate);
                        				}else{
                                				console.error(error);
                        				}
                				});
					}
        			}else{
                			console.error(error);
        			}

			});
		}else{
			createRequest({
				path: path
			},(error,response,body) => {
				console.log('['+colors.cyan("Component")+']['+colors.gray(Command.component)+']');
                	        if(body.data && body.data.length > 0){
                	        	body.data.forEach(function (item){
                	                	if(item.state === "active"){
                	                	        console.log('['+colors.cyan(Command.component)+']['+colors.gray(item.id)+'] '+item.name);
                	                	}else{
                	                	        console.log('['+colors.cyan(Command.component)+']['+colors.yellow(item.id)+'] '+item.name);
                	                	}
                	        	});
				}
                	});
		}
	}else{
		createRequest({
			path: path
		},(error,response,body) => {
        	        if(body){
				if(body.state === "active"){
					console.log('['+colors.green("Project")+']['+colors.gray(body.id)+'] '+body.name);	
				}else{
					console.log('['+colors.green("Project")+']['+colors.yellow(body.id)+'] '+body.name);
				}
        	        }
        	});
	}
}
