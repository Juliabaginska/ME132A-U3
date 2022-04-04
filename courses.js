"use strict"

let courses = DATABASE.courses;

function getCourse(id) {
    let div = document.createElement("div");
    let courses = DATABASE.courses[id];
    div.classList = "container";
    div.innerHTML = 
    
    `<header>
        <u>
        ${courses.title} (total Credits: ${courses.totalCredits})
        </u>
    </header>
   
    <div>
    <h3> Course Responsible</h3>
        <div id="teachersResp"> 
            ${findResponsible(courses)}
        </div>
        <br>
    <h3>Teachers</h3>
        <div id="teachers">
            ${findTeachers(courses)}
        </div>
        <br>
    <h3>Students</h3>
        <div id="students">
            ${findStudents(courses)}
        </div>
        <br>
        <div id="border"></div>
    </div>`

    return div;
}

function getCourses (courses) {
    let coursesElement = document.getElementById("courses");
    console.log(courses)
    for (let course of courses) {
        let courseElement = getCourse(course.courseId);
        coursesElement.appendChild(courseElement);
    }
}

function findResponsible(courses) {
   let responsibleBox = []
   for (let i = 0; i < DATABASE.teachers.length; i++) {
       let div = document.createElement("div")
       if (DATABASE.teachers[i].teacherId == courses.courseResponsible) {
           let text = div.innerHTML = `
           <div id="responsibleteacher"><h4>${DATABASE.teachers[i].firstName} ${DATABASE.teachers[i].lastName} (${DATABASE.teachers[i].post})</h2>`
            responsibleBox.push(text);
       }
   }
   return responsibleBox.toString().split(",").join("");
}

function findTeachers(courses) {
    let teacherBox = [];
    for (let i = 0; i < DATABASE.teachers.length; i++) {
        let div = document.createElement("div");
        for ( let x = 0; x < courses.teachers.length; x++)
        if (DATABASE.teachers[i].teacherId == courses.teachers[x]) {
            let text = div.innerHTML = `
            <div id="findteachers"><h4>${DATABASE.teachers[i].firstName} ${DATABASE.teachers[i].lastName} (${DATABASE.teachers[i].post})  </h4></div>`
            teacherBox.push(text);
        } 
        else if (DATABASE.teachers[i].teacherId == courses.teachers[x]) {
            let text = div.innerHTML = `
            <div id="findteachers"><h4>${DATABASE.teachers[i].firstName} ${DATABASE.teachers[i].lastName} (${DATABASE.teachers[i].post})  </h4></div>`
            teacherBox.push(text);
        }
    }
    return teacherBox.toString().split(",").join("");
} 

function findStudents(courses) {
    let studentBox = [];
    for (let i = 0; i < DATABASE.students.length; i++) {
        let div = document.createElement("div");
        for ( let x = 0; x <DATABASE.students[i].courses.length; x++)
        if (DATABASE.students[i].courses[x].courseId == courses.courseId && DATABASE.students[i].courses[x].passedCredits == courses.totalCredits) {
            let text = div.innerHTML = `
            <div class="done"><h4>${DATABASE.students[i].firstName} ${DATABASE.students[i].lastName} (${DATABASE.students[i].courses[x].passedCredits} credits)  </h4>
            <p>${DATABASE.students[i].courses[x].started.semester} ${DATABASE.students[i].courses[x].started.year}</div>`
            studentBox.push(text);
        } else if (DATABASE.students[i].courses[x].courseId == courses.courseId){
            let text = div.innerHTML = `
            <div class="notdone"><h4>${DATABASE.students[i].firstName} ${DATABASE.students[i].lastName} (${DATABASE.students[i].courses[x].passedCredits} credits)  </h4>
            <p>${DATABASE.students[i].courses[x].started.semester} ${DATABASE.students[i].courses[x].started.year}</div>`
            studentBox.push(text);
        }
    }
    return studentBox.toString().split(",").join("");
} 

function courseSearch() {
    return input.value.toLowerCase();
}

let input = document.getElementById("coursesSearch");
input.addEventListener("keyup", searchCourse);

function searchCourse() {
    let coursesArray = []
    for (let i = 0; i < courses.length; i++) {
        document.getElementById("courses").innerHTML = ""
        if ("" == courseSearch()) {
            document.getElementById("courses").innerHTML = ""
        }
        else if (courses[i].title.toLowerCase().includes(courseSearch())) {
            coursesArray.push(courses[i]);
        }
    }

    let sortedCourses = coursesArray.sort(
        function(a, b){
            if (a.title > b.title){
                return 1;
            }
            if (a.title < b.title){
                return -1;
            }
            return 0;
        }
    );
    getCourses(sortedCourses)
}


function submit () {
    let coursesArray = []
    for (let i = 0; i < courses.length; i++) {
        if (courses[i].toLowerCase().includes(courseSearch())) {
            coursesArray.push(courses[i]);
        }
    }
    getCourses(coursesArray)
}

// input.addEventListener("submit", searchCourse());
getCourses(DATABASE.courses);

