import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

export default function PageNotFound() {
  const navigate = useNavigate();

  return (
    <div className="pageNotFound">
      <p>404 | page not found</p>
      <button onClick={() => navigate("/")}>
        <BiArrowBack />
      </button>
    </div>
  );
}
