/*
Building steps of the JavaScript bookmarklet
1. Install Node.js
2. Run 'npm install google-closure-compiler'
2. Run 'node ".\build-bookmarklet.js"'
3. The bookmarklet is now in the "bookmarklet.js" file
*/

const ClosureCompiler = require('google-closure-compiler').jsCompiler;
const fs = require('fs');

fs.readFile('OUHK-CGPA-Calculator.js', (err, data) => {
    if (err) throw err;
    new ClosureCompiler({
        compilation_level: 'WHITESPACE_ONLY'
    }).run([{
        src: data.toString(),
        sourceMap: null // optional input source map
    }], (exitCode, stdOut, stdErr) => {
        fs.writeFile('bookmarklet.js', 'javascript:(function(){' + stdOut[0].src.replace(/\n/g, '') + '})();', (err) => {
            if (err) throw err;
        });
    });
});