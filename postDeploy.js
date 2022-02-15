const fs = require('fs')
const exec = require('child_process').execSync

// carry exec function
const execSync = (arg) => exec(arg, { encoding: 'utf-8' })

execSync(`npm run build && npm version ${process.argv[2]}`)
fs.copyFileSync('./package.json', './dist/package.json');

console.log(execSync('git add'))
console.log(execSync('git commit -m "bump package.json"'))

execSync(`cd dist && npm publish`)
