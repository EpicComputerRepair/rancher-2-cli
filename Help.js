'use strict';

const commandLineUsage = require('command-line-usage');

const sections = [
  {
    header: 'Rancher Command Line Client',
    content: 'NodeJS Client to interact with Rancher 2.x'
  },
  {
    header: 'Options',
    optionList: [
            {
                    name: 'token',
                    description: 'API Token'
            },
            {
                    name: 'domain',
                    description: 'Server Domain'
            },
            {
                    name: 'projects',
                    description: 'Get Projects'
            },
            {
                    name: 'project',
                    description: 'Perform Operations On A Project.'
            },
	    {
		    name: 'components',
		    description: 'Get Components'
	    },
	    {
                    name: 'component',
                    description: 'Perform Operations On A Component'
            },
      	    {
        	    name: 'type',
        	    description: 'Rancer Type'
      	    },
	    {
		    name: 'namespace',
		    description: 'Kubernetes Namespace'
	    },
	    {
		    name: 'name',
		    description: 'Object Name'
	    },
	    {
		    name: 'deploy',
		    description: 'Change deployment enviroment variable on workload to trigger docker image pull and redeployment'
	    },
	    {
		    name: 'deploy2',
		   description: 'Change deployment enviroment variable on workload to trigger docker image pull and redeployment v2.6+'
	    },
	    {
		    name: 'debug',
		    description: 'Debug Program'
	    },
      	    {
       		    name: 'help',
        	    description: 'Print this usage guide'
      	    }
    ]
  }
];

module.exports = commandLineUsage(sections);
