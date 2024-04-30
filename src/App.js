import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import MyNav from "./components/MyNav";
import PostDetails from "./components/PostDetails";
import "bootstrap/dist/css/bootstrap.min.css";
import PostForm from "./components/PostForm";
import "./App.css";
import PutForm from "./components/PutForm";
import { useState } from "react";

function App() {
  const [acticleData, setArticleData] = useState(null);
  return (
    <BrowserRouter>
      <MyNav />
      <Routes>
        <Route path="/" element={<Homepage setArticle={setArticleData} />} />
        <Route path="/posts/:id" element={<PostDetails />} />
        <Route path="/form" element={<PostForm />} />
        <Route path="/PutForm" element={<PutForm articleData={acticleData} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
