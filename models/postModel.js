const fs = require("fs").promises;
const path = require("path");

const filePath = path.join("data", "posts.json");

const getAllPosts = async () => {
  try {
    const fileData = await fs.readFile(filePath, "utf8");
    return JSON.parse(fileData);
  } catch (error) {
    console.log("error found in reading file: ", error);
    return [];
  }
};

const addNewPost = async (username, content) => {
  const allPosts = await getAllPosts();
  console.log("getAllPosts: ", allPosts);

  const date = new Date();
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Note: January is 0!
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  const formattedDate = `${day}-${month}-${year}-${hours}-${minutes}-${seconds}`;

  const newPost = {
    id: formattedDate,
    username: username,
    content: content,
    timestamp: Date.now(),
  };

  allPosts.push(newPost);
  try {
    console.log("all posts: ", allPosts);
    const writeFile = await fs.writeFile(
      filePath,
      JSON.stringify(allPosts),
      "utf8",
    );
    console.log("data added successfully");
  } catch (error) {
    return [];
  }
};

module.exports = {
    getAllPosts,
    addNewPost
}