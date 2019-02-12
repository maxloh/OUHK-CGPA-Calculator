# OUHK CGPA 計算器

頭盔：最好自己驗算一次

## 🤔點用？

### Chrome

#### 方法1：JavaScript bookmarklet（推薦）

 - 按網址列右邊的<kbd>☆</kbd>按鈕 ➜ 按視窗左下角<kbd>更多...</kbd>
 - 名稱：OUHK CGPA，資料夾：書籤列，網址填以下文字 ➜ 按<kbd>儲存</kbd>
```
javascript:(function()%7Btry%7Bvar%20getGPA=function(grade)%7Bif(grade===%22A%22)return%204;if(grade===%22A-%22)return%203.7;if(grade===%22B+%22)return%203.3;if(grade===%22B%22)return%203;if(grade===%22B-%22)return%202.7;if(grade===%22C+%22)return%202.3;if(grade===%22C%22)return%202;return-1%7D;var%20table;document.querySelector('frame%5Bname=%22TargetContent%22%5D').contentDocument.querySelectorAll(%22table.PSLEVEL2GRID%22).forEach(function(element)%7Bvar%20text=element.innerText;if(text.includes(%22Subj%22)&&text.includes(%22Catalog%22)&&text.includes(%22Unit%22)&&text.includes(%22Grade%22))table=element%7D);var%20results=%5B%5D;var%20header=table.querySelectorAll(%22th%22);table.querySelectorAll(%22tr%22).forEach(function(rowElement,rowIndex)%7Bcells=rowElement.querySelectorAll(%22td%22);if(cells.length===0)return;results%5BrowIndex%5D=%7B%7D;cells.forEach(function(cellElement,columnIndex)%7Bif(columnIndex%3C=header.length)results%5BrowIndex%5D%5Bheader%5BcolumnIndex%5D.textContent%5D=cellElement.textContent.replace(/%0A/g,%22%22)%7D)%7D);var%20json=%7B%7D;json.results=results;var%20credit=0;var%20gpa=0;var%20included=%22Included%20in%20CGPA%0A%22;var%20notIncluded=%22Course%20Result%20not%20released%0A%22;json.results.forEach(function(element)%7Bif(getGPA(element.Grade)!==-1)%7Bincluded+=element.Subj+element.Catalog+%22%20%20%20%20%20%22+element.Unit+%22%20%20%20%20%20%22+element.Grade+%22%20%20%20%20%20%22+getGPA(element.Grade)+%22%0A%22;credit+=Number(element.Unit);gpa+=element.Unit*getGPA(element.Grade)%7Delse%20notIncluded+=element.Subj+element.Catalog+%22%0A%22%7D);alert(%22CGPA:%20%22+gpa/credit+%22%0A%0A%22+notIncluded+%22%0A%22+included+%22%0A%22+%22OUHK%20CGPA%20Calculator%20by%20Max%20Loh%22)%7Dcatch(e)%7Balert('Please%20press%20%22view%20all%20terms%22%20button%20in%20%22Academic%20Record%22%20page%20and%20try%20run%20this%20script%20again')%7D;%7D)();
```
- 登入myouhk ➜ 你讀緊個Programme ➜ Academic Record ➜ 按view all terms按鈕
- 按一下書籤列中剛加入的<kbd>OUHK CGPA</kbd>書籤
- 得咗🤟

#### 方法2：瀏覽器Console

- 登入myouhk ➜ 你讀緊個Programme ➜ Academic Record ➜ 按view all terms按鈕
- 按<kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>J</kbd>
- 將[OUHK-CGPA-Calculator.js](OUHK-CGPA-Calculator.js)嘅內容貼去Console到
- 按<kbd>Enter</kbd>
- 得咗🤟

## 🔨Build the script

Check the [build-bookmarklet.js](build-bookmarklet.js) file for building the bookmarklet.

## Disclaimer

You should always double check the resulting values.

This software is not affiliated, associated, authorized, endorsed by, or in any way officially connected with The Open University of Hong Kong.