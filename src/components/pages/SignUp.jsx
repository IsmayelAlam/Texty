import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

import { FaFacebookSquare, FaGoogle, FaTwitter } from "react-icons/fa";
import { ImImages } from "react-icons/im";

import Logo from "../utils/Logo";
import { auth, db, storage } from "../API/firebase";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Spinner from "../utils/Spinner";
import ErrorMessage from "../utils/ErrorMessage";

export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");
  const navigate = useNavigate();

  async function handleSingUp(e) {
    e.preventDefault();
    setIsLoading(true);

    const fullName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const confirmPass = e.target[3].value;
    const image = e.target[4].files[0];

    try {
      if (password !== confirmPass) {
        throw new Error("password dose not match");
      }

      const res = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(res.user, {
        displayName: fullName,
      });

      if (image) {
        const storageRef = ref(storage, `${fullName}.jpg`);

        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            setIsError(error);
          },
          async () => {
            const download = await getDownloadURL(uploadTask.snapshot.ref);

            await updateProfile(res.user, {
              photoURL: download,
            });
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName: fullName,
              email,
              photoURL: download,
              friends: {},
            });
          }
        );
      } else {
        await setDoc(doc(db, "users", res.user.uid), {
          uid: res.user.uid,
          displayName: fullName,
          email,
          photoURL: null,
          friends: {},
        });
      }
      setIsLoading(false);
    } catch (error) {
      setIsError(error);
      return;
    }

    e.target.reset();
    if (!isError && !isLoading) navigate("/");
  }

  let content = (
    <>
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
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </>
  );

  if (isLoading) content = <Spinner />;
  if (isError) content = <ErrorMessage error={isError} />;

  return (
    <div className="authPage">
      <div className="authBox">
        <Logo />
        {content}
      </div>
    </div>
  );
}
