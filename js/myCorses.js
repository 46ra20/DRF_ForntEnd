const loadMyCourse = () => {
    const user = localStorage.getItem('user_id')
    fetch(`https://online-school-lr66.onrender.com/course/authentic/${user}/`)
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

loadMyCourse()