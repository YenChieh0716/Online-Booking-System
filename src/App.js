import "./App.css";
import Header from "./header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./pages/Signin";
import Navbar from "./Navbar";
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Navbar />
      <Routes>
        <Route path='/' exact element={'首頁'}></Route>
        <Route path='/Signin' exact element={<Signin />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
