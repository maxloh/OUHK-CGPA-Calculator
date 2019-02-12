/*
Building steps of the JavaScript bookmarklet
1. Minify OUHK-CGPA-Calculator.js with Google Closure Compiler, only "Whitespace only" and "Simple" optimization would work
   website: https://closure-compiler.appspot.com/home
   docs: https://developers.google.com/closure/compiler/docs/gettingstarted_ui
2. Replace all ' with \' in the resulting string
3. Replace all \n with \\n in the resulting string of (2)
4. Remove all line breaks in the resulting string of (3)
5. Put the resulting string of (4) into the "script" variable of this script
6. Run this script
*/

script = 'try{var getGPA=function(grade){if(grade==="A")return 4;if(grade==="A-")return 3.7;if(grade==="B+")return 3.3;if(grade==="B")return 3;if(grade==="B-")return 2.7;if(grade==="C+")return 2.3;if(grade==="C")return 2;return-1};var table;document.querySelector(\'frame[name="TargetContent"]\').contentDocument.querySelectorAll("table.PSLEVEL2GRID").forEach(function(element){var text=element.innerText;if(text.includes("Subj")&&text.includes("Catalog")&&text.includes("Unit")&&text.includes("Grade"))table=element});var results=[];var header=table.querySelectorAll("th");table.querySelectorAll("tr").forEach(function(rowElement,rowIndex){cells=rowElement.querySelectorAll("td");if(cells.length===0)return;results[rowIndex]={};cells.forEach(function(cellElement,columnIndex){if(columnIndex<=header.length)results[rowIndex][header[columnIndex].textContent]=cellElement.textContent.replace(/\\n/g,"")})});var json={};json.results=results;var credit=0;var gpa=0;var included="Included in CGPA\\n";var notIncluded="Course Result not released\\n";json.results.forEach(function(element){if(getGPA(element.Grade)!==-1){included+=element.Subj+element.Catalog+"     "+element.Unit+"     "+element.Grade+"     "+getGPA(element.Grade)+"\\n";credit+=Number(element.Unit);gpa+=element.Unit*getGPA(element.Grade)}else notIncluded+=element.Subj+element.Catalog+"\\n"});alert("CGPA: "+gpa/credit+"\\n\\n"+notIncluded+"\\n"+included+"\\n"+"OUHK CGPA Calculator by Max Loh")}catch(e){alert(\'Please press "view all terms" button in "Academic Record" page and try run this script again\')};';
console.log('javascript:(function(){' + script + '})();');