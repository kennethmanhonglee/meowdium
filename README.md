# Meowdium

Meowdium is an online platform disrupting the feline digital space by providing cats the opportunity to write, publish, share, and discuss knowlege of all types. 

Users are able register for their own accounts, allowing them to publish original written content in the form of pawsts, engage the community through pawments on pawsts, and show their support through catnips. Even without logging into an account, visitors are able to view all pawsts, pawments, and catnips, though they cannot interact.

## Link to live Meowdium site on Heroku

http://meowdium.herokuapp.com/

## Link to wiki docs

https://github.com/kennethmanhonglee/meowdium/wiki

## Discussion of technologies used

Our team utilized a wide variety of technologies in this project. In our back end, 
we relied on Sequelize and PostgreSQL to build and manage our databases. We used Express 
to build and implement interconnected routes. We also used middleware like csurf and 
express validators to secure our routes and provide a smooth user experience. When 
designing the front end, we relied on Pug's powerful and simplified HTML syntax along with 
CSS to create a functional and attractive app. Our skills in DOM manipulation also stand out 
in this project as they allowed us to render features of our site dynamically, encouraging seamless 
navigation and interaction. Finally, we were able to host our site on Heroku so that we might 
share our hardwork with present and future colleagues alike.

## Two stand-out features

* Dynamic comments 
  * Logged-in users are able to post, edit, and delete their own comments. 
    Using DOM manipulation, the comments update dynamically without refreshing 
    the page.
* Dynamic likes
  * All users are able to like posts. Individual users may only like a post 
    once. They may also unlike posts. Using DOM manipulation, the like count 
    updates dynamically.

## Challenges

* Creating the dynamic delete and edit buttons
  * The process of implementing all of the dynamic features was challenging, though 
    it was particularly difficult to create buttons that dynamically edited and delted content, requiring 
    complex interactions between the front and back ends. Accessing data from the backend 
    to utilize when manipulating the DOM required code that sometimes felt overly long 
    or roundabout. We found the it necessary, and very helpful, to dynamically 
    generate HTML elements when implementing these features. This process, though tedious,
    gave us finite control of what was rendering from our event listeners.
* Styling a site as a team
  * Styling our site was a challenge, not necessarily from a technical standpoint, 
    but from the organizational complexities that arise when a group has to produce a 
    unified full-stack product in a short period time. We were able to overcome this 
    challenge through regular communication and by relying on each other to provide honest 
    feedback. Drafting a wireframe early on in the planning process was also 
    invaluable when it came to developing a harmonious set of pages.


## Code snippets
```JS
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

```JS
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
```JS
const catPuns = [
    `Stay PAWsitive!`,
    //Pun array shortened for brevity.
    `Wait a meow-ment.`
];

const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
}
document.addEventListener('DOMContentLoaded', (e) => {
    const header = document.querySelector('h2');
    header.textContent = catPuns[getRandomInt(catPuns.length)];

})
```