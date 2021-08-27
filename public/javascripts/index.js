document.addEventListener("DOMContentLoaded", async () => {
  const userCommentForm = document.querySelector("#new-pawment-form");
  const commentTextArea = document.querySelector('#content')
  userCommentForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(userCommentForm);
    const content = formData.get('content');
    const _csrf = formData.get('_csrf'); // TODO: test var naming
    const body = { content, _csrf };
    commentTextArea.value = '';

    try {
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
      // TODO - change from innerHTML to textContent or something
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



    } catch (err) {
      alert(err)
    }
  });

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


  // deleting pawments
  const pawmentsList = document.querySelector('#pawments-list');
  for (let ele of pawmentsList.childNodes) {
    if (ele.childNodes.length > 2) { //not an hr
      // ele is a pawment div
      // ele.childNodes - div.pawmenter-info, div.pawment-content, div.pawment-button
      // lastchild - div.pawment-buttons
      // value - hidden input that holds pawmentId rendered from get /pawsts/:id
      const pawmentId = ele.childNodes[0].lastChild.value;
      const apiPath = `${window.location.origin}/api/pawments/${pawmentId}/delete`;
      const currDeleteButton = document.querySelector(`form[action='/pawments/${pawmentId}/delete'] button`)
      currDeleteButton.addEventListener('click', async (e) => {
        e.preventDefault();
        // TODO - finish writing fetch request to delete route
        const res = await fetch(apiPath, {
          method: 'POST',
          body: JSON.stringify({
            _key: '_value'
          }),
          headers: {
            'content-type': 'application/json'
          }
        })
      })
    }
  }
});
