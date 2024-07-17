let c = 0;
const navBar =()=>{
    const token = localStorage.getItem('token')
    const user_id = localStorage.getItem('user_id')
    
    let user={}
    if(user_id && token && c==0){
      c++;
      getUserDetails(user_id)
    }
    if(user_id && token){
      user  = JSON.parse(localStorage.getItem('user'))
    }
    
    const navContainer = document.getElementById('navContainer')
    navContainer.innerHTML=''

    navContainer.innerHTML=`
    <nav class="navbar navbar-expand-lg bg-dark ">
      <div class="container-fluid col-11 mx-auto text-white" style="color: white;">
        <a class="navbar-brand text-white" href="#">JSRN</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active text-white" aria-current="index.html?reload=0" href="index.html">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link active text-white" aria-current="allcourses.html" href="allcourses.html">All Courses</a>
            </li>
            ${
              user?.account_type=='TEACHER'?
              ` <li class="nav-item">
                  <a class="nav-link active text-white" aria-current="addCourse.html" href="addCourse.html">Add Course</a>
                </li>
              `:''
            }
          </ul>
          <div class="d-flex  align-items-center">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                ${
                  user&&token&&user_id?
                  ` 
                    <li class="nav-item dropdown">
                    <img src="https://online-school-lr66.onrender.com/${user.image}" class="rounded-circle shadow dropdown-toggle"style="height: 30px; width: 30px;" alt="" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <ul class="dropdown-menu dropdown-menu-end">
                      <li><a class="dropdown-item" href="profile.html">Profile</a></li>
                      ${
                        user?.account_type=='TEACHER'?
                        `
                        <li><a class="dropdown-item" href="mycorse.html">My Courses</a></li>
                        `
                        :
                        `
                        <li><a class="dropdown-item" href="myLearing.html">My Learing</a></li>
                        
                        `
                      }
                      <li><a class="dropdown-item btn"  onclick="handleLogout()">Logout</a></li>
                    </ul>
                  </li>
                  `
                  :
                  `
                    <li class="nav-item me-2">
                      <a class="nav-link active text-white btn btn-outline-warning fw-bolder" aria-current="singup.html" href="singup.html">SingUp</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link active text-white btn btn-outline-warning fw-bolder" aria-current="index.html" href="login.html">Login</a>
                    </li>
                  `

                }
            </ul>
          </div>
        </div>
      </div>
    </nav>
    
    `
}

const footerLoader=()=>{
  const footer_continer = document.getElementById('footer_continer')
  footer_continer.innerHTML=`
  <div class="justify-content-around align-items-center flex-sm-column flex-lg-row d-lg-flex">
      <div class="d-flex align-items-center flex-column">
        <img src="./image/JSRN.png" class="rounded-circle mb-3" style="height:150px;width:150px"/>
        <p class="fw-bold text-white">
          All right reserved by JSRN School
        </p>
        <p><small class="text-white">Copyright © 2024 JSRN School</small></p>
      </div>
      <div class="">
        <p class="fw-bold text-white text-center border-bottom">Our Service</p>
        <ul class="text-white nav flex-column align-items-center">
          <li><a class="text-white mb-2 link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover" href="">Home Teaching</a> </li>
          <li><a class="text-white mb-2 link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover" href="">Private Tutor</a> </li>
          <li><a class="text-white mb-2 link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover" href="">Online Tutor</a> </li>
          <li><a class="text-white mb-2 link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover" href="">Online Service</a> </li>
          <li><a class="text-white mb-2 link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover" href="">Online Class</a> </li>
        </ul>
      </div>
      <div class="">
        <p class="fw-bold text-white text-center border-bottom">Useful Links</p>
        <ul class="text-white nav flex-column align-items-center">
          <li><a class="text-white mb-2 link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover " href="">Refund policy</a> </li>
          <li><a class="text-white mb-2 link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover" href="">Terms and Conditions</a> </li>
          <li><a class="text-white mb-2 link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover" href="">Privacy Policy</a> </li>
          <li><a class="text-white mb-2 link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover" href="">App Privacy Policy</a> </li>
          <li><a class="text-white mb-2 link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover" href="">About us</a> </li>
          <li><a class="text-white mb-2 link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover" href="">Success Story</a> </li>
        </ul>
      </div>
    </div>
  `
}



const getUserDetails=(id)=>{
    fetch(`https://online-school-lr66.onrender.com/account/user_details/${id}/`)
    .then(r=>r.json())
    .then(d=>{
      // console.log(d)
      localStorage.setItem('user',JSON.stringify(d))
      navBar()

    })
    .catch(error=>console.log(error))
}


const handleLogout = ()=>{
  fetch('https://online-school-lr66.onrender.com/account/logout/',{
      method:'POST'
  })
  .then(r=>r.json())
  .then(d=>{
      if(d){
          window.location.href='index.html'
          localStorage.clear()
      }
      console.log(d)
    }
  )
  .catch(err=>console.log(err))

}


footerLoader()
navBar()