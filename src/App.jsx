import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import Feed from "./pages/Feed";
import ProdectedRoute from "./pages/ProdectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        {/*
         * Feed sayfasını korumalı olarak belirledik
         * Sadece yetkili kullanıcılar girebilecek
         */}
        <Route element={<ProdectedRoute />}>
          <Route path="/feed" element={<Feed />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
