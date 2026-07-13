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
    const posts = getAllPosts();

    const now = new Date()
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0'); 
    const year = String(now.getFullYear()).slice(-2);          
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    const formattedDate = `${day}-${month}-${year}-${hours}-${minutes}`;

    const newPost = {
        'id': formattedDate,
        'timestamp': new Date().toISOString(),
        'username': username,
        'content': content
    }

    await getAllPosts().push(newPost);
    console.log("addNewPost content: ", getAllPosts());
}

module.exports = getAllPosts;
module.exports = addNewPost;

console.log("the function is running: ", getAllPosts());
// console.log("the function addNewPost is running: ", addNewPost("ali", "this is content of the post"));