import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

import { FaFacebookSquare, FaGoogle, FaTwitter } from "react-icons/fa";
import { ImImages } from "react-icons/im";

import Logo from "../utils/Logo";
import { auth, db, storage } from "../API/firebase";

export default function SignUp() {
  async function handleSingUp(e) {
    e.preventDefault();
    console.log(e);

    const fullName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const confirmPass = e.target[3].value;
    const image = e.target[4].files[0];

    console.log(image);

    if (password !== confirmPass) {
      e.target[3].value = "";
      return;
    }

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const storageRef = ref(storage, fullName);

      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        (error) => {},
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
              displayName: fullName,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              fullName,
              email,
              photoURL: downloadURL,
              friends: {},
            });
          });
        }
      );

      console.log(res);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
    }

    e.target.reset();
  }

  return (
    <div className="authPage">
      <div className="authBox">
        <Logo />
        <div className="authLink">
          <p>Sign up with</p>
          <div className="links">
            <FaGoogle />
            <FaFacebookSquare />
            <FaTwitter />
          </div>
        </div>
        <div className="divider">
          <hr />
          <p>or</p>
          <hr />
        </div>
        <form className="authFrom" onSubmit={handleSingUp}>
          <input
            type="text"
            id="fullName"
            placeholder="Full Name"
            required
            minLength={4}
          />
          <input type="email" id="email" placeholder="Email" required />
          <input
            type="password"
            id="password"
            placeholder="Password"
            minLength={6}
            required
          />
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm password"
            minLength={6}
            required
          />
          <label htmlFor="images" className="addImage">
            <ImImages /> <span>Add a profile image</span>
            <input type="file" id="images" />
          </label>

          <button type="submit">sign up</button>
        </form>
        <p className="textLink">
          Already have an account? <a href="#">Login</a>
        </p>
      </div>
    </div>
  );
}
