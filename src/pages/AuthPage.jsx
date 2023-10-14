import React, { useEffect, useState } from "react";
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth, provider } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const AuthPage = () => {
  const navigate = useNavigate();
  const [signUp, setSignUp] = useState(false);
  const [showError, setShowError] = useState(false);
  const [mail, setMail] = useState("");

  //! Hesabı daha önce açıksa
  useEffect(() => {
    if (auth.currentUser) {
      navigate("/feed");
    }
  }, []);

  //! formun gönderilme olayı
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    setMail(email);
    const pass = e.target[1].value;

    // * kayıt olma modunda ise
    if (signUp) {
      // yeni hesap oluştur
      createUserWithEmailAndPassword(auth, email, pass)
        .then((res) => {
          navigate("/feed");
          toast.success("Hesabınız başarıyla oluşturuldu.");
        })
        .catch((err) => {
          toast.error(
            `Üzgünüz hesabınız oluşturulamadı. Hata kodu:${err.code}`
          );
        });
    } else {
      // varolan hesaba giriş yap
      signInWithEmailAndPassword(auth, email, pass)
        .then((res) => {
          navigate("/feed");
          toast.success("Hesaba başarıyla giriş yapıldı.");
        })
        .catch((err) => {
          // şifresi yanlış ise state'i trueya çek
          if (err.code == "auth/invalid-login-credentials") {
            setShowError(true);
          }
          toast.error(`Hesabınıza giriş yapılamadı.Hata kodu:${err.code}`);
          console.dir(err);
        });
    }
  };

  //! google ile giriş
  const handleGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, provider);

      /*
       * yönlendirerek hesap açınca
       * sonuçlara erişme
       */

      console.log(res);
      toast.success("Google hesabınız ile giriş yapıldı.");
      navigate("/feed");
    } catch {
      (err) => console.log(err);
    }
  };

  //! şifre sıfırlama
  const handleReset = () => {
    sendPasswordResetEmail(auth, mail)
      .then(() => {
        toast.info(`${mail} mailinize sıfırlama e-postası gönderildi`);
      })
      .catch((err) => {
        toast.error(`Üzgünüz bir hata oluştu: ${err.code}`);
      });
  };

  return (
    <section className="h-screen grid place-items-center ">
      <div className="bg-black flex flex-col gap-10 py-[16px] px-[32px] h-full md:h-[650px] w-full md:w-[500px]  rounded-lg">
        {/* logo */}
        <div className="flex justify-center mt-8">
          <img className="w-[60px]" src="/x-logo.png" alt="twitter-logo" />
        </div>
        {/* title */}
        <h1 className="text-5xl text-center">X'e giriş yap</h1>
        {/* buttons */}
        <div className="flex justify-center" onClick={handleGoogle}>
          <div className="flex items-center bg-white w-[70%] rounded-full py-2 px-5 cursor-pointer gap-3 text-black transition hover:bg-gray-200">
            <img className="w-[20px]" src="/pnglogo.png" alt="google-logo" />
            <span className="whitespace-nowrap">Google ile giriş yap</span>
          </div>
        </div>
        {/* login form */}
        <div className="flex  justify-center">
          <form onSubmit={handleSubmit} className="flex flex-col w-[70%] ">
            <label>E-posta</label>
            <input
              className="bg-black border border-gray-600 focus:border-gray-400 rounded mt-2 p-2 shadow-lg  outline-none focus:shadow-[#494949]"
              type="email"
              required
            />
            <label className="mt-5">Şifre</label>
            <input
              className="bg-black border border-gray-600 focus:border-gray-400 rounded mt-2 p-2 shadow-lg  outline-none focus:shadow-[#494949]"
              type="password"
              required
            />

            <button className="mt-7 bg-white text-black rounded-full p-1 font-bold transition hover:bg-gray-300 hover:scale-[0.99]">
              {signUp ? "Kayıt Ol" : "Giriş Yap"}
            </button>

            <p className=" mt-5  flex gap-1 text-gray-500">
              {signUp ? "Hesabınız varsa" : "Hesabınız yoksa"}
              <span
                onClick={() => setSignUp(!signUp)}
                className=" text-gray-400 cursor-pointer hover:underline hover:text-white"
              >
                {signUp ? "giriş Yap" : "kaydol"}
              </span>
            </p>
            {/* şifreden dolayı hata oluşur ise bunu ekrana getir */}
            {showError && (
              <p
                onClick={handleReset}
                className=" mt-2 cursor-pointer text-red-500 hover:text-red-700"
              >
                Şifrenizi mi unuttunuz?
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default AuthPage;
