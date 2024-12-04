document.addEventListener("DOMContentLoaded", () => {
    const feedContainer = document.getElementById("feed");

    fetch("data/posts.json")
        .then(response => response.json())
        .then(posts => {
            posts.forEach(post => {
                const postElement = createPost(post);
                feedContainer.appendChild(postElement);
            });
        });

    function createPost(post) {
        const postDiv = document.createElement("div");
        postDiv.classList.add("post");

        const postText = document.createElement("p");
        postText.textContent = post.text;

        const postImage = document.createElement("img");
        if (post.image) {
            postImage.src = post.image;
            postImage.alt = "Post image";
            postImage.style.width = "100%";
            postImage.style.borderRadius = "8px";
        }

        const reactionsDiv = document.createElement("div");
        reactionsDiv.innerHTML = `
            <button class="reaction" data-type="like">👍 ${post.reactions.like}</button>
            <button class="reaction" data-type="dislike">👎 ${post.reactions.dislike}</button>
            <button class="reaction" data-type="love">❤️ ${post.reactions.love}</button>
        `;

        const commentsDiv = document.createElement("div");
        commentsDiv.innerHTML = `<strong>Comments:</strong>`;
        post.comments.forEach(comment => {
            const commentText = document.createElement("p");
            commentText.textContent = `${comment.user}: ${comment.comment}`;
            commentsDiv.appendChild(commentText);
        });

        postDiv.appendChild(postText);
        if (post.image) postDiv.appendChild(postImage);
        postDiv.appendChild(reactionsDiv);
        postDiv.appendChild(commentsDiv);

        return postDiv;
    }
});
