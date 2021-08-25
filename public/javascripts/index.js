window.addEventListener("load", (event)=>{
    console.log("hello from javascript!")
})

document.addEventListener("DOMContentLoaded", async () => {
  const userCommentForm = document.querySelector("#new-pawment-form");
  const userCommentSubmit = document.querySelector("#comment-submit");
  userCommentForm.addEventListener("submit", async(e) => {
    e.preventDefault();
    const formData = new FormData(userCommentForm);
    for(let pair of formData.entries()){
      console.log(pair);
    }
    // await fetch("http://localhost:8080/pawst/:id(\\d+)/pawments")
  })
});
