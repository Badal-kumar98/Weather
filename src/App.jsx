import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Weather from "./Home/Weather";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Weather />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </>
  );
}

export default App;
