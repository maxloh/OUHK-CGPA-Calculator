# 非官方 OUHK CGPA 計算器

頭盔：最好自己驗算一次

**可能讀唔到`不及格`科目成績**

## 🤔點用？

### Chrome

#### 方法1：JavaScript bookmarklet（推薦）

 - 按網址列右邊的<kbd>☆</kbd>按鈕 ➜ 按視窗左下角<kbd>更多...</kbd>
 - 名稱：OUHK CGPA，資料夾：書籤列，網址填以下文字 ➜ 按<kbd>儲存</kbd>
```
javascript:(function(){'use strict';try{const getGPA=grade=>{if(grade==="A")return 4;if(grade==="A-")return 3.7;if(grade==="B+")return 3.3;if(grade==="B")return 3;if(grade==="B-")return 2.7;if(grade==="C+")return 2.3;if(grade==="C")return 2;if(grade==="Fail")return 0;return-1};let table=[...document.querySelector('frame[name="TargetContent"]').contentDocument.querySelectorAll("table.PSLEVEL2GRID")].find(element=>{let text=element.innerText;return text.includes("Subj")&&text.includes("Catalog")&&text.includes("Unit")&&text.includes("Grade")});let header=table.getElementsByTagName("th");let results=[...table.getElementsByTagName("tr")].filter(course=>course.getElementsByTagName("td").length!==0).map(rowElement=>{let course={};[...rowElement.getElementsByTagName("td")].forEach(function(cellElement,columnIndex){course[header[columnIndex].textContent]=cellElement.textContent.replace(/\n/g,"")});return course});let credit=0;let gpa=0;let included=[];let notIncluded=[];results.forEach(function(element){if(getGPA(element.Grade)!==-1){included.push(element.Subj+element.Catalog+"     "+element.Unit+"     "+element.Grade+"     "+getGPA(element.Grade));credit+=Number(element.Unit);gpa+=element.Unit*getGPA(element.Grade)}else notIncluded.push(element.Subj+element.Catalog)});alert("CGPA: "+gpa/credit+"\n\n"+(notIncluded.length>0?"Course Result not released\n"+notIncluded.join("\n")+"\n\n":"")+"Included in CGPA\n"+included.join("\n")+"\n\n"+"OUHK CGPA Calculator by Max Loh")}catch(e){alert('Please press "view all terms" button in "Academic Record" page and try run this script again')};})();
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