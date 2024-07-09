const detailsView = ()=>{
    const param = new URLSearchParams(window.location.search).get('id')
    
    fetch(`https://online-school-lr66.onrender.com/course/public/${param}/`)
    .then(r=>r.json())
    .then(data=>{
        viewCourse(data[0])
        document.title=`${data[0]?.title?data[0].title:'Details View'}`
    })
    .catch(err=>console.log(err))
}


const details_container = document.getElementById('details_container')
const depList = ['CSE','EEE','Civil','Mechanical','Automobile']

const viewCourse = (course)=>{
    const div = document.createElement('div')
    div.innerHTML=`
    <div class="d-md-flex align-items-center">
        <div class="col-sm-11 col-lg-6">
            <img src="https://online-school-lr66.onrender.com${course?.image}" class="img-fluid">
        </div>
        <div class="p-2">
            <h3 class="fw-bold">${course?.title}</h3>
            <p>Price: ${course?.price} $</p>
            <p>Course Duration: ${course?.course_duration} ${course?.course_duration>1?'Hours':'Hour'}</p>
            <p>Date: ${course?.date}</p>
            <p>Department: ${depList[course?.department-1]}</p>
        </div>
    </div>
    <div class="p-4">
        <p class="fw-bold">Description</p>
        <p class="ms-3 p-2 shadow-sm bg-light border rounded">${course?.description}</p>
        <p class="fw-bold">Assesment Methods</p>
        <p class="ms-3 p-2 shadow-sm bg-light border rounded">${course?.assessment_methods}</p>
        <p class="fw-bold">Learing Outcomes</p>
        <p class="ms-3 p-2 shadow-sm bg-light border rounded">${course?.learing_outcomes}</p>
        <p class="fw-bold">Prerequisites</p>
        <p class="ms-3 p-2 shadow-sm bg-light border rounded">${course?.prerequisites}</p>
    </div>
`
details_container.append(div)
}
detailsView()

// {
//     "id": 1,
//     "title": "Introduction to Python Programming update",
//     "description": "This course provides an introduction to Python programming for beginners. Students will learn the fundamentals of Python, including syntax, data types, control structures, functions, and modules. The course combines theoretical lessons wit",
//     "assessment_methods": "Quizzes: After each module to assess understanding.\r\nCoding Exercises: Practical exercises to apply learned concepts.\r\nProjects: Two projects (mid-course and final) to demonstrate skills.\r\nParticipation: Participation in online discussions and peer reviews",
//     "learing_outcomes": "By the end of the course, students will be able to:\r\n\r\nUnderstand and write basic Python code.\r\nUse Python data types and variables.\r\nImplement control structures such as loops and conditionals.\r\nCreate and use functions.\r\nHandle files and modules in Python.\r\nDevelop simple Python applications.",
//     "course_duration": "8-Hours",
//     "prerequisites": "No prior programming experience required. Basic computer literacy is recommended.",
//     "image": "/course/image/man-1_uMtJbzO.jpg",
//     "date": "2024-07-06T12:42:49.213548Z",
//     "price": "10.00",
//     "department": 1,
//     "user": 2
// }