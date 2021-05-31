const minimist = require('minimist')

const argv = minimist(process.argv.slice(2),{
    alias:{
        a:'action',
        s:'shift',
        i:'input',
        o:'output',
    }
});

console.log(argv)

const action = argv['action'];
const shift = argv['shift'];
const input = argv['input'];
const output = argv['output'];


if(!(action && shift)){
    process.stderr.write('You should put all of required arguments');
    process.exit(1);
}

module.exports =  {
    action,
    shift,
    input,
    output
};