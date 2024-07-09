const AllloadCourses = () =>{
    fetch('http://127.0.0.1:8000/course/public/all/all/')
    .then(r=>r.json())
    .then(data=>{
        console.log(data)
        viewCourses(data)
    })
    .catch(err=>console.log(err))
}

const depList = ['Automobile','Mechanical','Civil','CSE','EEE']

const viewCourses=(courses)=>{
    const parent = document.getElementById('load_courses')
    courses.forEach(course => {
        const div = document.createElement('div')
        div.classList.add('col-sm-11', 'col-md-4', 'col-lg-3')

        div.innerHTML=
        `<div class='m-2 cardDegin border bg-white'>
            <img src="
            ${course['image']?
                `https://online-school-lr66.onrender.com${course.image}`
                :
                './image/dummy_image_for_book.png'
            
            } "
                class="img-fluid" 
                alt=""
            >


            <div class="p-4">
                <h5>${course?.title.slice(0,24)}</h5>
                <p>${course?.description.slice(0,60)} <a href="" class="link-offset-2 link-underline link-underline-opacity-0">...<small>Read More<small></a></p>
                <p>Price: ${course?.price}$</p>
                <p>Course Duration: ${course?.course_duration}</p>
                <p>Department: ${depList[course?.department-1]}</p>
                <button class="btn btn-warning shadow">Details</button>
            </div>
        </div>
        `
        parent.append(div)
    });
}

AllloadCourses()