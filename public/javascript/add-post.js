async function newFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="post-title"]').value;
  const blog_post = document.querySelector('input[name="blog_post"]').value;
  //!insert add a photo functionality here
  const response = await fetch(`/api/posts`, {
    method: "POST",
    body: JSON.stringify({
      title,
      blog_post,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
}

//listens for push
document
  .querySelector(".new-post-form")
  .addEventListener("submit", newFormHandler);
