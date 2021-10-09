'use strict';

import CommandHelp from './Help.js'
import commandLineArgs from 'command-line-args'

const optionDefinitions = [    
  { name: 'token', alias: 't', type: String },
  { name: 'domain', alias: 'd', type: String },
  { name: 'projects', type: Boolean},
  { name: 'project', alias: 'p', type: String},
  { name: 'components', type: Boolean},
  { name: 'component', alias: 'c', type: String},
  { name: 'type', type: String},
  { name: 'namespace', alias: 'n', type: String},
  { name: 'name', type: String}, 
  { name: 'help', alias: 'h', type: Boolean},
  { name: 'debug', type: Boolean},
  { name: 'deploy', type: Boolean},
  { name: 'deploy2', type: Boolean},
];

const OPTIONS = commandLineArgs(optionDefinitions);

if(OPTIONS.help){
        console.log(CommandHelp);       
}

export default OPTIONS;