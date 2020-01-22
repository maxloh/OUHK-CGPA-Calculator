try {
  const getGPA = (grade) => {
    if (grade === 'A') return 4.0;
    if (grade === 'A-') return 3.7;
    if (grade === 'B+') return 3.3;
    if (grade === 'B') return 3.0;
    if (grade === 'B-') return 2.7;
    if (grade === 'C+') return 2.3;
    if (grade === 'C') return 2.0;
    if (grade === 'Fail') return 0.0;
    return null;
  }

  const table = [...document.querySelector('frame[name="TargetContent"]').contentDocument.querySelectorAll('table.PSLEVEL2GRID')].find((element) => {
    const text = element.innerText;
    return text.includes('Subj') && text.includes('Catalog') && text.includes('Unit') && text.includes('Grade');
  });
  const header = table.getElementsByTagName('th');
  const results = [...table.getElementsByTagName('tr')].filter(course => course.getElementsByTagName('td').length !== 0).map((rowElement) => {
    const course = {};
    [...rowElement.getElementsByTagName('td')].forEach(function (cellElement, columnIndex) {
      course[header[columnIndex].textContent] = cellElement.textContent.replace(/\n/g, '');
    });
    return course;
  });

  let totalCredit = 0;
  let totalGpa = 0;
  let includedCourse = [];
  let notIncludedCourse = [];

  for (const course of results) {
    if (getGPA(course.Grade)) {
      includedCourse[`${course.Subj}${course.Catalog}`] = { Credit: course.Unit, Grade: course.Grade };
      totalCredit += Number(course.Unit);
      totalGpa += course.Unit * getGPA(course.Grade);
    } else {
      notIncludedCourse[`${course.Subj}${course.Catalog}`] = { Credit: course.Unit, Grade: course.Grade };
    }
  }

  console.clear();
  console.log(`CGPA: ${totalGpa / totalCredit}`);
  console.log('Included in CGPA:');
  console.table(includedCourse);
  console.log('Course Result not released:');
  console.table(notIncludedCourse);
  console.log('OUHK CGPA Calculator by Loh Ka Hong');
} catch (e) {
  alert('Please press "view all terms" button in "Academic Record" page and try run this script again');
}