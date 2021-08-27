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
        method: "post",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
      });


      if (!res.ok) {
        throw res;
      };

      const {
        id,
        content,
        userName,
        updatedAt } = await res.json();

      const pawmentsList = document.getElementById('pawments-list');

      const pawmentDiv = document.createElement('div');
      pawmentDiv.setAttribute("class", "pawment");

      const pawmenterInfoDiv = document.createElement('div');
      pawmenterInfoDiv.setAttribute('class', 'pawmenter-info');

      const commenterNameDiv = document.createElement('div');
      commenterNameDiv.setAttribute('class', 'commenter-name');
      commenterNameDiv.textContent = userName;
      const pawmentDateDiv = document.createElement('div');
      pawmentDateDiv.setAttribute('class', 'pawment-date');
      pawmentDateDiv.textContent = updatedAt.toDateString();
      const hiddenIdInput = document.createElement('input');
      hiddenIdInput.setAttribute('value', id);
      hiddenIdInput.setAttribute('id', id);
      pawmenterInfoDiv.append(commenterNameDiv, pawmentDateDiv, hiddenIdInput);
      pawmentDiv.append(pawmenterInfoDiv);

      const pawmentContentDiv = document.createElement('div');
      pawmentContentDiv.setAttribute('class', 'pawment-content');
      pawmentContentDiv.textContent = content;
      pawmentDiv.append(pawmentContentDiv);

      const pawmentButtonsDiv = document.createElement('div');
      pawmentButtonsDiv.setAttribute('class', 'pawment-buttons');
      const pawmentEditButton = document.createElement('button');
      pawmentEditButton.setAttribute('value', id);
      pawmentEditButton.textContent = 'Edit';
      const pawmentDeleteButton = document.createElement('button');
      pawmentDeleteButton.setAttribute('value', id);
      pawmentDeleteButton.textContent = 'Delete';
      pawmentButtonsDiv.append(pawmentEditButton, pawmentDeleteButton);
      pawmentDiv.append(pawmentButtonsDiv);

      const hr = document.createElement('hr');
      hr.setAttribute('class', `hr-${id}`)
      pawmentsList.prepend(hr);
      pawmentsList.prepend(pawmentDiv);



    } catch (err) {
      console.log(err);
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
    if (ele.childNodes.length > 3) { //not an hr
      // ele is a pawment div
      // ele.childNodes - div.pawmenter-info, div.pawment-content, div.pawment-button
      // lastchild - div.pawment-buttons
      // value - hidden input that holds pawmentId rendered from get /pawsts/:id
      const pawmentId = ele.childNodes[0].lastChild.value;
      const apiPath = `${window.location.origin}/api/pawments/${pawmentId}/delete`;
      const currDeleteButton = document.querySelector(`.delete-button-${pawmentId}`);
      currDeleteButton.addEventListener('click', async (e) => {
        e.preventDefault();

        const res = await fetch(apiPath, {
          method: 'POST',
          body: JSON.stringify({
            _key: '_value'
          }),
          headers: {
            'content-type': 'application/json'
          }
        });
        // dynamically remove comment
        const pawmentDivToDelete = document.querySelector(`.pawment-${pawmentId}`);
        const hrToDelete = document.querySelector(`.hr-${pawmentId}`);
        pawmentDivToDelete.remove();
        hrToDelete.remove();
      })
    }
  }
});
