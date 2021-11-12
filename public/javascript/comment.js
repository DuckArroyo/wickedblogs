//async functionality
async function commentFormHandler(event) {
  //prevents refresh
  event.preventDefault();

  //stores the comment text.
  const comment_text = document
    .querySelector('textarea[name="comment-body"]')
    .value.trim();

  const post_id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  console.log(comment_text, post_id);

  //passes comment_text and waits for response. 
  if (comment_text) {
    const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({
        post_id,
        comment_text
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }

}

//Listens for the button click in the single-post.handlebar file
document
  .querySelector(".comment-form")
  .addEventListener("submit", commentFormHandler);
