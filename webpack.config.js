module.exports = {
    entry: [ "./dist/index.js",  "./dist/value.js",  "./dist/control-flow.js" ],
    output: {
        path: __dirname,
        filename: "JTML.js"
    },
    externals: {
        JTML: "JTML"
    }
};
