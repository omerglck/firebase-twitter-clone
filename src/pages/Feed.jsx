import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import Main from "../components/Main";
import Aside from "../components/Aside";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";

const Feed = () => {
  const [user, setUser] = useState();
  useEffect(() => {
    // firebaseden aktif kullanıcının verisini aldık ve state'e aktardık
    // şu anda oturum açmış olan kullanıcıyı al
    onAuthStateChanged(auth, (res) => {
      if (res) {
        setUser(res);
      }
    });
  }, []);
  return (
    <div className="feed xl:grid-cols-3 h-screen bg-black overflow-hidden">
      <Nav user={user} />
      <Main user={user} />
      <Aside />
    </div>
  );
};

export default Feed;
