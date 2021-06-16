import Layout from "@/components/Layout";
import styles from "@/styles/AuthForm.module.css";
import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import AuthContext from "@/context/AuthContext";

export default function ResetCode() {
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const { resetPassword, error } = useContext(AuthContext);

  useEffect(() => error && toast.error(error)); //if theres an error toastify the error

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      toast.error("Passwords do not match");
      return;
    }
    resetPassword({ code, password });
  };

  return (
    <Layout>
      <div className={styles.auth}>
        <h1>Reset Password</h1>

        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="code">
              Reset Code: This would have been sent to your email
            </label>
            <input
              type="text"
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="passwordConfirm">Confirm Password</label>
            <input
              type="password"
              id="passwordConfirm"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </div>
          <input type="submit" value="Submit" className="btn" />
        </form>
        <p>
          Don't have an account? <Link href="/account/register">Register</Link>{" "}
        </p>
      </div>
    </Layout>
  );
}
