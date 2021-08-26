document.addEventListener("DOMContentLoaded", async () => {
  // const userCommentForm = document.querySelector("#new-pawment-form");

  // userCommentForm.addEventListener("submit", async (e) => {
  //   e.preventDefault();
  //   const formData = new FormData(userCommentForm);
  //   const content = formData.get('content');
  //   const _csrf = formData.get('_csrf'); // TODO: test var naming
  //   const body = { content, _csrf };
  //   try{
  //   const res = await fetch(`${window.location.href}/pawments`, { // TODO: change to API once functioning
  //     method: "POST",
  //     body: JSON.stringify(body),
  //     headers: { "Content-Type": "application/json" },
  //   });


  //   if (!res.ok) {
  //     throw 'Comment can\'t be empty.'
  //   };

  //   const {
  //     content,
  //     userName,
  //     updatedAt } = await res.json();


  //   const pawmentsList = document.getElementById('pawments-list');



  // } catch(err) {
  //   alert(err)
  // }
  // });

  const likeButton = document.querySelector('.like-btn');
  const likeDisplay = document.querySelector('.like-display');
  likeButton.addEventListener('click', async (e) => {
    const apiPath = `${window.location.origin}/api${window.location.pathname}/catnips`
    const res = await fetch(apiPath, {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        like: 'leelooo'
      }),
      method: 'POST'
    })

    const { deleted, catnipsCount } = await res.json();

    if (deleted) {
      // show unlike animation
      likeDisplay.textContent = catnipsCount;
      likeButton.classList.remove('clicked');
    } else {
      // show like animation
      likeDisplay.textContent = catnipsCount;
      likeButton.classList.add('clicked');
    }
  });

});
