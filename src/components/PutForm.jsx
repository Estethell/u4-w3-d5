import { useState } from "react";
import { baseApiUrl } from "../constants.js";
import { useParams } from "react-router-dom/dist";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom/dist";

const PutForm = (props) => {
  const navigate = useNavigate();
  const [newTitle, setNewTitle] = useState(props?.articleData?.title?.rendered);
  const [newContent, setNewContent] = useState(props?.articleData?.content?.rendered);

  const [id, setId] = useState(props?.articleData?.id);

  // useEffect(() => {
  //   fetch(`${baseApiUrl}/posts/${id}?_embed=1`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log("DATA", data);
  //       setInitialData(data);
  //     });
  // }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    debugger;
    console.log(id);

    const putFetch = () => {
      const authString = btoa("Ilaria:OnOR mXcf 649e Dofv 3jqB FrN3");
      fetch(`${baseApiUrl}/posts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Basic ${authString}` },
        body: JSON.stringify({
          title: newTitle,
          content: newContent,
          status: "publish",
        }),
      })
        .then((res) => {
          debugger;
          console.log("Risposta esatta!", res);
          if (res.ok) {
            window.alert("Post modificato con successo");
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
    putFetch();
  };

  return (
    <Container>
      <h2 className="text-center">Modifica il post!</h2>
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

export default PutForm;
