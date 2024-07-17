const loadProfile=()=>{
    const profile_container = document.getElementById('profile_container')
    const user = JSON.parse(localStorage.getItem('user'))
    profile_container.innerHTML=''
    profile_container.innerHTML=`
        <img src="https://online-school-lr66.onrender.com/${user.image}" class="rounded-circle shadow-lg" style="height:320px;width:320px"/>
        <div class="mt-3">
            <p class="display-6 fw-bolder">Name: ${user.first_name?user.first_name:'not set'} ${user.last_name?user.last_name:''}</p>
            <p class="fw-bold">User Name: ${user.user_name}</p>
            <p class="fw-bold">Email: ${user.email?user.email:'not set'}</p>
        </div>
    `
}

loadProfile()