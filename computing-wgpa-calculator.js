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
  };

  const getWGPA = (courseList, higherLevel) => {
    let totalCredit = 0;
    let totalGpa = 0;
    let includedCourses = {};

    const addCourseToResult = (courseList, noCredit) => {
      const creditMax = totalCredit + noCredit;
      const addCourse = (course) => {
        includedCourses[`${course.Subj}${course.Catalog}`] = { Credit: course.Unit, Grade: course.Grade };
        countedCourses.push(course);
        totalCredit += parseInt(course.Unit);
        totalGpa += getGPA(course.Grade) * course.Unit;
      };

      for (const index in courseList) {
        const course = courseList[index];

        if (totalCredit >= creditMax) break;
        else if (creditMax - totalCredit === 10) {
          // Last array element
          if (!courseList[parseInt(index) + 1]) addCourse(course);
          else {
            const nextCourse = courseList[parseInt(index) + 1];

            // Course credit sequence: 10, ... -> add 10 credit course || Course credit sequence: 5, 5, ... -> add 5 credit course and continue the loop
            if (parseInt(course.Unit) === 10 || parseInt(nextCourse.Unit) === 5) addCourse(course);
            // Course credit sequence: 5, 10, ...
            else {
              const next5CreditCourse = courseList.slice(parseInt(index) + 1).find(course => parseInt(course.Unit) === 5);
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
    };

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
      courseList = courseList.filter(course => !countedCourses.includes(course));
      addCourseToResult(courseList, 40);
    }

    console.log(`${higherLevel ? 'Higher Level' : 'Middle and Higher Level'} \nGPA: ${totalGpa / totalCredit}\nTotal credit: ${totalCredit}\n`);
    console.table(includedCourses);
    return totalGpa / totalCredit;
  };

  const results = (() => {
    const table = [...document.querySelector('frame[name="TargetContent"]').contentDocument.querySelectorAll('table.PSLEVEL2GRID')].find((element) => {
      const text = element.innerText;
      return text.includes('Subj') && text.includes('Catalog') && text.includes('Unit') && text.includes('Grade');
    });
    const header = table.getElementsByTagName('th');

    return [...table.getElementsByTagName('tr')].filter(course => course.getElementsByTagName('td').length !== 0).map((rowElement) => {
      const course = {};
      [...rowElement.getElementsByTagName('td')].forEach(function (cellElement, columnIndex) {
        course[header[columnIndex].textContent] = cellElement.textContent.replace(/\n/g, '');
      });
      return course;
    });
  })();
  const countedCourses = [];
  const middleLevelCourses = results.filter(course => course.Subj === 'COMP' && course.Catalog.match(/S2\d\dF/) && getGPA(course.Grade));
  const higherLevelCourses = results.filter(course => (course.Subj === 'COMP' || course.Subj === 'ELEC') && course.Catalog.match(/S3\d\dF|S4\d\dF/) && getGPA(course.Grade));

  console.clear();
  console.log(`WGPA: ${(getWGPA(higherLevelCourses, true) * 2 + getWGPA(middleLevelCourses.concat(higherLevelCourses), false)) / 3}`);
  console.log('OUHK CGPA Calculator by Loh Ka Hong');
} catch (e) {
  alert('Please press "view all terms" button in "Academic Record" page and try run this script again');
}
