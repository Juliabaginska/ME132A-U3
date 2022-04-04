"use strict"

// Creates global varible for the database
let students = DATABASE.students;

// Creates funktion to create a div with a class that contains students full name and their total credits, titel for courses, and a div for all courses and returns div
function getStudent(id) {
    let div = document.createElement("div");
    let student = DATABASE.students[id];
    div.classList = "container";
    div.innerHTML = `
    <header id="studentName">${student.firstName} ${student.lastName} (Total Credits: ${sumCredits(student)})</header>
   
    <div>
        <div id="course">
            <h4 id="courseTitle">Courses: </h4>
            <div id="courses">
            ${getCourses(student)}
            </div>
        </div>
    </div>`

    return div;
}

// Creates function to filter students total credits 
function sumCredits(student) {
    let credits = [];
    for (let course of student.courses) {
        credits.push(course.passedCredits);
    }

    let creditSum = 0;
    for (let i = 0; i < credits.length; i++) {
        creditSum += credits[i];
    }

    return creditSum;
}

function getStudents(students) {
    let studentsElement = document.getElementById("results");
    for (let student of students) {
        let studentElement = getStudent(student.studentID);
        studentsElement.appendChild(studentElement);
    }  
}

function getCourses(student){
    let courseInfo = DATABASE.courses;
    let courses = [];
    for (let i = 0; i < student.courses.length; i++) {
        let id = student.courses[i].courseId;
        courses.push(courseInfo[id]);
    }

    let courseBox = [];
    for (let i = 0; i < courses.length; i++) {
    let div = document.createElement("div");
    if (student.courses[i].passedCredits == courseInfo[courses[i].courseId].totalCredits) {
        let info = div.innerHTML = `
        <div class="done">
            <h3>${courses[i].title}</h3>
            <p>${student.courses[i].started.semester} ${student.courses[i].started.year} (${student.courses[i].passedCredits} of ${courseInfo[courses[i].courseId].totalCredits} credits)</p>
        </div>`
        courseBox.push(info);
    }
    else {
        let info = div.innerHTML = `
        <div class="notdone">
            <h3>${courses[i].title}</h3>
            <p>${student.courses[i].started.semester} ${student.courses[i].started.year} (${student.courses[i].passedCredits} of ${courseInfo[courses[i].courseId].totalCredits} credits)</p>
        </div>`

        courseBox.push(info);
       }
    } 
    return courseBox.toString().split(",").join("");
}

function searchLastName() {
    return input.value.toLowerCase();
}

let input = document.getElementById("studentSearch");
input.addEventListener("keyup", studentLastName);

function studentLastName() {
    let studentsArray = []
    for (let i = 0; i < students.length; i++) {
        document.getElementById("results").innerHTML = ""
        if ("" == searchLastName()) {
            document.getElementById("results").innerHTML = ""
        }
        else if (students[i].lastName.toLowerCase().includes(searchLastName())) {
            studentsArray.push(students[i]);
        }
    }
    let sortedStudents = studentsArray.sort(
        function(a, b){
            if (a.lastName > b.lastName){
                return 1;
            }
            if (a.lastName < b.lastName){
                return -1;
            }
            return 0;
        }
    );
    getStudents(sortedStudents)
}

function submit () {
    let studentsArray = []
    for (let i = 0; i < students.length; i++) {
        if (students[i].lastName.toLowerCase().includes(searchLastName())) {
            studentsArray.push(students[i]);
        }
    }
    getStudents(studentsArray)
}

input.addEventListener("submit", submit);
getStudents(DATABASE.students);
