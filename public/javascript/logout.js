//!Logout button
async function logout() {
  //response const stores the promise and removes the need for catch() or then()
  const response = await fetch("/api/users/logout", {
    method: "post",
    headers: { "Content-Type": "application/json" },
  });
  // check the response status
  // response + ok replace then()s but continue the functionality
  if (response.ok) {
    document.location.replace("/");
  } else {
    alert(response.statusText);
  }
}

//Listen for the logout button
document.querySelector("#logout").addEventListener("click", logout);
