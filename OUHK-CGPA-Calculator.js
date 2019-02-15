try {
    var table;
    document.querySelector('frame[name="TargetContent"]').contentDocument.querySelectorAll('table.PSLEVEL2GRID').forEach(function (element) {
        let text = element.innerText;
        if (text.includes('Subj') && text.includes('Catalog') && text.includes('Unit') && text.includes('Grade')) {
            table = element;
        }
    });
    var results = [];
    var header = table.querySelectorAll('th');

    table.querySelectorAll('tr').forEach(function (rowElement, rowIndex) {
        cells = rowElement.querySelectorAll('td');
        if (cells.length === 0) {
            return;
        }
        results[rowIndex] = {};
        cells.forEach(function (cellElement, columnIndex) {
            results[rowIndex][header[columnIndex].textContent] = cellElement.textContent.replace(/\n/g, '');
        });
    });
    var json = {};
    json.results = results;

    var credit = 0;
    var gpa = 0;
    var included = 'Included in CGPA\n';
    var notIncluded = 'Course Result not released\n';
    json.results.forEach(function (element) {
        if (getGPA(element.Grade) !== -1) {
            included += element.Subj + element.Catalog + '     ' + element.Unit + '     ' + element.Grade + '     ' + getGPA(element.Grade) + '\n';
            credit += Number(element.Unit);
            gpa += element.Unit * getGPA(element.Grade);
        } else {
            notIncluded += element.Subj + element.Catalog + '\n';
        }
    });
    alert('CGPA: ' + (gpa / credit) + '\n\n' + notIncluded + '\n' + included + '\n' + 'OUHK CGPA Calculator by Max Loh');

    function getGPA(grade) {
        if (grade === 'A') return 4.0;
        if (grade === 'A-') return 3.7;
        if (grade === 'B+') return 3.3;
        if (grade === 'B') return 3.0;
        if (grade === 'B-') return 2.7;
        if (grade === 'C+') return 2.3;
        if (grade === 'C') return 2.0;
        if (grade === 'Fail') return 0.0;
        return -1;
    }
} catch (e) {
    alert('Please press "view all terms" button in "Academic Record" page and try run this script again')
}