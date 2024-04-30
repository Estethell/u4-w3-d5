import { useEffect, useState } from "react";
import { useParams } from "react-router-dom/dist";
import { baseApiUrl } from "../constants";
import { Container, Row, Col } from "react-bootstrap";

const PostDetails = () => {
  const [post, setPost] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    fetch(`${baseApiUrl}/posts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPost(data);
      });
  }, [id]);

  return (
    post && (
      <Container>
        <Row>
          <Col className="d-flex flex-column align-items-center">
            <h1 className="my-3 mt-5">{post.title.rendered}</h1>
            {post._embedded && post._embedded["wp:term"] && (
              <div>
                {post._embedded["wp:term"][0].map((category) => (
                  <span key={category.id} className="badge rounded-pill text-bg-primary">
                    {category.name}
                  </span>
                ))}
              </div>
            )}

            <p className="m-0">Autore: {post.author}</p>
            <p className="m-0 mb-3">Categorie: {post.categories}</p>

            <div className="mt-5" dangerouslySetInnerHTML={{ __html: post.content.rendered }}></div>
          </Col>
        </Row>
      </Container>
    )
  );
};

export default PostDetails;
