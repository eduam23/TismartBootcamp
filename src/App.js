import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProductList from "./pages/ProductList/ProductList";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import LoginPage from "./pages/LoginPage/LoginPage";
import { AppProvider } from "./context/AppContext";
import { ProtectedRoute } from "./middlewares/ProtectedRoute";


function App() {



  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          <Route path="/" element={ localStorage.token ? <Navigate _replace_ to="/producto" /> : <Navigate _replace_ to="/login" />} />
          <Route path="/login" element={ localStorage.token ? <Navigate _replace_ to="/producto" /> : <LoginPage />} />
          <Route path="/producto" element={<ProtectedRoute><ProductList/></ProtectedRoute>} />
          <Route path="/producto/:id" element={<ProtectedRoute><ProductDetails/></ProtectedRoute>} />
          <Route path="*" element={ localStorage.token ? <ProductList /> : <LoginPage />} />
        </Routes>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
