const { placeholder } = require("sequelize/types/lib/operators");

document.addEventListener('DOMContentLoaded', () => {
  document
    .getElementById('new-pawment-form')
    .addEventListener('submit', (event) => {
      event.preventDefault();
      const myForm = event.target;
      const formData = new FormData(myForm);
      let obj = {};

      for (let key of formData.keys()) {
        obj[key] = formData.get(key);
        console.log(obj)
      }
      //send the request with the formdata
      const req = new Request(`http://localhost:8080/pawsts/${placeholder}`, {
        headers: { 'Content-Type': 'application/json', "Accept": "application/json" },
        body: JSON.stringify(obj),
        method: 'POST',
      });

      fetch(req)
        .then((res) => res.json())
        .catch(console.warn);
    })
});
