const minimist = require('minimist')

const argv = minimist(process.argv.slice(2),{
    alias:{
        a:'action',
        s:'shift',
        i:'input',
        o:'output',
        h:'help',
        v:'version'
    }
});

const action = argv['action'];
const shift = argv['shift'];
const input = argv['input'];
const output = argv['output'];
const help = argv['help'];
const version = argv['version'];

if(help){
    console.log('    --version   Show version number                             [boolean]\n' +
        '  -s, --shift     Set the shift for decode/encode data            [number] [required]\n' +
        '  -a, --action    Specify what action you want to perform         [required] [choices: "encode", "decode"]\n' +
        '  -i, --input     Specify the file where to get the data from     [string]\n' +
        '  -o, --output    Specify the file to save the data to            [string]\n' +
        '  -h, --help      Show help                                       [boolean]')
    process.exit()
}
if (version){
    console.log('caesar-chiper-cli 1.0.0')
    process.exit()
}

if(!(action && shift)){
    process.stderr.write('You should put all of required arguments');
    process.exit(1);
}

module.exports =  {
    action,
    shift,
    input,
    output,
    help,
    version,
};