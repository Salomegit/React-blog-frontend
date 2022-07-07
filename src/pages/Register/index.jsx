import { useState } from "react";
import { Link,useNavigate} from "react-router-dom";
import { axiosQuery } from "../../api";
import "./register.css";


export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate= useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {

      
      const res =await axiosQuery.post("/auth/register", { username, email, password });
      res.data && navigate("/login",{replace:true});
    }
   catch (err) {
setError(true);
  }
  };

  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerform" onSubmit={handleSubmit}>
        <label>UserName</label>
        <input
          type="text"
          className="registerInput"
          placeholder="Enter your UserName.."
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Email</label>
        <input
          type="email"
          className="registerInput"
          placeholder="Enter your Email.."
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          className="registerInput"
          placeholder="Enter your password.."
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="registerButton" type="submit">
          Register
        </button>
        <button className="registerLoginButton">
          <Link className="link" to="/login">
            Login
          </Link>
        </button>
        {error &&<span style={{color:"red",margin:"10px",textAlign:"center"}}>Something went wrong</span>}
      </form>
    </div>
  );
}
