import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Weather from "./Home/Weather";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Weather />} />
          <Route path="*" element={<Weather />} />
        </Routes>
        <Toaster />
      </HashRouter>
    </>
  );
}

export default App;
