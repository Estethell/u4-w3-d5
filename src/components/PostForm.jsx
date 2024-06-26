import { useState } from "react";
import { baseApiUrl } from "../constants.js";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const PostForm = () => {
  const navigate = useNavigate();
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
        console.log("Risposta Esatta!", res);
        if (res.ok) {
          window.alert("Nuovo post aggiunto alla lista!");
          setNewTitle("");
          setNewContent("");
        } else {
          throw new Error("Errore");
        }
        navigate("/");
      })

      .catch((error) => {
        console.error("Errore:", error);
      });
  };

  return (
    <Container>
      <h2 className="text-center">Crea un nuovo post!</h2>
      <form className="d-flex flex-column w-50 mx-auto" onSubmit={handleSubmit}>
        <label className="my-3">Titolo:</label>
        <input type="text" required value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
        <label className="my-3">Contenuto:</label>
        <textarea required value={newContent} onChange={(e) => setNewContent(e.target.value)}></textarea>

        <div>
          <button className="btn btn-success my-5">Pubblica</button>
        </div>
      </form>
    </Container>
  );
};

export default PostForm;
