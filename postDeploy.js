const fs = require('fs')
const exec = require('child_process').execSync

// carry exec function
const execSync = (arg) => exec(arg, { encoding: 'utf-8' })

// bump version in package.json
fs.copyFileSync('./dist/package.json', './package.json');

console.log(execSync('git add'))
console.log(execSync('git commit -m "bump package.json"'))
