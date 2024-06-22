import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigationType, useLocation } from "react-router-dom";
import Desktop1 from "./components/Desktop1";
import Desktop2 from "./components/Desktop2";
import Results from "./components/Results"; 
import Login from './components/Login';
import Register from './components/Register'
import Instructions from './components/Instructions';
// Import the Results component

function App() {
  const correctAnswers = 206;
  const totalQuestionsAttended = 228;
  const totalQuestionsAsked = 260;

  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "Endo Quiz";
        metaDescription = "Welcome to the homepage of My App.";
        break;
      case "/desktop-1":
        title = "Endo Quiz";
        metaDescription = "This is the Desktop1 page of My App.";
        break;
      case "/desktop-2":
        title = "Endo Quiz";
        metaDescription = "This is the Desktop2 page of My App.";
        break;
      case "/results":
        title = "Endo Quiz";
        metaDescription = "This is the Results page of My App.";
        break;
      default:
        title = "Endo Quiz";
        metaDescription = "Description of My App.";
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  return (
    <Routes>
       <Route path="/login" element={<Login />} />
       <Route path="/register" element={<Register />} />
      
      <Route path="/desktop-1" element={<Desktop1 />} />
      <Route path="/desktop-2/:quizId" element={<Desktop2 />} />
      <Route path="/results" element={<Results  />} />
      <Route path="/instructions/:quizId" element={<Instructions />} />
      <Route path="/" element={<Login />} />
    </Routes>
  );
}

export default App;
