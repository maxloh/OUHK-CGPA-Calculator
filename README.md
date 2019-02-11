# OUHK CGPA 計算器

頭盔：最好自己驗算一次

## 點用？

### Chrome

#### 方法1（推薦）

 - 按網址列右邊的<kbd>☆</kbd>按鈕 ➜ 按視窗左下角<kbd>更多...</kbd>
 - 名稱：OUHK CGPA，資料夾：書籤列，網址填以下文字 ➜ 按<kbd>儲存</kbd>
```
javascript:(function()%7Btry%7Bvar%20getGPA%3Dfunction(grade)%7Bif(grade%3D%3D%3D%22A%22)return%204%3Bif(grade%3D%3D%3D%22A-%22)return%203.7%3Bif(grade%3D%3D%3D%22B%2B%22)return%203.3%3Bif(grade%3D%3D%3D%22B%22)return%203%3Bif(grade%3D%3D%3D%22B-%22)return%202.7%3Bif(grade%3D%3D%3D%22C%2B%22)return%202.3%3Bif(grade%3D%3D%3D%22C%22)return%202%3Breturn-1%7D%3Bvar%20table%3Bdocument.querySelector('frame%5Bname%3D%22TargetContent%22%5D').contentDocument.querySelectorAll(%22table.PSLEVEL2GRID%22).forEach(function(element)%7Bvar%20text%3Delement.innerText%3Bif(text.includes(%22Subj%22)%26%26text.includes(%22Catalog%22)%26%26text.includes(%22Unit%22)%26%26text.includes(%22Grade%22))table%3Delement%7D)%3Bvar%20results%3D%5B%5D%3Bvar%20header%3Dtable.querySelectorAll(%22th%22)%3Btable.querySelectorAll(%22tr%22).forEach(function(rowElement%2CrowIndex)%7Bcells%3DrowElement.querySelectorAll(%22td%22)%3Bif(cells.length%3D%3D%3D0)return%3Bresults%5BrowIndex%5D%3D%7B%7D%3Bcells.forEach(function(cellElement%2CcolumnIndex)%7Bif(columnIndex%3C%3Dheader.length)results%5BrowIndex%5D%5Bheader%5BcolumnIndex%5D.textContent%5D%3DcellElement.textContent.replace(%2F%5Cn%2Fg%2C%22%22)%7D)%7D)%3Bvar%20json%3D%7B%7D%3Bjson.results%3Dresults%3Bvar%20credit%3D0%3Bvar%20gpa%3D0%3Bvar%20included%3D%22Included%20in%20CGPA%5Cn%22%3Bvar%20notIncluded%3D%22Course%20Result%20not%20released%5Cn%22%3Bjson.results.forEach(function(element)%7Bif(getGPA(element.Grade)!%3D%3D-1)%7Bincluded%2B%3Delement.Subj%2Belement.Catalog%2B%22%20%20%20%20%20%22%2Belement.Unit%2B%22%20%20%20%20%20%22%2Belement.Grade%2B%22%20%20%20%20%20%22%2BgetGPA(element.Grade)%2B%22%5Cn%22%3Bcredit%2B%3DNumber(element.Unit)%3Bgpa%2B%3Delement.Unit*getGPA(element.Grade)%7Delse%20notIncluded%2B%3Delement.Subj%2Belement.Catalog%2B%22%5Cn%22%7D)%3Balert(%22CGPA%3A%20%22%2Bgpa%2Fcredit%2B%22%5Cn%5Cn%22%2BnotIncluded%2B%22%5Cn%22%2Bincluded%2B%22%5Cn%22%2B%22OUHK%20CGPA%20Calculator%20by%20Max%20Loh%22)%7Dcatch(e)%7Balert('Please%20press%20%22view%20all%20terms%22%20button%20in%20%22Academic%20Record%22%20page%20and%20try%20run%20this%20script%20again')%7D%3B%7D)()%3B
```
- 登入myouhk ➜ 你讀緊個Programme ➜ Academic Record ➜ 按view all terms按鈕
- 按一下書籤列中剛加入的<kbd>OUHK CGPA</kbd>書籤
- 得咗🤟

#### 方法2

- 登入myouhk ➜ 你讀緊個Programme ➜ Academic Record ➜ 按view all terms按鈕
- 按<kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>J</kbd>
- 將[OUHK-CGPA-Calculator.js](https://raw.githubusercontent.com/maxloh/OUHK-CGPA-Calculator/master/OUHK-CGPA-Calculator.js)嘅內容貼去Console到
- 按<kbd>Enter</kbd>
- 得咗🤟
