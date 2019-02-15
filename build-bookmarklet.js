/*
Building steps of the JavaScript bookmarklet
1. Install Node.js
2. Run 'npm install google-closure-compiler'
2. Run 'node .\build-bookmarklet.js'
3. The bookmarklet is now in the "bookmarklet.js" file
*/

const ClosureCompiler = require('google-closure-compiler').jsCompiler;
const fs = require('fs');

new ClosureCompiler({ js: 'OUHK-CGPA-Calculator.js', compilation_level: 'WHITESPACE_ONLY', output_wrapper: 'javascript:(function(){%output%})();' }).run([], (exitCode, stdOut, stdErr) => {
    fs.writeFile('bookmarklet.js', stdOut[0].src.replace(/\n/g, ''), (err) => { if (err) throw err; });
});