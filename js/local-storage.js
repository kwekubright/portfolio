// trigger storeFormFields function on name change
document.querySelector('#name').addEventListener('change', storeFormFields(e));
// trigger storeFormFields function on email change
document.querySelector('#email').addEventListener('change', storeFormFields(e));
//trigger storeFormFields function on message change
document.querySelector('#message').addEventListener('change', storeFormFields(e));

//store form fields as single object in local storage
function storeFormFields(e) {
  const field = e.tartget.dataset.field;
  // get the form fields
  const fieldValue = form.querySelector('#' + field).value;

  // unserialize form object from local storage
  const formFields = JSON.parse(localStorage.getItem('formObject'));
  // update name field in formfields object
  formFields[field] = fieldValue;

  // serialize form object to local storage
  localStorage.setItem('formObject', JSON.stringify(formFields));
}


// check if formObject is in local storage
function checkFormObject() {
  if (!localStorage.getItem('formObject')) {
    // if not, create an empty object
    const formObject = {
      name: '',
      email: '',
      message: '',
    };
    // serialize the object to local storage
    localStorage.setItem('formObject', JSON.stringify(formObject));
  } else {
    // if yes, unserialize the object from local storage
    const formObject = JSON.parse(localStorage.getItem('formObject'));
    // set the form fields to the values from the object
    form.querySelector('#name').value = formObject.name;
    form.querySelector('#email').value = formObject.email;
    form.querySelector('#message').value = formObject.message;
  }
}