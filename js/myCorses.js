const loadMyCourse = () => {
    const user = localStorage.getItem('user_id')
    fetch(`http://127.0.0.1:8000/course/authentic/${user}/`)
        .then(r => r.json())
        .then(d => {
            displayMyCourses(d)
        })
        .catch(err => console.log(err))
}
let count =0
const displayMyCourses = (courses) => {
    const table_container = document.getElementById('table_container')
    courses.forEach(course => {
        const tr = document.createElement('tr')
        tr.innerHTML = `
            <th scope="row">${++count}</th>
                <td>${course?.title}</td>
                <td>${course?.price}</td>
                
                <td class="d-flex gap-1 flex-wrap">
                    <button class="btn btn-warning d-block col-sm-12 col-md-5 col-lg-5" onclick="hangleEdit(${course?.id})" data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</button>
                    <button class="btn btn-danger d-block col-sm-12 col-md-5 col-lg-5 " onclick="hangleDelete(${course?.id})">Delete</button>
                </td>
        `
        table_container.append(tr)
    });
}

const hangleDelete=(id)=>{
    console.log(id)
    const user = localStorage.getItem('user_id')

    fetch(`https://online-school-lr66.onrender.com/course/details/${user}/${id}/`,{
        method:'DELETE'
    })
    .then(r=>r.json())
    .then(d=>{
        window.location.reload()
        console.log(d)
    })
    .catch(err=>{
        console.log(err)
        window.location.reload()
    })
}

const hangleEdit=(id)=>{
    const user = localStorage.getItem('user_id')
    const modal_container = document.getElementById('modal_container')
    fetch(`http://127.0.0.1:8000/course/details/${user}/${id}/`)
    .then(r=>r.json())
    .then(d=>{
        modal_container.innerHTML=
        `
            <form
                action=""
                method="post"
                class="bg-white border rounded p-4 shadow"
                >
                <div class="mb-3">
                    <label for="title" class="form-label">Title</label>
                    <input
                    type="text"
                    class="form-control"
                    name=""
                    value=${d?.title}
                    id="title"
                    aria-describedby="helpId"
                    placeholder=""
                    />
                </div>
                
                <div class="mb-3">
                    <label for="price" class="form-label">Price</label>
                    <input
                    type="number"
                    class="form-control"
                    value=${d?.price}
                    name=""
                    id="price"
                    aria-describedby="helpId"
                    placeholder=""
                    />
                </div>
                <div class="mb-3">
                    <label for="course_duration" class="form-label">Course Duration</label>
                    <input
                    type="number"
                    class="form-control"
                    value=${d?.course_duration}
                    name=""
                    id="course_duration"
                    aria-describedby="helpId"
                    placeholder=""
                    />
                </div>
                <div class="mb-3">
                    <label for="description" class="form-label">Select your Department</label>
                    <select class="form-select" aria-label="Select your Department" id="select_department">
                    <option selected>Department</option>
                    <option value="1">Automobile</option>
                    <option value="2">Mechanical</option>
                    <option value="3">Civil</option>
                    <option value="4">CSE</option>
                    <option value="5">EEE</option>
                    </select>
                </div>

                <div class="mb-3">
                    <label for="description" class="form-label">Description</label>
                    <textarea class="form-control" id="description" rows="3" 
                    value=${d?.description}
                    ></textarea>
                </div>
                <div class="mb-3">
                    <label for="learning_outcome" class="form-label"
                    >Learning Outcome</label
                    >
                    <textarea
                    class="form-control"
                    id="learning_outcome"
                    value=${d?.learing_outcomes}
                    rows="3"
                    ></textarea>
                </div>
                <div class="mb-3">
                    <label for="assesment_method" class="form-label"
                    >Assesment Method</label
                    >
                    <textarea
                    class="form-control"
                    id="assesment_method"
                    rows="3"
                    value=${d?.assessment_methods}
                    ></textarea>
                </div>
                <div class="mb-3">
                    <label for="prerequisites" class="form-label">Prerequisites</label>
                    <textarea class="form-control" id="prerequisites" rows="3" value=${d?.prerequisites}></textarea>
                </div>
                  <button type="button" class="btn btn-warning" onclick="UpdatePost(event,${d?.id})">Save changes</button>
            </form>
        `

        setValue('title',d?.title)
        setValue('description',d?.description)
        setValue('assesment_method',d?.assessment_methods)
        setValue('learning_outcome',d?.learing_outcomes)
        setValue('prerequisites',d?.prerequisites)
        setValue('select_department',d?.department)
    })
    .catch(err=>{
        console.log(err)
        // window.location.reload()
    })
}
const setValue=(id,value)=>{
    const ele = document.getElementById(id)
    ele.value = value
    return ele
}


const UpdatePost=(e,id)=>{
    const title = get_value('title')
    const price = get_value('price')
    const course_duration = get_value('course_duration')
    const description = get_value('description')
    const learning_outcome = get_value('description')
    const assesment_method = get_value('assesment_method')
    const prerequisites = get_value('prerequisites')
    const select_department = get_value('select_department')

    // const profile_img=document.getElementById('course_image')
    // const image = profile_img.files[0]
    const user = localStorage.getItem('user_id')

    const formatData = new FormData()

    formatData.append('title',title)
    formatData.append('description',description)
    formatData.append('assessment_methods',assesment_method)
    formatData.append('learing_outcomes',learning_outcome)
    formatData.append('course_duration',course_duration)
    formatData.append('prerequisites',prerequisites)
    if(select_department){
        formatData.append('department',select_department)
    }

    formatData.append('price',price)
    formatData.append('title',title)
    formatData.append('user',user)

    const context = {
        'title':title,
        'description':description,
        'assessment_methods':assesment_method,
        'learing_outcomes':learning_outcome,
        'course_duration':course_duration,
        'prerequisites':prerequisites,
        'price':price,
        'title':title,
        'user':user
    }

    if(select_department!=0){
        context['department']=select_department
    }
    // console.log(typeof(context))
    

    fetch(`http://127.0.0.1:8000/course/details/${user}/${id}/`,{
        method:'PATCH',
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify(context)
    })
    .then(r=>r.json())
    .then(d=>{
        console.log(d)
        window.location.reload()
    })
    .catch(error=>console.log(error))
}


const get_value=(id)=>{
    const input = document.getElementById(id)
    return input.value
}

loadMyCourse()