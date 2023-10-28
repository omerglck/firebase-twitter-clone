import React, { useEffect, useState } from "react";
import Form from "./Form";
import Post from "./Post";
import { onSnapshot, collection, query, orderBy } from "firebase/firestore";
import { db } from "../firebase/config";
import Loading from "./Loading";
import axios from "axios";

const Main = ({ user }) => {
  const tweetsCol = collection(db, "tweets");
  const [tweets, setTweets] = useState(null);
  useEffect(() => {
    // filtreleme ayarları tanımlama
    const options = query(tweetsCol, orderBy("createdAt", "desc"));
    onSnapshot(options, (snapshot) => {
      // her bir döükümanın verisine erişip diziye aktar
      // twetleri geçici olarak tuttuğumuz dizi
      const tempTweets = [];
      snapshot.forEach((doc) => {
        tempTweets.push({ ...doc.data(), id: doc.id });
      });
      // verileri state'e aktartma
      setTweets(tempTweets);
    });
  }, []);

  return (
    <main className=" border border-gray-800 overflow-y-auto">
      <header className="font-bold p-4 border-b-[1px] border-gray-700">
        Anasayfa
      </header>
      {/* form */}
      <Form user={user} />
      {/* post */}
      {!tweets ? (
        <Loading />
      ) : (
        tweets.map((tweet) => <Post key={tweet.id} tweet={tweet} />)
      )}
    </main>
  );
};

export default Main;
