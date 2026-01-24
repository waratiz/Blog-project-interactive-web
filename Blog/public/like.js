document.querySelectorAll(".like-btn").forEach(button => {
  button.addEventListener("click", async () => {
    const postId = button.dataset.id;
    const likesSpan = document.getElementById(`likes-${postId}`);
    const statusEl = document.getElementById(`status-${postId}`);

    button.disabled = true;
    statusEl.textContent = "Liking...";

    try {
      const res = await fetch(`/api/posts/${postId}/like`, {
        method: "POST"
      });

      if (!res.ok) {
        throw new Error("Failed to like");
      }

      const data = await res.json();

      likesSpan.textContent = data.likes;

      statusEl.textContent = "";
    } catch (err) {
      statusEl.textContent = "Error liking post";
    } finally {
      button.disabled = false;
    }
  });
});
