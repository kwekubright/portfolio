// add submit event listener
document.querySelector('#contact-form').addEventListener('submit', (event) => {
  // select the email field
  var email = document.querySelector('#email');
  // check is email is lowercase
  if (email.value !== email.value.toLowerCase()) {
    event.preventDefault();
    console.log('email is not lowercase');
    // insert error message in error field
    document.querySelector('#form-errors').innerHTML = 'Please enter a valid email. Lowercase only.';
    document.querySelector('#form-errors').style.display = 'block';
  }
});