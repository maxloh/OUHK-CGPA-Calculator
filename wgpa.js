{
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
  const getWGPA = (courseList, level) => {
    let totalCredit = 0;
    let totalGpa = 0;
    let resultText = `${level} level\n\nCourse     Credit  GPA\n`;

    const sortCourse = (a, b) => getGPA(b.Grade) - getGPA(a.Grade)

    const addCourseToResult = (courseList, noCredit) => {
      const creditMax = totalCredit + noCredit;
      const addCouse = (course) => {
        resultText += `${course.Subj}${course.Catalog}  ${course.Unit}${course.Unit.length === 4 ? ' ' : ''}   ${course.Grade}\n`;
        totalCredit += parseInt(course.Unit);
        totalGpa += getGPA(course.Grade) * course.Unit;
      }

      for (const index in courseList) {
        const course = courseList[index];
        if (totalCredit >= creditMax) break;
        else if (totalCredit - creditMax === 10) {
          if (!courseList[index + 1]) {
            addCouse(course);
            break;
          }

          const nextCourse = courseList[index + 1];

          // 10 -> add 10
          if (parseInt(course.Unit) === 10) {
            addCouse(course);
          }
          // 5 5 -> add 5, 5
          else if (parseInt(nextCourse.Unit) === 5) {
            addCouse(course);
            addCouse(nextCourse);
          }
          // 5, 10, ?
          else {
            const next2Course = courseList[index + 2] || null;
            // 5, 10, end -> add 10
            if (!next2Course) {
              addCouse(nextCourse);
            }
            // 5, 10, 5
            else if (parseInt(nextCourse.Unit) === 10 && parseInt(next2Course.Unit) === 5) {
              // if (10 > (5 + 5) / 2) -> add 10 
              if (getGPA(nextCourse) >= (getGPA(course) + getGPA(next2Course)) / 2) {
                addCouse(nextCourse);
              } 
              // else -> add 5, 5
              else {
                addCouse(course);
                addCouse(next2Course);
              }
            }
            // 5 10 10
            else {

            }
          }
          break;
        } else addCouse(course);
      }
    }

    if (level === 'Higher') {
      const compulsory = courseList.filter(course => ['S311F', '356F', 'S358F'].some(element => element === course.Catalog));
      const remaining = courseList.filter(course => !compulsory.includes(course));
      compulsory.sort(sortCourse);
      remaining.sort(sortCourse);
      addCourseToResult(compulsory, 20);
      addCourseToResult(remaining, 20);
    } else {
      courseList.sort(sortCourse);
      addCourseToResult(courseList, 40);
    }

    resultText += `\nGPA: ${totalGpa / totalCredit}, Total Credit: ${totalCredit}, Total GPA: ${totalGpa}`;
    console.log(resultText);
    return totalGpa / totalCredit;
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

  const S2XX = results.filter(course => course.Subj === 'COMP' && course.Catalog.match(/S2../) && getGPA(course.Grade));
  const S3XX = results.filter(course => (course.Subj === 'COMP' || course.Subj === 'ELEC') && course.Catalog.match(/S3../) && getGPA(course.Grade));

  console.log(`WGPA: ${(getWGPA(S3XX, 'Higher') * 2 + getWGPA(S2XX, 'Middle or Higher')) / 3}`);
}
