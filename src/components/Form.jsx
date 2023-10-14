import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React from "react";
import { BsCardImage } from "react-icons/bs";
import { toast } from "react-toastify";
import { db } from "../firebase/config";

const Form = ({ user }) => {
  // collectionun referansını alma
  const collectionRef = collection(db, "tweets");
  console.log(user);
  // tweet atma
  const handleSubmit = async (e) => {
    e.preventDefault();
    const textContent = e.target[0].value;
    const imageContent = e.target[1].files;

    if (!textContent && !imageContent) {
      toast.info("Tweet içeriğini ekleyin.");
      return;
    }

    // tweet'i kolleksiyona ekleme
    await addDoc(collectionRef, {
      textContent,
      imageContent: null,
      createdAt: serverTimestamp(),
      user: {
        id: user.uid,
        name: user.displayName,
        photo: user.photoURL,
      },
      likes: [],
      isEdited: false,
    });
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-3 p-4 border-b-[1px] border-gray-700"
    >
      <img src={user?.photoURL} className="rounded-full h-[35px] md:h-[45px]" />
      <div className="w-full">
        <input
          className="w-full bg-transparent px-2 my-2 text-normal md:text-lg outline-none "
          placeholder="Neler oluyor?"
          type="text"
        />
        <div className="flex  justify-between items-center">
          <label
            className="cursor-pointer hover:bg-gray-800 transition p-4 rounded-full"
            htmlFor="picture"
          >
            <BsCardImage size={20} />
          </label>
          <input className="hidden" id="picture" type="file" />
          <button className="bg-blue-500 px-4 py-2 rounded-full transition hover:bg-blue-800">
            Gönder
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form;
