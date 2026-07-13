const fs = require('fs').promises;
const path = require('path');

const postsPath = path.join(__dirname, '../data', 'posts.json');

const getAllPosts = async () => {
    try {
        const postFile = await fs.readFile(postsPath, 'utf8');
        return JSON.parse(postFile);
    } catch (err) {
        return [];
    }
};

const addNewPost = async (username, content) => {
    const posts = await getAllPosts();

    const now = new Date();

    const formattedDate =
        `${String(now.getDate()).padStart(2, '0')}-` +
        `${String(now.getMonth() + 1).padStart(2, '0')}-` +
        `${String(now.getFullYear()).slice(-2)}-` +
        `${String(now.getHours()).padStart(2, '0')}-` +
        `${String(now.getMinutes()).padStart(2, '0')}`;

    const newPost = {
        id: formattedDate,
        timestamp: now.toISOString(),
        username,
        content
    };

    posts.push(newPost);

    await fs.writeFile(postsPath, JSON.stringify(posts, null, 2));

    return newPost;
};

module.exports = getAllPosts;
module.exports = addNewPost;

console.log("the function is running: ", getAllPosts());
// console.log("the function addNewPost is running: ", addNewPost("ali", "this is content of the post"));