
const postInput = document.getElementById("postInput");
const postsContainer = document.getElementById("postsContainer");
const charCount = document.getElementById("charCount");

// Load saved posts
let posts = JSON.parse(localStorage.getItem("connectXPosts")) || [];

// Sample posts for first-time users
if (posts.length === 0) {
    posts = [
        {
            id: 1,
            username: "Alex",
            content: "Hello everyone! Welcome to ConnectX 🚀",
            likes: 5,
            liked: false,
            owner: false,
            time: new Date().toISOString()
        },
        {
            id: 2,
            username: "Sarah",
            content: "Learning JavaScript is really exciting! 💻",
            likes: 12,
            liked: false,
            owner: false,
            time: new Date().toISOString()
        }
    ];
    savePosts();
}

// Character counter
postInput.addEventListener("input", () => {
    charCount.textContent =
        `${postInput.value.length} / 280`;
});

// Save posts
function savePosts() {
    localStorage.setItem(
        "connectXPosts",
        JSON.stringify(posts)
    );
}

// Create post
function createPost() {
    const content = postInput.value.trim();

    if (content === "") {
        alert("Please write something!");
        return;
    }

    const newPost = {
        id: Date.now(),
        username: "Mohan",
        content: content,
        likes: 0,
        liked: false,
        owner: true,
        time: new Date().toISOString()
    };

    posts.unshift(newPost);

    savePosts();
    displayPosts();

    postInput.value = "";
    charCount.textContent = "0 / 280";
}

// Display posts
function displayPosts() {
    postsContainer.innerHTML = "";

    posts.forEach(post => {
        const div = document.createElement("div");
        div.className = "post";

        const header = document.createElement("div");
        header.className = "post-header";

        const avatar = document.createElement("div");
        avatar.className = "avatar";
        avatar.textContent = post.username.charAt(0).toUpperCase();

        const userInfo = document.createElement("div");
        const name = document.createElement("strong");
        name.textContent = post.username;

        const time = document.createElement("small");
        time.textContent = " · " + new Date(post.time).toLocaleString();

        userInfo.append(name, time);
        header.append(avatar, userInfo);

        const content = document.createElement("p");
        content.className = "post-content";
        content.textContent = post.content;

        const actions = document.createElement("div");
        actions.className = "post-actions";

        const likeButton = document.createElement("button");
        likeButton.textContent =
            `${post.liked ? "❤️" : "🤍"} ${post.likes}`;
        likeButton.addEventListener("click", () => {
            toggleLike(post.id);
        });

        actions.append(likeButton);

        if (post.owner) {
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "🗑 Delete";
            deleteButton.className = "delete";

            deleteButton.addEventListener("click", () => {
                deletePost(post.id);
            });

            actions.append(deleteButton);
        }

        div.append(header, content, actions);
        postsContainer.appendChild(div);
    });
}

// Like post
function toggleLike(id) {
    posts = posts.map(post => {
        if (post.id === id) {
            post.liked = !post.liked;
            post.likes += post.liked ? 1 : -1;
        }
        return post;
    });

    savePosts();
    displayPosts();
}

// Delete post
function deletePost(id) {
    if (!confirm("Are you sure you want to delete this post?")) {
        return;
    }

    posts = posts.filter(post => post.id !== id);

    savePosts();
    displayPosts();
}

// Initial display
displayPosts();
