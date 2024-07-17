const detailsView = () => {
  const param = new URLSearchParams(window.location.search).get("id");
  const user = localStorage.getItem("user_id");

  fetch(`https://online-school-lr66.onrender.com/course/public/${param}/${user ? user : 0}/`)
    .then((r) => r.json())
    .then((data) => {
      viewCourse(data);
      console.log(data);
      document.title = `${
        data["data"]?.title ? data["data"].title : "Details View"
      }`;
    })
    .catch((err) => console.log(err));
};

const depList = ["CSE", "EEE", "Civil", "Mechanical", "Automobile"];

const viewCourse = (data) => {
  const details_container = document.getElementById("details_container");
  details_container.innerHTML = "";
  const course = data["data"];
  const div = document.createElement("div");
  const user_id = localStorage.getItem("user_id");
  let user_data = localStorage.getItem("user");
  let user = null;
  if (user_data) {
    user = JSON.parse(user_data);
  }
  const date = new Date(course?.date);
  div.innerHTML = `
    <div class="d-md-flex align-items-center">
        <div class="col-sm-11 col-lg-6">
            <img src="https://online-school-lr66.onrender.com${
              course?.image
            }" class="w-100 h-100">
        </div>
        <div class="p-3">
            <h3 class="fw-bold">${course?.title}</h3>
            <p class="m-0 lh-base">Price: ${course?.price} $</p>
            <p class="m-0 lh-base">Course Duration: ${
              course?.course_duration
            } ${course?.course_duration > 1 ? "Hours" : "Hour"}</p>
            <p class="m-0 lh-base">Upload Date: ${date.getDate()}-${date.getMonth()}-${date.getFullYear()}(${date.getHours()}:${date.getMinutes()})</p>
            <p class="m-0 lh-base">Department: ${
              depList[course?.department - 1]
            }</p>
            ${
              user_id && user.account_type == "STUDENT"
                ? `<button class="btn btn-warning w-50 mt-3" onclick="handleEnrol(${
                    course?.id
                  })" ${data["is_Enroled"] ? "disabled=True" : ""}>${
                    data["is_Enroled"] ? "Enroled" : "Enrol"
                  }</button>`
                : ""
            }
        </div>
    </div>
    <div class="p-4">
        <p class="fw-bold">Description</p>
        <p class="ms-3 p-2 shadow-sm bg-light border rounded">${
          course?.description
        }</p>
        <p class="fw-bold">Assesment Methods</p>
        <p class="ms-3 p-2 shadow-sm bg-light border rounded">${
          course?.assessment_methods
        }</p>
        <p class="fw-bold">Learing Outcomes</p>
        <p class="ms-3 p-2 shadow-sm bg-light border rounded">${
          course?.learing_outcomes
        }</p>
        <p class="fw-bold">Prerequisites</p>
        <p class="ms-3 p-2 shadow-sm bg-light border rounded">${
          course?.prerequisites
        }</p>
    </div>
`;
  details_container.append(div);
  handleReview(data["is_Enroled"], course.id);
  handleShowReview(course.id);
  handleSemilarCourses(course.id,course.department)
};

const handleEnrol = (id) => {
  const user = localStorage.getItem("user_id");
  const context = {
    enrol_course: id,
    enrol_by: user,
  };

  fetch(`https://online-school-lr66.onrender.com/course/enrol_create/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(context),
  })
    .then((r) => r.json())
    .then((d) => {
      console.log(d);
      detailsView();
    })
    .catch((err) => console.log(err));
};

const handleReview = (is_Enroled, id) => {
  const review_secssion = document.getElementById("review_secssion");
  if (is_Enroled) {
    review_secssion.innerHTML = `
        <form methd="post" onsubmit="handleSubmit(event,${id})" class="mx-auto p-3 border rounded shadow" id="comment_form">
            <select class="form-select mb-2" aria-label="Default select example" id="rating" required>
                <option selected value=''>Rating this course</option>
                <option value="1">★</option>
                <option value="2">★★</option>
                <option value="3">★★★</option>
                <option value="4">★★★★</option>
            </select>
            <div class="form-floating mb-2">
                <textarea class="form-control" id="comment_box" placeholder="Leave a comment here" id="floatingTextarea" required></textarea>
                <label for="floatingTextarea">Comment</label>
            </div>
            <input
                type="submit"
                class="btn btn-warning"
                value="Comment"
            />
        </form>
        `;
  }
};

const handleSubmit = (event, id) => {
  event.preventDefault();
  const rating = document.getElementById("rating").value;
  const comment = document.getElementById("comment_box").value;
  const reviewer = localStorage.getItem("user_id");
  context = {
    rating: rating,
    review: comment,
    course: id,
    reviewer: reviewer,
  };

  fetch(`https://online-school-lr66.onrender.com/course/review_create/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(context),
  })
    .then((r) => r.json())
    .then((d) => {
      document.getElementById("comment_form").reset();
      handleShowReview(id);
    })
    .catch((err) => console.log(err));
};

const handleShowReview = (id) => {
  const comment_block = document.getElementById("comment_block");
  fetch(`https://online-school-lr66.onrender.com/course/review/${id}/`)
    .then((r) => r.json())
    .then((d) => {
      if (d.data.length > 0) {
        console.log(d.data);
        showComments(d.data);
      }
    })
    .catch((err) => console.log(err));
};

const showComments = (comments) => {
  const comment_block = document.getElementById("comment_block");
  comment_block.innerHTML = "";
  comment_block.classList.add(
    // "my-5",
    "mx-auto",
    "p-3",
    "border",
    "rounded",
    "shadow"
  );
  comment_block.innerHTML = `<p class="fw-bold text-white mb-3">Students review about this course</p>`;
  comments.forEach((element) => {
    const div = document.createElement("div");
    div.classList.add("d-flex", "align-items-top");
    const date = new Date(element.date);
    console.log(date);
    div.innerHTML = `
            <img src="https://online-school-lr66.onrender.com/${
              element.image
            }" style="height:32px; width:32px" class="rounded-circle"/>
            <div class="mb-3">
            <div class="ms-1 border d-inline-block bg-light rounded px-3 py-2 shadow">
                <p class="p-0 m-0"><span class="fw-bold"  style="color:blue">${
                  element.name
                }  </span>(${showStar(element.rating)})</p>
                <p class="p-0 m-0">${element.review}</p>
            </div>
            <small class="d-block ms-3">${date.getDate()}-${date.getMonth()}-${date.getUTCFullYear()}</small>
            </div>
        `;
    comment_block.append(div);
  });
};
const showStar = (star) => {
  let s = "";
  for (let i = 0; i < star; i++)
    s += `<i class="fa-solid fa-star" style="color: #FFD43B;"></i>`;
  return s;
};

const handleSemilarCourses = (course_id,id) =>{
  fetch(`https://online-school-lr66.onrender.com/course/get_by_dep/${id}/`)
    .then(r=>r.json())
    .then(d=>{
        // viewCourses(d)
        console.log(d)
        const semilar_course = document.getElementById('semilar_course')

        semilar_course.innerHTML=''
        d.forEach(element => {
          if(course_id != element.id){
            const div = document.createElement('div')
            div.classList.add('d-flex','border','rounded','mb-2','align-items-center','bg-light','shadow','custom_effect')
            div.addEventListener('click',()=>{handleDetails(element.id)})
            div.style="cursor:pointer"
            div.innerHTML=`
              <img src="
                ${element['image']?
                    `https://online-school-lr66.onrender.com${element.image}`
                    :
                    './image/dummy_image_for_book.png'
                
                } "
                class="col-4 me-2 rounded-start-2" 
                style="height:120px"
                alt=""
              >
              <div>
                <p class="fw-bold m-0">${element.title}</p>
                <p class="m-0">${element.price} $</p>
                <p class="m-0">${element.course_duration} ${element.course_duration>1?'Hours':'Hour'}</p>
              </div>

            `
            semilar_course.appendChild(div)
          }
        });
    })
    .catch(err=>console.log(err))
}

const handleDetails=(id)=>{
  console.log(id)

  window.location.href=`detailsView.html?id=${id}`
}

detailsView();
