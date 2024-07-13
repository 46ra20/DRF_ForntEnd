const AllloadCourses = () =>{
    fetch('https://online-school-lr66.onrender.com/course/public/all/all/')
    .then(r=>r.json())
    .then(data=>{
        console.log(data)
        viewCourses(data)
    })
    .catch(err=>console.log(err))
}

const depList = ['CSE','EEE','Civil','Mechanical','Automobile']

const viewCourses=(courses)=>{
    const parent = document.getElementById('load_courses')
    parent.innerHTML=''
    if(courses.length==0){
        parent.innerHTML=`
            <div class="d-flex justify-content-center text-center mx-auto">
                <img src="image/nodata.png" />
            </div>
        `
    }
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
                <a class="btn btn-warning shadow" href="detailsView.html?id=${course?.id}">Details</a>
            </div>
        </div>
        `
        parent.append(div)
    });
}

const CategoryView = ()=>{
    fetch('https://online-school-lr66.onrender.com/course/category/')
    .then(r=>r.json())
    .then(d=>{
        console.log(d)
        const category_container = document.getElementById('category_container')
        d.forEach(element => {
            const li = document.createElement('li')
            li.classList.add('dropdown-item')
            li.style=('cursor:pointer;')
            li.onclick=()=>{handleFilter(element.id)}
            li.innerText=`${element.category}`
            category_container.append(li)
        });
    })
    .catch(err=>console.log(err))
}
const handleFilter=(id)=>{
    fetch(`https://online-school-lr66.onrender.com/course/get_by_dep/${id}/`)
    .then(r=>r.json())
    .then(d=>{
        viewCourses(d)
    })
    .catch(err=>console.log(err))

}

CategoryView()
AllloadCourses()