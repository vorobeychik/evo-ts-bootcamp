const { pipeline } = require('stream');
const streams = require('./streams');

pipeline(
    streams.readStream,
    streams.transformStream,
    streams.writeStream,
    ((err:Error) => {
        if (err) {
            console.log(err.message)
        }
    })
);


