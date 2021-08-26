document.addEventListener("DOMContentLoaded", async () => {
  const userCommentForm = document.querySelector("#new-pawment-form");

  userCommentForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(userCommentForm);
    const content = formData.get('content');
    const _csrf = formData.get('_csrf'); // TODO: test var naming
    const body = { content, _csrf };
    try{
    const res = await fetch(`${window.location.href}/pawments`, { // TODO: change to API once functioning
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });


    if (!res.ok) {
      throw 'Comment can\'t be empty.'
    };

    const {
      id,
      content,
      userName,
      createdAt } = await res.json();

    const pawmentsList = document.getElementById('pawments-list');
    const pawmentDiv = document.createElement('div');
    pawmentDiv.setAttribute("class", "pawment");
    pawmentDiv.innerHTML = `
      <div class="pawmenter-info">
        <div class="commenter-name">${userName}</div>
        <div class="pawment-date">${createdAt}</div>
      </div>
      <div class="pawment-content">${content}</div>
      <div class="pawment-buttons">
        <form action="/pawments/${id}/edit" method="post">
          <button type="submit">Edit</button>
        </form>
        <form action="/pawments/${id}/delete" method="post">
          <button type="submit">Delete</button>
        </form>
      </div>
    `

    pawmentsList.prepend(pawmentDiv);


  } catch(err) {
    alert(err)
  }
  });

  // const likeButton = document.querySelector('#like-btn');
  // likeButton.addEventListener('click', async (e) => {
  //   const apiPath = `${window.location.origin}/api${window.location.pathname}/catnips`
  //   const res = await fetch(apiPath, {
  //     headers: { "Content-Type": "application/json" },
  //     body: {
  //       like: 'leelooo'
  //     },
  //     method: 'POST'
  //   })

  //   const { deleted, catnipsCount } = await res.json();

  //   if (deleted) {
  //     // show unlike animation
  //     // decrement like display
  //     console.log('DELETED!!!!')
  //   } else {
  //     // show like animation
  //     // increment like display
  //     console.log('LIKED!!!!!!')
  //   }
  // });

});
