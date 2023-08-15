import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { FaFacebookSquare, FaGoogle, FaTwitter } from "react-icons/fa";
import { ImImages } from "react-icons/im";
import { Link, useNavigate } from "react-router-dom";
import { useReducer } from "react";

import Spinner from "../utils/Spinner";
import ErrorMessage from "../utils/ErrorMessage";
import Logo from "../utils/Logo";
import imageCompress from "../../helpers/imageCompress";
import { auth, db, storage } from "../API/firebase";

function reducer(state, action) {
  switch (action.type) {
    case "isLoading":
      return { ...state, loading: action.loading };
    case "FullName":
      return { ...state, fullName: action.fullName };
    case "isUploading":
      return { ...state, uploading: action.uploading };
    case "isProgress":
      return { ...state, progress: action.progress };
    case "isError":
      return { ...state, error: action.error };
    case "imageLink":
      return { ...state, image: action.image };
    default:
      throw Error("Unknown action.");
  }
}

const initState = {
  loading: false,
  fullName: "",
  uploading: false,
  progress: 0,
  error: null,
  image: null,
};

export default function SignUp() {
  const [state, dispatch] = useReducer(reducer, initState);

  const navigate = useNavigate();

  async function handleImage(e) {
    const image = e.target.files["0"];
    if (!image) return;

    dispatch({ type: "isUploading", uploading: true });

    const compressImg = await imageCompress(image, 400);

    const storageRef = ref(storage, `${state.fullName}${Date.now()}`);

    const uploadTask = uploadBytesResumable(storageRef, compressImg);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        dispatch({ type: "isProgress", progress });
      },
      (error) => {
        dispatch({ type: "isError", error });
      },
      async () => {
        const download = await getDownloadURL(uploadTask.snapshot.ref);
        dispatch({ type: "imageLink", image: download });
        dispatch({ type: "isUploading", uploading: false });
      }
    );
  }

  async function handleSingUp(e) {
    e.preventDefault();
    dispatch({ type: "isLoading", loading: true });

    const fullName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const confirmPass = e.target[3].value;
    const image = state.image;

    try {
      if (password !== confirmPass) {
        throw new Error("password dose not match");
      }

      const res = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(res.user, {
        displayName: fullName,
        photoURL: image,
      });

      await setDoc(doc(db, "users", res.user.uid), {
        uid: res.user.uid,
        displayName: fullName,
        email,
        photoURL: image,
        friends: [],
      });

      dispatch({ type: "isLoading", loading: false });
    } catch (error) {
      dispatch({ type: "isError", error });
      return;
    }

    e.target.reset();
    if (!state.error && !state.loading) navigate("/");
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
          onChange={(e) =>
            dispatch({ type: "FullName", fullName: e.target.value })
          }
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
          <input type="file" id="images" onChange={handleImage} />
          {state.uploading && (
            <progress id="userImage" max="100" value={state.progress} />
          )}
        </label>

        <button
          type="submit"
          disabled={state.uploading}
          style={state.uploading ? { cursor: "not-allowed" } : null}
        >
          sign up
        </button>
      </form>
      <p className="textLink">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </>
  );

  if (state.loading) content = <Spinner />;
  if (state.error) content = <ErrorMessage error={state.error} />;

  return (
    <div className="authPage">
      <div className="authBox">
        <Logo />
        {content}
      </div>
    </div>
  );
}
