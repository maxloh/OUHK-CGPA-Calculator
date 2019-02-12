# OUHK CGPA 計算器

頭盔：最好自己驗算一次

## 🤔點用？

### Chrome

#### 方法1：JavaScript bookmarklet（推薦）

 - 按網址列右邊的<kbd>☆</kbd>按鈕 ➜ 按視窗左下角<kbd>更多...</kbd>
 - 名稱：OUHK CGPA，資料夾：書籤列，網址填以下文字 ➜ 按<kbd>儲存</kbd>
```
javascript:(function(){try{var getGPA=function(grade){if(grade==="A")return 4;if(grade==="A-")return 3.7;if(grade==="B+")return 3.3;if(grade==="B")return 3;if(grade==="B-")return 2.7;if(grade==="C+")return 2.3;if(grade==="C")return 2;return-1};var table;document.querySelector('frame[name="TargetContent"]').contentDocument.querySelectorAll("table.PSLEVEL2GRID").forEach(function(element){var text=element.innerText;if(text.includes("Subj")&&text.includes("Catalog")&&text.includes("Unit")&&text.includes("Grade"))table=element});var results=[];var header=table.querySelectorAll("th");table.querySelectorAll("tr").forEach(function(rowElement,rowIndex){cells=rowElement.querySelectorAll("td");if(cells.length===0)return;results[rowIndex]={};cells.forEach(function(cellElement,columnIndex){if(columnIndex<=header.length)results[rowIndex][header[columnIndex].textContent]=cellElement.textContent.replace(/\n/g,"")})});var json={};json.results=results;var credit=0;var gpa=0;var included="Included in CGPA\n";var notIncluded="Course Result not released\n";json.results.forEach(function(element){if(getGPA(element.Grade)!==-1){included+=element.Subj+element.Catalog+"     "+element.Unit+"     "+element.Grade+"     "+getGPA(element.Grade)+"\n";credit+=Number(element.Unit);gpa+=element.Unit*getGPA(element.Grade)}else notIncluded+=element.Subj+element.Catalog+"\n"});alert("CGPA: "+gpa/credit+"\n\n"+notIncluded+"\n"+included+"\n"+"OUHK CGPA Calculator by Max Loh")}catch(e){alert('Please press "view all terms" button in "Academic Record" page and try run this script again')};})();
```
- 登入myouhk ➜ 你讀緊個Programme ➜ Academic Record ➜ 按view all terms按鈕
- 按一下書籤列中剛加入的<kbd>OUHK CGPA</kbd>書籤
- 得咗🤟

#### 方法2：瀏覽器Console

- 登入myouhk ➜ 你讀緊個Programme ➜ Academic Record ➜ 按view all terms按鈕
- 按<kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>J</kbd>
- 將[OUHK-CGPA-Calculator.js](https://raw.githubusercontent.com/maxloh/OUHK-CGPA-Calculator/master/OUHK-CGPA-Calculator.js)嘅內容貼去Console到
- 按<kbd>Enter</kbd>
- 得咗🤟

## 🔨Build the bookmarklet

Check the [build-bookmarklet.js](build-bookmarklet.js) file for building the bookmarklet.

## Disclaimer

You should always double check the resulting values.

This software is not affiliated, associated, authorized, endorsed by, or in any way officially connected with The Open University of Hong Kong.