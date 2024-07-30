const AllloadCourses = (link) =>{
    fetch(link)
    .then(r=>r.json())
    .then(data=>{
        console.log(data)

        viewCourses(data.results)
        handlePagination(data.next,data.previous,data.count)
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
                `http://127.0.0.1:8000${course.image}`
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
    fetch('http://127.0.0.1:8000/course/category/')
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
    fetch(`http://127.0.0.1:8000/course/get_by_dep/${id}/`)
    .then(r=>r.json())
    .then(d=>{
        viewCourses(d)
    })
    .catch(err=>console.log(err))

}


const handlePagination=(next,previous,count)=>{
    console.log(next,previous,count)
    const page_pagination = document.getElementById('page_pagination')
    let pageNo = parseInt(count/9)
    if(count%5 !=0 ){
        pageNo+=1
    }

    page_pagination.innerHTML=`
        <nav aria-label="Page navigation example">
            <ul class="pagination justify-content-center">
              <li class="page-item" ${previous?'':'disable'}>
                <button class="page-link ${previous?'':'disabled'}" onclick="AllloadCourses('${previous}')" aria-label="Previous" ${previous?'':'disabled'}>
                  <span aria-hidden="true">&laquo;</span>
                </button>
              </li>
              <div class="d-flex" id="load_page_no"></div>
              <li class="page-item">
                <button class="page-link ${next?'':'disabled'}" onclick="AllloadCourses('${next}')" aria-label="Next" ${next?'':'disabled'}>
                  <span aria-hidden="true">&raquo;</span>
                </button>
              </li>
            </ul>
        </nav>
    `
    function Test(){
        const load_page_no = document.getElementById('load_page_no')
        for(let i=1;i<=pageNo;i++){
            const li = document.createElement('li')
            li.classList.add('page-item')
            li.innerHTML=`<button class="page-link" style="border-radius: 0px;" onclick="AllloadCourses('http://127.0.0.1:8000/course/public_all/all/?page_no=${i}')">${i}</button>`
            load_page_no.appendChild(li)
        }
    }
    Test()
}
// handlePagination()
CategoryView()
AllloadCourses('http://127.0.0.1:8000/course/public_all/all/')