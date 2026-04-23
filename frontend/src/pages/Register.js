import { useState } from "react";
import axios from "axios";

function Register() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleRegister = async () => {
    try {
      await axios.post("http://localhost:5000/api/register", data);
      alert("Registered Successfully");
      window.location.href = "/login";
    } catch (err) {
      alert(err.response?.data || "Error");
    }
  };

  const styles = {
    container: {
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(135deg, #667eea, #764ba2)"
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
      background: "#667eea",
      color: "white",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer"
    },
    link: {
      marginTop: "10px",
      color: "#667eea",
      cursor: "pointer"
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Create Account</h2>

        <input style={styles.input} placeholder="Name"
          onChange={e => setData({...data, name: e.target.value})} />

        <input style={styles.input} placeholder="Email"
          onChange={e => setData({...data, email: e.target.value})} />

        <input style={styles.input} type="password" placeholder="Password"
          onChange={e => setData({...data, password: e.target.value})} />

        <button style={styles.button} onClick={handleRegister}>
          Register
        </button>

        {/* 🔗 FIXED BUTTON */}
        <p style={styles.link} onClick={() => window.location.href="/login"}>
          Already have an account? Login
        </p>
      </div>
    </div>
  );
}

export default Register;