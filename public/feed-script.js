const fetching = async () => {
  try {
    const resp = await fetch("/api/posts");
    const data = await resp.json();
    renderPosts(data.posts);
  } catch (error) {
    console.error(error);
  }
};

function renderPosts(posts) {
  const container = document.getElementById("container");
  if (posts.length === 0) {
    container.innerHTML = "<p class='text-center'>No Post Found! add new post</p>";
    return;
  }

  container.innerHTML = posts
    .map(
      (post) =>
        `
        <article
          id="post-${post._id}"
          class="group bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
          <header class="flex justify-between items-center mb-4 border-b border-gray-100 pb-3">
            <h2 class="text-lg font-semibold text-gray-900 capitalize">
              ${post.username}
            </h2>

            <button onClick="window.handleDelete('${post._id}')" title="Delete Post" class="opacity-0 scale-90 pointer-events-none cursor-pointer group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto transition-all duration-200 p-2 rounded-full bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5 fill-current"
                viewBox="0 0 48 48"
              >
                <path d="M20.5 4A1.5 1.5 0 0019.07 6H14.64C12.8 6 11.08 6.92 10.06 8.45L7.7 12H7.5a1.5 1.5 0 000 3h.76L11.13 38.09A5.56 5.56 0 0016.59 43H31.4a5.56 5.56 0 005.47-4.91L39.73 15h.77a1.5 1.5 0 000-3h-.2l-2.37-3.55A5.57 5.57 0 0033.36 6h-4.43A1.5 1.5 0 0027.5 4h-7zM14.64 9h18.72c.84 0 1.61.42 2.08 1.11L36.7 12H11.3l1.26-1.89A2.54 2.54 0 0114.64 9zM11.67 15h24.66l-2.44 22.77A2.55 2.55 0 0131.4 40H16.59a2.55 2.55 0 01-2.48-2.23L11.67 15z"/>
              </svg>
            </button>

          </header>

          <p class="text-gray-700 leading-6">
            ${post.content}
          </p>

          <footer class="mt-4 pt-3 border-t border-gray-100 text-sm text-gray-400">
            Post ID: ${post._id}
          </footer>
        </article>
      `
    )
    .join("");
}

// The delete handler now refetches and re-renders
window.handleDelete = async (id) => {
  const response = await fetch(`/api/post/${id}`, {
    method: "DELETE",
  });
  if (response.ok) {
    // Refetch the updated list
    await fetching(); // this calls renderPosts with fresh data
  }
};

// Initial load
fetching();