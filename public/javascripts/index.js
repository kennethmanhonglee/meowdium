document.addEventListener("DOMContentLoaded", async () => {
  const userCommentForm = document.querySelector("#new-pawment-form");
  const userCommentSubmit = document.querySelector("#comment-submit");
  userCommentForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(userCommentForm);
    for (let pair of formData.entries()) {
      console.log(pair);
    }
    // await fetch("http://localhost:8080/pawst/:id(\\d+)/pawments")
  });

  const likeButton = document.querySelector('#like-btn');
  likeButton.addEventListener('click', async (e) => {
    const apiPath = `${window.location.origin}/api${window.location.pathname}/catnips`
    const res = await fetch(apiPath, {
      header: 'application/json',
      body: {
        like: 'leelooo'
      },
      method: 'POST'
    })

    const { deleted, catnipsCount } = await res.json();

    if (deleted) {
      // show unlike animation
      // decrement like display
      console.log('DELETED!!!!')
    } else {
      // show like animation
      // increment like display
      console.log('LIKED!!!!!!')
    }
  });

});
