//async functionality
async function upvoteClickHandler(event) {
  //prevents refresh
  event.preventDefault();
  console.log("button clicked");

  //stores the id. processes the information before storing it in id.
  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  console.log("upvote id: ", id);
  
  const response = await fetch("/api/posts/upvote", {
    method: "PUT",
    body: JSON.stringify({
      post_id: id,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.reload();
  } else {
    alert(response.statusText);
  }
}

//Listens for the button click in the single-post.handlebar file
document
  .querySelector(".upvote-btn")
  .addEventListener("click", upvoteClickHandler);
