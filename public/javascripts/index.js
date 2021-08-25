window.addEventListener("load", (event)=>{
    console.log("hello from javascript!")
})

document.addEventListener("DOMContentLoaded", async () => {
  const userCommentBox = document.querySelector("#content");
  const userCommentSubmit = document.querySelector("#comment-submit");
  userCommentSubmit.addEventListener("click", async(e) => {
    e.preventDefault();
    console.log("-_-_-_-_", window.location.href);
    // await fetch("http://localhost:8080/pawst/:id(\\d+)/pawments")
  })
  
  try {
    const res = await fetch("http://localhost:8080/pawsts/:id(\\d+)");
    const { pawments } = await res.json();
    
    const pawmentsContainer = document.querySelector("#pawments-container");
    const tweetsHtml = tweets.map(
      ({ message }) => `
      <div class="card">
        <div class="card-body">
          <p class="card-text">${message}</p>
        </div>
      </div>
    `
    );
    tweetsContainer.innerHTML = tweetsHtml.join("");
  } catch (e) {
    console.error(e);
  }
});