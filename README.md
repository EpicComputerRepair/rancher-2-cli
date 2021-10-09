# rancher-2-cli - v0.1.1

Rancher Command Line Client

  NodeJS Client to interact with Rancher 2.x 

Options

  --token         API Token                                                                     
  --domain        Server Domain                                                                 
  --projects      Get Projects                                                                  
  --project       Perform Operations On A Project.                                              
  --components    Get Components                                                                
  --component     Perform Operations On A Component                                             
  --type          Rancer Type                                                                   
  --namespace     Kubernetes Namespace                                                          
  --name          Object Name                                                                   
  --deploy        Change deployment enviroment variable on workload to trigger docker image     
                  pull and redeployment
  --deploy2	  Change deployment enviroment variable on workload to trigger docker image
		  pull and redeployment for rancer v2.6+                                                         
  --debug         Debug Program                                                                 
  --help          Print this usage guide                                                        

--token REQUIRED
--domain REQUIRED

Created to update and redeploy workloads in Rancher after successful Gitlab build. Made modular to debug and expand uses of the command line utility.

## Example Usage

### Deploy lastest docker image to workload.

Pulls current config for workload and updates deployment environment variable. This triggers rancher to check and pull a new docker image. Thus redeploying with the new docker image.

`nodejs index.js --token TOKEN --domain DOMAIN --project PROJECT-ID --component workloads --name NAME --namespace default --type deployment --deploy`

