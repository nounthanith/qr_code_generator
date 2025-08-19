import Qr from "./components/Qr";
import { Routes, Route } from "react-router-dom";
import Bar from "./components/Bar";
import Navbar from "./components/Navbar";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Qr />} />
        <Route path="/barcode" element={<Bar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;