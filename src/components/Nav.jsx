import { signOut } from "firebase/auth";
import { navSections } from "../constants";
import { auth } from "../firebase/config";
import { toast } from "react-toastify";

const Nav = ({ user }) => {
  const logOut = () => {
    signOut(auth)
      .then(() => toast.info("çıkış yapıldı"))
      .catch((err) => console.log(err));
  };

  return (
    <nav className="flex flex-col justify-between items-end p-2 py-4 ">
      <div>
        <img src="x-logo.png" className="w-14 my-4" />
        {navSections.map((i, idx) => (
          <div
            key={idx}
            className="flex justify-center md:justify-normal items-center gap-3 md:text-[20px] text-3xl lg:text-[25px] p-3 cursor-pointer transition rounded-full md:rounded-2xl hover:bg-[#363636]"
          >
            {i.icon}
            <span className="hidden md:block whitespace-nowrap">{i.title}</span>
          </div>
        ))}
      </div>
      <div>
        {/* kullanıcı bilgileri */}
        <div className="flex flex-col gap-5">
          <div className="flex justify-end md:justify-normal items-center gap-1">
            <img src={user?.photoURL} className="w-12 h-12 rounded-full" />
            <p className="hidden md:block whitespace-nowrap font-bold">
              {user?.displayName}
            </p>
          </div>
          <button className="bg-gray-600 p-2 rounded-lg " onClick={logOut}>
            Çıkış Yap
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
