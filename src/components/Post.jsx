import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import "moment/locale/tr";
import { auth, db } from "../firebase/config";
import { BiMessageRounded } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import { FiShare2 } from "react-icons/fi";
import { FcLike } from "react-icons/fc";
import {
  doc,
  deleteDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

const Post = ({ tweet }) => {
  // console.log(tweet);
  const [isLiked, setIsLiked] = useState(false);
  // kaç gün önce atıldığını hesaplama
  const date = moment(tweet.createdAt?.toDate()).fromNow();

  // kullanıcının tweeti beğenip beğenmediğini sorgulama
  useEffect(() => {
    const found = tweet.likes.find((userId) => userId === auth.currentUser.uid);
    setIsLiked(found);
  }, [tweet]);

  // tweeti siler
  const handleDelete = async () => {
    if (confirm("Tweeti silmeyi onaylıyor musun?")) {
      // silme istediğimiz belgenin referansını alma
      const docRef = doc(db, "tweets", tweet.id);
      // dökumanı silme
      await deleteDoc(docRef);
      console.log(docRef);
    }
  };
  // likelama
  const toogleLike = async () => {
    // dökümanın referansını alma
    const docRef = doc(db, "tweets", tweet.id);
    await updateDoc(docRef, {
      // diziye tweeti likelayan kullanıcının idisini ekleme
      likes: isLiked
        ? // diziden aktif kullanıcının idsini kaldırma
          arrayRemove(auth.currentUser.uid)
        : // diziden aktif kullanıcının idsini ekleme
          arrayUnion(auth.currentUser.uid),
    });
  };

  return (
    <div className="flex gap-3 p-3 border-b-[1px] border-gray-600 ">
      <img
        className="w-14 h-14 rounded-full"
        src={tweet.user.photo}
        alt="user_picture"
      />
      <div className="w-full">
        {/* üst kısım > kullanıcı bilgileir */}
        <div className="flex justify-between">
          <div className="flex items-center gap-3">
            <p className="font-bold">{tweet.user.name}</p>
            <p className="text-gray-400">@{tweet.user.name.toLowerCase()}</p>
            <p className="text-gray-400">{date}</p>
          </div>
          {tweet.user.id === auth.currentUser.uid && (
            <div
              onClick={handleDelete}
              className="p-2 rounded-full cursor-pointer hover:bg-gray-700"
            >
              <BsThreeDots />
            </div>
          )}
        </div>
        {/* orta kısım > tweet içeriği*/}
        <div className="my-3">
          <p>{tweet?.textContent}</p>
          {/* eğerki fotoğraf varsa*/}
          {tweet.imageContent && (
            <img
              className="w-full object-contain max-h-[300px] mt-3 rounded-lg"
              src={tweet.imageContent}
            />
          )}
        </div>
        {/* alt kısım > etkileşim butonları */}
        <div className="flex justify-between items-center">
          <div className="flex gap-1 items-center p-2 px-3 rounded-full transition cursor-pointer hover:bg-blue-300 hover:bg-opacity-25">
            <BiMessageRounded />
            {/* <span>{Math.round(Math.random() * 900)}</span> */}
          </div>
          <div className="flex gap-1 items-center  p-2 px-3 rounded-full transition cursor-pointer hover:bg-[#1b3f16a9] hover:bg-opacity-25">
            <FaRetweet />
            {/* <span>{Math.round(Math.random() * 900)}</span> */}
          </div>
          <div
            onClick={toogleLike}
            className="flex gap-1 items-center  p-2 px-3 rounded-full transition cursor-pointer hover:bg-[red] hover:bg-opacity-25"
          >
            {isLiked ? <FcLike /> : <AiOutlineHeart />}
            <span>{tweet.likes.length}</span>
          </div>
          <div className="flex gap-1 items-center  p-2  rounded-full transition cursor-pointer hover:bg-[#535353] hover:bg-opacity-25">
            <FiShare2 />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
