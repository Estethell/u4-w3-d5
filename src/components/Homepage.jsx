import { useEffect, useState } from "react";
import { baseApiUrl } from "../constants.js";
import { Link } from "react-router-dom/dist";
import { Card, Button } from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";

const Homepage = () => {
  const [posts, setPosts] = useState([]);
  const [deletes, setDeletes] = useState(0);
  const [lastPage, setLastPage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch(`${baseApiUrl}/posts?page=${currentPage}&_embed=1`)
      .then((res) => {
        // recupera i dati della paginazione dagli header
        setLastPage(parseInt(res.headers.get("X-WP-TotalPages")));
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setPosts(data);
      });
  }, [currentPage, deletes]);

  const changePage = (page) => {
    setCurrentPage(page);
  };

  function generatePaginationArray() {
    let paginationArr = [];
    for (let index = 1; index <= lastPage; index++) {
      paginationArr.push({
        n: index,
        active: currentPage === index,
      });
    }
    return paginationArr;
  }

  const deletePost = (postId) => {
    const authString = btoa("Ilaria:OnOR mXcf 649e Dofv 3jqB FrN3");
    fetch(`${baseApiUrl}/posts/${postId}`, {
      headers: {
        Authorization: `Basic ${authString}`,
      },
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        setDeletes(deletes + 1);
        window.alert("Post successfully deleted!");
      }
    });
  };

  return (
    <>
      <Container>
        <Row className="mt-2 d-flex">
          {posts.map((post) => (
            <>
              <Col lg={3} key={post.id} className="mt-2 d-flex">
                <Card style={{ width: "18rem" }}>
                  <Card.Img
                    className="p-2"
                    variant="top"
                    src={
                      post._embedded && post._embedded["wp:featuredmedia"]
                        ? post._embedded["wp:featuredmedia"][0].source_url
                        : "https://images.pexels.com/photos/321552/pexels-photo-321552.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    }
                  />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title>
                      <Link className="linkHomepage" to={`/posts/${post.id}`}>
                        {post.title.rendered}
                      </Link>
                    </Card.Title>
                    <Card.Text dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}></Card.Text>

                    <Button className="btn btn-danger mt-auto" onClick={() => deletePost(post.id)}>
                      Cancella
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            </>
          ))}
        </Row>
        <Row className="mt-5">
          <nav>
            <ul className="pagination">
              <li className={`page-item ${currentPage === 1 && "disabled"}`}>
                <span className="page-link" onClick={() => currentPage !== 1 && changePage(currentPage - 1)}>
                  Previous
                </span>
              </li>

              {generatePaginationArray().map((page) => (
                <li key={page.n} className={`page-item ${page.active && "active"}`}>
                  <span className="page-link" onClick={() => changePage(page.n)}>
                    {page.n}
                  </span>
                </li>
              ))}

              <li className={`page-item ${currentPage === "lastPage" && "disabled"}`}>
                <span className="page-link" onClick={() => currentPage !== lastPage && changePage(currentPage + 1)}>
                  Next
                </span>
              </li>
            </ul>
          </nav>
        </Row>
      </Container>
    </>
  );
};

export default Homepage;
