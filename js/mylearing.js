const loadMyEnroledCourse = ()=>{
    const user = localStorage.getItem('user_id')

    fetch(`https://online-school-lr66.onrender.com/course/enrol/${user}/`)
    .then(r=>r.json())
    .then(d=>displayMyCourses(d))
    .catch(err=>console.log(err))
}

const displayMyCourses = (courses) => {
    const table_container = document.getElementById('table_container')
    const n = courses.data.length;
    console.log(courses)
    for(let i=0;i<n;i++){
        const tr = document.createElement('tr')
        const date = new Date(courses?.data[i]?.date)
        tr.innerHTML = `
            <th scope="row">${i+1}</th>
                <td><a class="fw-bold" style="text-decoration:none" href="detailsView.html?id=${courses.data[i]?.enrol_course}">${courses?.course_details[i]?.title}</a></td>
                <td>${courses?.course_details[i]?.price} $</td>
                <td>${date.getDate()}-${date.getMonth()}-${date.getFullYear()}(${date.getHours()}:${date.getMinutes()})</td>
                
                <td>
                    <button class="btn btn-danger d-block w-100" onclick="hangleDelete(${courses?.data[i]?.id})">Unenrol</button>
                </td>
        `
        table_container.append(tr)
    }
}

const hangleDelete =(id)=>{
    fetch(`https://online-school-lr66.onrender.com/course/enrol_unenroled/${id}/`,{
        method:'DELETE'
    })
    .then(r=>r.json())
    .then(d=>{
        console.log(d)
        if(d['success']){
            window.location.reload()
        }
    })
    .catch(err=>console.log(err))
}

loadMyEnroledCourse()