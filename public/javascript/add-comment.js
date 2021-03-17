async function newFormHandler(event) {
  event.preventDefault();

  const comment = document.querySelector('input[name="comment"]').value;
  const user_id = session.user_id;
  const date = today.getDate();

  const response = await fetch(`/api/posts`, {
    method: 'POST',
    body: JSON.stringify({
      user_id,
      comment,
      date
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
}

document.querySelector('.new-comment-form').addEventListener('submit', newFormHandler);
