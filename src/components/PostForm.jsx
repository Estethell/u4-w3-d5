import { useState } from "react";
import { baseApiUrl } from "../constants.js";

const PostForm = () => {
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const authString = btoa("Ilaria:OnOR mXcf 649e Dofv 3jqB FrN3");
    fetch(`${baseApiUrl}/posts/`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Basic ${authString}` },
      body: JSON.stringify({
        title: newTitle,
        content: newContent,
        status: "publish",
      }),
    })
      .then((res) => {
        console.log("Here's the response", res);
        if (res.ok) {
          window.alert("New post added!");
          setNewTitle("");
          setNewContent("");
        } else {
          throw new Error("Network response was not ok");
        }
      })

      .catch((error) => {
        console.error("Failed to add the new post:", error);
      });
  };

  return (
    <div>
      <h2>Add a New Post</h2>
      <form onSubmit={handleSubmit}>
        <label>Blog title:</label>
        <input type="text" required value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
        <label>Blog body:</label>
        <textarea required value={newContent} onChange={(e) => setNewContent(e.target.value)}></textarea>
        <label>Blog author:</label>
        <button>Publish</button>
      </form>
    </div>
  );
};

export default PostForm;
