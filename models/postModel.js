const fs = require('fs').promises;
const path = require('path');

const postsPath = path.join(__dirname, '../data', 'posts.json');

const getAllPosts = async () => {
    const postFile = await fs.readFile(postsPath, (err, data) => {
        if(err) {
            console.error("error while reading file: ", err);
            return([]);
        }
    })
    try {
        const allPosts = JSON.parse(postFile);
    } catch (error) {
        const allPosts = [];
        console.log("postfile: ", allPosts);
    }
}

const addNewPost = async (username, content) => {
    const posts = getAllPosts();

    const now = new Date()
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = String(now.getFullYear()).slice(-2);          // Get last 2 digits
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    const formattedDate = `${day}-${month}-${year}-${hours}-${minutes}`;

    const newPost = {
        'id': formattedDate,
        'timestamp': new Date().toISOString(),
        'username': username,
        'content': content
    }

    const new
}

module.exports = getAllPosts;
module.exports = addNewPost;

// console.log("the function is running: ", getAllPosts());
console.log("the function is running: ", addNewPost("ali", "this is content of the post"));