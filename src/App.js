import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductList from "./pages/ProductList/ProductList";
import ProductDetails from "./pages/ProductDetails/ProductDetails";


function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<ProductList />} />
          <Route exact path="/producto/:id" element={<ProductDetails />} />
          <Route exact path="*" element={<ProductList />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;