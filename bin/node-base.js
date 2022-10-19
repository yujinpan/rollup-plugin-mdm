#!/usr/bin/env node

const argv = require('yargs')(process.argv.slice(2))
  .scriptName('node-base')
  .usage('$0 [args]')
  .options({
    m: {
      alias: 'msg',
      default: 'Hello, World!',
      describe: 'message',
      string: true,
    },
  })
  .alias('v', 'version')
  .alias('h', 'help').argv;

require('../lib/index').helloWorld(argv);
