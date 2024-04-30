import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import MyNav from "./components/MyNav";
import PostDetails from "./components/PostDetails";
import "bootstrap/dist/css/bootstrap.min.css";
import PostForm from "./components/PostForm";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <MyNav />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/posts/:id" element={<PostDetails />} />
        <Route path="/form" element={<PostForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
