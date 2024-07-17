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
            console.log(data)
            if(data?.error){
                message_shoe(data?.error,'bg-danger')
            }
            getAuthDetails(data['user_id'])
            // window.location.reload()
            localStorage.setItem('token',data['token'])
            localStorage.setItem('user_id',data['user_id'])
            setTimeout(5000)
            window.location.href='index.html'

        })
        .catch(error=>message_shoe(error,'bg-danger'))
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
            
            const message='Please varify your email...'
            message_shoe(message,'bg-white')
            document.getElementById('singup_form').reset();
        }
        else if(d=='Sorry'){
            const message ='Something wrong please try agin..'
            message_shoe(message,'bg-danger')

        }
        else{
            message_shoe(d.error,'bg-danger')
        }
    })
    .catch(error=>{
        message_shoe(error.message,'bg-danger')
    })
}


const getAuthDetails= (id)=>{
    fetch(`https://online-school-lr66.onrender.com/account/user_details/${id}/`)
    .then(r=>r.json())
    .then(d=>{
      // console.log(d)
      localStorage.setItem('user',JSON.stringify(d))
      getUserDetails(id)
    })
    .catch(error=>console.log(error))
}



const get_value=(id)=>{
    const input = document.getElementById(id)
    return input.value
}

const message_shoe=(message,type)=>{
    const message_container = document.getElementById('message_container')
    message_container.classList.add("text-center","border","p-2","rounded",type,"d-block")
    message_container.innerText=message
    console.log('from inner function')
}


let type = true;
const handlePasswordShow = () =>{
    const pass = document.getElementById('password');
    const eye = document.getElementById('eye_show');
    type=!type;
    
    if(type){
        pass.type='password';
        eye.src='image/eye-fill.svg';
    }
    else{
        pass.type='text';
        eye.src='image/eye-slash-fill.svg';
    }
}