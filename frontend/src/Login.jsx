import React, { useState } from "react";
import { auth, googleProvider, githubProvider } from "./firebase";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGithubLogin = async () => {
    try {
      await signInWithPopup(auth, githubProvider);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "2rem auto",
        padding: 24,
        border: "1px solid #ccc",
        borderRadius: 8,
      }}
    >
      <h2>Login to SnippetShare</h2>
      <button
        onClick={handleGoogleLogin}
        style={{ width: "100%", marginBottom: 8 }}
      >
        Sign in with Google
      </button>
      <button
        onClick={handleGithubLogin}
        style={{ width: "100%", marginBottom: 8 }}
      >
        Sign in with GitHub
      </button>
      <hr />
      <form onSubmit={handleEmailAuth}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", marginBottom: 8 }}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", marginBottom: 8 }}
          required
        />
        <button type="submit" style={{ width: "100%", marginBottom: 8 }}>
          {isRegister ? "Register" : "Login"}
        </button>
      </form>
      <button
        onClick={() => setIsRegister((r) => !r)}
        style={{ width: "100%", marginBottom: 8 }}
      >
        {isRegister
          ? "Already have an account? Login"
          : "Need an account? Register"}
      </button>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
}
