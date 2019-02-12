/*
Building steps of the JavaScript bookmarklet
1. Minify OUHK-CGPA-Calculator.js with Google Closure Compiler, only "Whitespace only" and "Simple" optimization would work
   website: https://closure-compiler.appspot.com/
   docs: https://developers.google.com/closure/compiler/docs/gettingstarted_ui
2. Download the converted file
3. Rename the downloaded file to "input.txt" and put it to the same directory as this script file
3. Run this script with Node.js
4. The bookmarklet is now in the "output.txt" file
*/

const fs = require('fs');
fs.readFile('input.txt', (err, data) => {
    if (err) throw err;
    fs.writeFile('output.txt', 'javascript:(function(){' + data.toString().replace(/\n/g, '') + '})();', (err) => { if (err) throw err; });
});
