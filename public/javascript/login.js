//executes the logic from the form as a fetch call

//!This is the front end section "The fetch". The nack end handles the other part of the fucntionality with the API call (in the routes)

//!Login form
async function loginFormHandler(event) {
  //prevents page reload
  event.preventDefault();

  //collects the user entries for login from the front end
  const email = document.querySelector("#email-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  //if passes the variable to evaluate within the fetch
  if (email && password) {
    //response const stores the promise and removes the need for catch() or then()
    const response = await fetch("/api/users/login", {
      method: "post",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    });
    // check the response status
    // response + ok replace then()s but continue the functionality
    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  }
}
//Listening for the submit button
document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);
//!Login form end

//!Signup form
async function signupFormHandler(event) {
  //prevents page reload
  event.preventDefault();

  //collects the user entries for signups
  const username = document.querySelector("#username-signup").value.trim();
  const email = document.querySelector("#email-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();

  //if passes the variable to evaluate within the fetch
  if (username && email && password) {
    //response const stores the promise and removes the need for catch() or then()
    const response = await fetch("/api/users", {
      method: "post",
      body: JSON.stringify({
        username,
        email,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    });
    // check the response status
    // response + ok replace then()s but continue the functionality
    if (response.ok) {
      console.log("success");
    } else {
      alert(response.statusText);
    }
  }
}

//Listening for the submit button
document
  .querySelector(".signup-form")
  .addEventListener("submit", signupFormHandler);
//!Signup form end
