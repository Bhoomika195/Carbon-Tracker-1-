const fs = require('fs')
const path = require('path')
const parser = require('@babel/parser')

function readDir(dir){
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for(const e of entries){
    const full = path.join(dir, e.name)
    if(e.isDirectory()) readDir(full)
    else if(/\.(js|jsx|ts|tsx)$/.test(e.name)) checkFile(full)
  }
}

function checkFile(file){
  const src = fs.readFileSync(file, 'utf8')
  try{
    parser.parse(src, { sourceType: 'module', plugins: ['jsx', 'classProperties', 'optionalChaining'] })
  }catch(err){
    console.error('\nSyntax error in', file)
    console.error(err.message)
  }
}

const root = path.resolve(process.cwd(), 'src')
if(!fs.existsSync(root)){
  console.error('No src folder found at', root)
  process.exit(1)
}
readDir(root)
console.log('\nSyntax check complete')
