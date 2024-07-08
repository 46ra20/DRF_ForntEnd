

const handleAddpost=(e)=>{
    e.preventDefault()

    const title = get_value('title')
    const price = get_value('price')
    const course_duration = get_value('course_duration')
    const description = get_value('description')
    const learning_outcome = get_value('description')
    const assesment_method = get_value('assesment_method')
    const prerequisites = get_value('prerequisites')
    const select_department = get_value('select_department')

    const profile_img=document.getElementById('course_image')
    const image = profile_img.files[0]
    const user = localStorage.getItem('user_id')

    const formatData = new FormData()

    formatData.append('title',title)
    formatData.append('description',description)
    formatData.append('assessment_methods',assesment_method)
    formatData.append('learing_outcomes',learning_outcome)
    formatData.append('course_duration',course_duration)
    formatData.append('prerequisites',prerequisites)
    formatData.append('image',image)
    formatData.append('price',price)
    formatData.append('department',select_department)
    formatData.append('title',title)
    formatData.append('user',user)
    

    console.log(formatData)

    fetch(`https://online-school-lr66.onrender.com/course/authentic/${user}/`,{
        method:'POST',
        body:formatData
    })
    .then(r=>r.json())
    .then(d=>{
        console.log(d)
    })
    .catch(error=>console.log(error))
    

}




const get_value=(id)=>{
    const input = document.getElementById(id)
    return input.value
}