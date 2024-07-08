const handleLogin = (e)=>{
    e.preventDefault()
    const username = get_value('username')
    const password=get_value('password')
    
    fetch("https://online-school-lr66.onrender.com/account/login/",{
        method:'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body:JSON.stringify({'username':username,'password':password})
    })
    .then(r=>r.json())
    .then(data=>{
        localStorage.setItem('token',data['token'])
        localStorage.setItem('user_id',data['user_id'])
        getUserDetails(data['user_id'])
        
        window.location.href='index.html'
    })
    .catch(error=>console.log(error))
}


const handleRegistration=(e)=>{
    e.preventDefault()

    const username=get_value('username')
    const first_name = get_value('first_name')
    const last_name = get_value('last_name')
    const email=get_value('email')
    const password=get_value('password')
    const con_password = get_value('con_password')

    const profile_img=document.getElementById('profile_img')
    const image = profile_img.files[0]
    const formatData = new FormData()

    


    const option_ = document.getElementsByName('inlineRadioOptions')
    console.log(option_)
    let select_option = 'STUDENT'
    option_.forEach(item=>{
        if(item.checked){
            select_option=item.value
        }
    })

    formatData.append('username',username)
    formatData.append('first_name',first_name)
    formatData.append('last_name',last_name)
    formatData.append('email',email)
    formatData.append('password',password)
    formatData.append('confirm_password',con_password)
    formatData.append('account_type',select_option)
    formatData.append('image',image)

    

    fetch('https://online-school-lr66.onrender.com/account/registration/',{
        method:'POST',
        // headers:{
        //     "Content-Type": "multipart/form-data",
        // },
        body:formatData
    })
    .then(r=>r.json())
    .then(d=>{
        if(d=='Done'){
            window.location.href='index.html'
        }
    })
    .catch(error=>console.log(error))
}




const get_value=(id)=>{
    const input = document.getElementById(id)
    return input.value
}