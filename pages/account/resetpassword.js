import Layout from "@/components/Layout";
import styles from "@/styles/AuthForm.module.css";
import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import AuthContext from "@/context/AuthContext";

export default function resetPassword() {
  const [email, setEmail] = useState("");

  const { forgotPassword, error } = useContext(AuthContext);

  useEffect(() => error && toast.error(error)); //if theres an error toastify the error

  const handleSubmit = (e) => {
    e.preventDefault();
    forgotPassword({ email });
  };

  return (
    <Layout>
      <div className={styles.auth}>
        <h1>Reset Password</h1>
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Please Enter Your Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <input type="submit" value="Login" className="btn" />
        </form>
        <p>
          Don't have an account? <Link href="/account/register">Register</Link>{" "}
        </p>
      </div>
    </Layout>
  );
}
