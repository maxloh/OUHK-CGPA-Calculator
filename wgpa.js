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

  const getWGPA = (courseList, higherLevel) => {
    let totalCredit = 0;
    let totalGpa = 0;
    let resultText = `${higherLevel ? 'Higher' : 'Middle or Higher'} level\n\nCourse     Credit  GPA\n`;

    const addCourseToResult = (courseList, noCredit) => {
      const creditMax = totalCredit + noCredit;
      const addCourse = (course) => {
        resultText += `${course.Subj}${course.Catalog}  ${course.Unit}${course.Unit.length === 4 ? ' ' : ''}   ${course.Grade}\n`;
        totalCredit += parseInt(course.Unit);
        totalGpa += getGPA(course.Grade) * course.Unit;
      }
      for (const index in courseList) {
        const course = courseList[index];

        if (totalCredit >= creditMax) break;
        else if (creditMax - totalCredit === 10) {
          // Last array element
          if (!courseList[parseInt(index) + 1]) addCourse(course);
          else {
            const nextCourse = courseList[parseInt(index) + 1];
            // Course credit sequence: 10, ... -> add 10 credit course || Course credit sequence: 5, 5, ... -> add 5 credit course and continue
            if (parseInt(course.Unit) === 10 || parseInt(nextCourse.Unit) === 5) {
              addCourse(course);
            }
            // Course credit sequence: 5, 10, ...
            else {
              const next5CreditCourse = courseList.slice(index).find(course => course.Unit === 5);
              // if next course with 5 credit not exists, or (10 > (5 + 5) / 2) -> add 10 credit course
              if (!next5CreditCourse || getGPA(nextCourse.Grade) >= (getGPA(course.Grade) + getGPA(next5CreditCourse.Grade)) / 2) addCourse(nextCourse);
              // else -> add 5 credit course * 2
              else {
                addCourse(course);
                addCourse(next5CreditCourse);
              }
            }
          }
        } else addCourse(course);
      }
    }

    const sortCourse = (a, b) => getGPA(b.Grade) - getGPA(a.Grade);

    if (higherLevel) {
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

    resultText += `\nGPA: ${totalGpa / totalCredit}, Total Course credit sequence: ${totalCredit}, Total GPA: ${totalGpa}`;
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

  console.log(`WGPA: ${(getWGPA(S3XX, true) * 2 + getWGPA(S2XX, false)) / 3}`);
}
