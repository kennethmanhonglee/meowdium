# Meowdium

Meowdium is an online platform disrupting the feline digital space by providing cats the opportunity to write, publish, share, and discuss knowlege of all types. 

Users are able register for their own accounts, allowing them to publish original written content in the form of pawsts, engage the community through pawments on pawsts, and show their support through catnips. Even without logging into an account, visitors are able to view all pawsts, pawments, and catnips, though they cannot interact.

## Link to live Meowdium site on Heroku

http://meowdium.herokuapp.com/

## Link to wiki docs

https://github.com/kennethmanhonglee/meowdium/wiki

## Discussion of technologies used

## Two stand-out features

* Dynamic comments
* Dynamic likes

## Challenges

* Creating the dynamic delete and edit buttons
* * Specifically pulling things from the backend



## Code snippets
```
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
```

```
        div(id='pawments-list')
          each pawment in pawments
            div(class=`pawment pawment-${pawment.id}`)
              div(class="pawmenter-info")
                div(class="commenter-name")= pawment.User.userName
                div(class="pawment-date")= pawment.updatedAt.toDateString()
                input(type="hidden", value=pawment.id, id=pawment.id)
              div(class="pawment-content")= pawment.content
              if locals.authenticated && locals.user.id === pawment.userId
                div(class="pawment-buttons")
                  button(class=`edit-button-${pawment.id}`) Edit
                  button(class=`delete-button-${pawment.id}`) Delete
                  button(class=`edit-cancel-button-${pawment.id}` hidden) Cancel
                  button(class=`edit-submit-button-${pawment.id}` hidden) Submit
```