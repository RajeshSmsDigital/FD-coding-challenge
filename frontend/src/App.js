import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Menu from "./components/Menu/Menu";
import ProductList from "./components/ProductsList/ProductList";
import Statistics from "./components/Statistics/Statistics";

function App() {
  return (
    <div className="App">
      <Menu />
      <Routes>
        <Route path="/" element={<Navigate to="/ProductList" />} />
        <Route path="ProductList" element={<ProductList />} />
        <Route path="Statistics" element={<Statistics />} />
      </Routes>
    </div>
  );
}

export default App;
