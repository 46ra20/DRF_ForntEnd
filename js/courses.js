const loadCourses = () =>{
    fetch('https://online-school-lr66.onrender.com/course/public_all/home/')
    .then(r=>r.json())
    .then(data=>{
        viewCourses(data)
    })
    .catch(err=>console.log(err))
}


const depList = ['CSE','EEE','Civil','Mechanical','Automobile']



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
                <a class="btn btn-warning shadow" href="detailsView.html?id=${course?.id}">Details</a>
            </div>
        </div>
        `
        parent.append(div)
    });
}

const handleShowReview= ()=>{
    const comment_block = document.getElementById('comment_block')
    fetch(`https://online-school-lr66.onrender.com/course/review/all/`)
    .then(r=>r.json())
    .then(d=>{
        if(d.data.length>0){
            console.log(d.data)
            showReviews(d.data)
        }
    })
    .catch(err=>console.log(err))
}


const showReviews = (reviews)=>{
    const review_container = document.getElementById('review_container')
    if(reviews.length >0){
        reviews.forEach(element => {
            const div = document.createElement('div')
            div.classList.add('col-lg-1','col-md-2','col-sm-3','mb-2')
            div.innerHTML=`
            <div class="border rounded shadow p-2 text-center hover_effect">
                <img src="https://online-school-lr66.onrender.com/${element.image}/" class="rounded-circle" style="height:32px;width:32px">
                <small class="m-0 my-1 d-block">(${showStar(element.rating)})</small>
                <p class="m-0 p-0">"${element.review}"</p>
            </div>
            `
            review_container.append(div)
        });
    }
}


const showStar=(star)=>{
    let s = ''
    for(let i=0;i<star;i++) s+=`<i class="fa-solid fa-star" style="color: #FFD43B;"></i>`
    return s
}

handleShowReview()
loadCourses()