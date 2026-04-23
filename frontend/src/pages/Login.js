import { useState } from "react";
import axios from "axios";

function Login() {
  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/login", data);

      localStorage.setItem("token", res.data.token);

      alert("Login Successful");
      window.location.href = "/dashboard";

    } catch (err) {
      alert(err.response?.data || "Login Failed");
    }
  };

  const styles = {
    container: {
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(135deg, #ff9a9e, #fad0c4)"
    },
    card: {
      background: "white",
      padding: "30px",
      borderRadius: "15px",
      width: "300px",
      textAlign: "center",
      boxShadow: "0 8px 20px rgba(0,0,0,0.2)"
    },
    input: {
      width: "100%",
      padding: "10px",
      margin: "10px 0",
      borderRadius: "8px",
      border: "1px solid #ccc"
    },
    button: {
      width: "100%",
      padding: "10px",
      background: "#ff6a88",
      color: "white",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer"
    },
    link: {
      marginTop: "10px",
      color: "#ff6a88",
      cursor: "pointer"
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Welcome Back</h2>

        <input style={styles.input} placeholder="Email"
          onChange={e => setData({...data, email: e.target.value})} />

        <input style={styles.input} type="password" placeholder="Password"
          onChange={e => setData({...data, password: e.target.value})} />

        <button style={styles.button} onClick={handleLogin}>
          Login
        </button>

       
        <p style={styles.link} onClick={() => window.location.href="/"}>
          New user? Register here
        </p>
      </div>
    </div>
  );
}

export default Login;