document.addEventListener("DOMContentLoaded", async () => {
  const userCommentForm = document.querySelector("#new-pawment-form");
  const commentTextArea = document.querySelector('#content')
  if (userCommentForm) {

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

        let {
          id,
          userId,
          content,
          userName,
          updatedAt } = await res.json();

        const pawmentsList = document.getElementById('pawments-list');

        const pawmentDiv = document.createElement('div');
        pawmentDiv.setAttribute("class", `pawment pawment-${id} blinder`);

        const pawmenterInfoDiv = document.createElement('div');
        pawmenterInfoDiv.setAttribute('class', 'pawmenter-info');

        const commenterNameDiv = document.createElement('div');
        commenterNameDiv.setAttribute('class', 'commenter-name');
        const commenterNameLink = document.createElement('a')
        commenterNameLink.setAttribute("href", `/users/${userId}`);
        commenterNameLink.setAttribute('class', 'commenter-name-link')
        commenterNameLink.textContent = userName;
        commenterNameDiv.appendChild(commenterNameLink)
        const pawmentDateDiv = document.createElement('div');
        pawmentDateDiv.setAttribute('class', 'pawment-date');
        pawmentDateDiv.textContent = updatedAt;
        const hiddenIdInput = document.createElement('input');
        hiddenIdInput.setAttribute('value', id);
        hiddenIdInput.setAttribute('id', id);
        hiddenIdInput.setAttribute('hidden', true);
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
        pawmentEditButton.className += `edit-button-${id}`;
        pawmentEditButton.className += ' btn';
        pawmentEditButton.className += ' btn-edit';
        pawmentEditButton.textContent = 'Edit';
        const pawmentDeleteButton = document.createElement('button');
        pawmentDeleteButton.setAttribute('value', id);
        pawmentDeleteButton.className += `delete-button-${id}`;
        pawmentDeleteButton.className += ' btn';
        pawmentDeleteButton.className += ' btn-delete';
        pawmentDeleteButton.textContent = 'Delete';

        const editSubmitButton = document.createElement('button');
        editSubmitButton.className += `edit-submit-button-${id}`;
        editSubmitButton.className += ' btn';
        editSubmitButton.className += ' btn-edit-submit';
        editSubmitButton.textContent = 'Submit'
        const editCancelButton = document.createElement('button');
        editCancelButton.className += `edit-cancel-button-${id}`;
        editCancelButton.className += ' btn';
        editCancelButton.className += ' btn-edit-cancel';
        editCancelButton.textContent = 'Cancel'
        editSubmitButton.setAttribute('hidden', 'true');
        editCancelButton.setAttribute('hidden', 'true');


        pawmentEditButton.addEventListener('click', async (e) => {

          pawmentContentDiv.setAttribute('contentEditable', 'true');
          pawmentEditButton.setAttribute('hidden', 'true');
          pawmentDeleteButton.setAttribute('hidden', 'true');
          editSubmitButton.removeAttribute('hidden');
          editCancelButton.removeAttribute('hidden');

          editSubmitButton.addEventListener('click', async (e) => {
            const apiPath = `/api/pawments/${id}/edit`;
            const newContent = pawmentContentDiv.textContent
            if (!newContent) return

            const res = await fetch(apiPath, {
              method: 'POST',
              body: JSON.stringify({ content: newContent }),
              headers: { 'content-type': 'application/json' }
            })
            // const { newContent } = await res.json();

            pawmentContentDiv.textContent = newContent;
            content = newContent;
            pawmentContentDiv.setAttribute('contentEditable', 'false');
            pawmentDeleteButton.removeAttribute('hidden');
            pawmentEditButton.removeAttribute('hidden');
            editSubmitButton.setAttribute('hidden', 'true');
            editCancelButton.setAttribute('hidden', 'true');
          })

          editCancelButton.addEventListener('click', (e) => {
            pawmentContentDiv.textContent = content;
            pawmentContentDiv.setAttribute('contentEditable', 'false');
            pawmentDeleteButton.removeAttribute('hidden');
            pawmentEditButton.removeAttribute('hidden');
            editSubmitButton.setAttribute('hidden', 'true');
            editCancelButton.setAttribute('hidden', 'true');
          })

        })

        pawmentDeleteButton.addEventListener('click', async (e) => {
          const apiPath = `/api/pawments/${id}/delete`;

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
          const pawmentDivToDelete = document.querySelector(`.pawment-${id}`);
          pawmentDivToDelete.remove();
        });
        pawmentButtonsDiv.append(pawmentEditButton, pawmentDeleteButton);
        pawmentButtonsDiv.append(editCancelButton, editSubmitButton);
        pawmentDiv.append(pawmentButtonsDiv);

        pawmentsList.prepend(pawmentDiv);
        requestAnimationFrame(() => {
          pawmentDiv.classList.remove("blinder")
        })


      } catch (err) {
        //TODO - change way of handling error
        console.log(err);
      }
    });
  }

  if (userCommentForm) {
    const likeButton = document.querySelector('.likes-stats');
    const likeDisplay = document.querySelector('.like-display');

    likeButton.addEventListener('click', async (e) => {
      const apiPath = `/api${window.location.pathname}/catnips`
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
  }


  // deleting pawments
  const pawmentsList = document.querySelector('#pawments-list');
  for (let ele of pawmentsList.childNodes) {
    // ele is a pawment div
    if (ele.childNodes.length === 3) { //not an hr
      // ele.childNodes - div.pawmenter-info, div.pawment-content, div.pawment-button
      // lastchild - div.pawment-buttons
      // value - hidden input that holds pawmentId rendered from get /pawsts/:id
      const pawmentId = ele.childNodes[0].lastChild.id;
      const pawmentDeleteButton = document.querySelector(`.delete-button-${pawmentId}`);
      pawmentDeleteButton.addEventListener('click', async (e) => {
        const apiPath = `/api/pawments/${pawmentId}/delete`;
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
        pawmentDivToDelete.remove();
      })

      const pawmentEditButton = document.querySelector(`.edit-button-${pawmentId}`)
      pawmentEditButton.addEventListener('click', async (e) => {
        const pawmentContentDiv = ele.childNodes[1];
        let content = pawmentContentDiv.textContent
        const editSubmitButton = document.querySelector(`.edit-submit-button-${pawmentId}`);
        const editCancelButton = document.querySelector(`.edit-cancel-button-${pawmentId}`);
        editSubmitButton.removeAttribute('hidden')
        editCancelButton.removeAttribute('hidden')
        pawmentEditButton.setAttribute('hidden', 'true')
        pawmentDeleteButton.setAttribute('hidden', 'true')
        pawmentContentDiv.setAttribute('contentEditable', 'true');
        editSubmitButton.addEventListener('click', async (e) => {
          const apiPath = `/api/pawments/${pawmentId}/edit`;
          const newContent = pawmentContentDiv.textContent
          if (!newContent) return

          const res = await fetch(apiPath, {
            method: 'POST',
            body: JSON.stringify({ content: newContent }),
            headers: { 'content-type': 'application/json' }
          })

          // const { newContent } = await res.json();

          pawmentContentDiv.textContent = newContent;
          content = newContent;
          pawmentContentDiv.setAttribute('contentEditable', 'false');
          pawmentDeleteButton.removeAttribute('hidden');
          pawmentEditButton.removeAttribute('hidden');
          editSubmitButton.setAttribute('hidden', 'true');
          editCancelButton.setAttribute('hidden', 'true');
        })

        editCancelButton.addEventListener('click', (e) => {
          pawmentContentDiv.textContent = content;
          pawmentContentDiv.setAttribute('contentEditable', 'false');
          pawmentDeleteButton.removeAttribute('hidden');
          pawmentEditButton.removeAttribute('hidden');
          editSubmitButton.setAttribute('hidden', 'true');
          editCancelButton.setAttribute('hidden', 'true');
        })

      })
    }
  }

  // TODO: EDITING COMMENTS RENDERED BY THE PUG FILE. TO BE EDITED.
});
