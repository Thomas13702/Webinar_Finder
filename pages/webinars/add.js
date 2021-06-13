import { parseCookies } from "@/helpers//index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import styles from "@/styles/Form.module.css";

export default function AddEventPage({ token }) {
  const [values, setValues] = useState({
    name: "",
    speaker: "",
    website: "",
    webinarType: "",
    date: "",
    time: "",
    description: "",
  });

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    //Validation
    const hasEmptyFields = Object.values(values).some(
      (element) => element === ""
    ); //checks each part of values to see if its empty
    //some checks each item in object and will return treu or false whether it passes test (here is whether its equal to "")

    if (hasEmptyFields) {
      toast.error("Please fill in all fields"); //toastify for error messages
    }

    const res = await fetch(`${API_URL}/webinars`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    });

    if (!res.ok) {
      if (res.status === 403 || res.status === 401) {
        toast.error("No Token included");
        return;
      }
      toast.error("Something Went Wrong");
    } else {
      const evt = await res.json(); //get data
      router.push(`/webinars/${evt.slug}`);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <Layout title="Add New Event">
      <Link href="/webinars">Go Back</Link>
      <h1>Add Event</h1>
      <ToastContainer />
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div>
            <label htmlFor="name">Webinar Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={values.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="speaker">Speaker</label>
            <input
              type="text"
              name="speaker"
              id="speaker"
              value={values.speaker}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="website">Website</label>
            <input
              type="text"
              name="website"
              id="website"
              value={values.website}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="type">Webinar Type</label>

            <select name="webinarType" id="type" onChange={handleInputChange}>
              <option value="0">Select Webinar Type</option>
              <option value="Business">Business</option>
              <option value="ComputerScience">Computer Science</option>
              <option value="Leadership">Leadership</option>
              <option value="HealthandLifestyle">Health and lifestyle</option>
              <option value="Food">Food</option>
              <option value="ArtsandCraft">Arts and Crafts</option>
              <option value="Technology">Technology</option>
              <option value="Sport">Sport</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <input
              type="date"
              name="date"
              id="date"
              value={values.date}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="time">Time</label>
            <input
              type="text"
              name="time"
              id="time"
              value={values.time}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div>
          <label htmlFor="description">Webinar Description</label>
          <textarea
            type="text"
            name="description"
            id="description"
            value={values.description}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <input type="submit" value="Add Webinar" className="btn" />
      </form>
    </Layout>
  );
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req); //get token
  return {
    props: {
      token,
    },
  };
}
