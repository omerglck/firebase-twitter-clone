import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";

// protected route içinde alt sayfaları ekrana outlet ile basarız.

const ProdectedRoute = () => {
  // kullanıcının yetkisi var mı state'i
  const [isAuth, setIsAuth] = useState();

  useEffect(() => {
    // aktif oturumdaki değişikliği izler
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    });
  }, []);

  // kullanıcının yetkisi yoksa logine yönlendir
  if (isAuth === false) return <Navigate to={"/"} replace />;

  // Kullanıcının yetkisi varsa alt route'u göster
  return <Outlet />;
};

export default ProdectedRoute;
