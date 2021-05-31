const fs = require('fs')
const path = require('path')
const Stream = require('stream')
const {decode,encode} = require('./caesar')
const args = require('./checkArgs')


const cypher =  args.action === 'encode' ? encode : decode;

if(args.input){
    fs.access( args.input, fs.constants.F_OK, (err:Error) => {
        if (err)
            process.stderr.write('File is not defined')
        process.exit(2);
    });
    fs.access( args.input, fs.constants.R_OK, (err:Error) => {
        if (err)
            process.stderr.write('Cant read the file')
        process.exit(3);
    });
}

if(args.output){
    fs.access(  args.output, fs.constants.F_OK , (err:Error) => {
        if (err)
            process.stderr.write('File is not defined')
        process.exit(4);
    });
    fs.access( args.output, fs.constants.W_OK, (err:Error) => {
        if (err)
            process.stderr.write('Cant write the file')
        process.exit(5);
    });
}

const readStream = args.input  ?  fs.createReadStream(path.resolve(__dirname,args.input),'utf8') : process.stdin
const writeStream =  args.output   ?  fs.createWriteStream(path.resolve(__dirname,args.output)) : process.stdout


const transformStream = new Stream.Transform({
    transform(chunk:any,encoding:string,callback:Function){
        const transformed = cypher(chunk.toString(), args.shift)

        callback(null,transformed)
    }
})


module.exports = {
    readStream,
    writeStream,
    transformStream
}