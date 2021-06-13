import { ToastContainer, toast } from "react-toastify";
import { parseCookies } from "@/helpers/index";
import "react-toastify/dist/ReactToastify.min.css";
import { FaImage } from "react-icons/fa";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import Layout from "@/components/Layout";
import Modal from "@/components/Modal";
import ImageUpload from "@/components/ImageUpload";
import { API_URL } from "@/config/index";
import styles from "@/styles/Form.module.css";

export default function EditEventPage({ webs, token }) {
  const [values, setValues] = useState({
    name: webs.name,
    speaker: webs.speaker,
    website: webs.website,
    webinarType: webs.webinarType,
    date: webs.date,
    time: webs.time,
    description: webs.description,
  });

  const [imagePreview, setImagePreview] = useState(
    webs.image ? webs.image.formats.thumbnail.url : null
  );

  const [showModal, setShowModal] = useState(false);

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

    const res = await fetch(`${API_URL}/webinars/${webs.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    });

    if (!res.ok) {
      if (res.status === 403 || res.status === 401) {
        toast.error("Unauthorised");
        return;
      }
      toast.error("Something Went Wrong");
    } else {
      const webs = await res.json(); //get data
      router.push(`/webinars/${webs.slug}`);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const imageUploaded = async (e) => {
    const res = await fetch(`${API_URL}/webinars/${webs.id}`); //get data from API for event we have
    const data = await res.json(); // get data in JSON format
    setImagePreview(data.image.formats.thumbnail.url); // set preview to thumbnail image in data
    setShowModal(false); //close modal
  };

  return (
    <Layout title="Add New Event">
      <Link href="/events">Go Back</Link>
      <h1>Edit Event</h1>
      <ToastContainer />
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div>
            <label htmlFor="name">Event Name</label>
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
            <label htmlFor="webinarType">Webinar Type</label>
            <select
              name="webinarType"
              id="webinarType"
              onChange={handleInputChange}
              value={values.webinarType}
            >
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
          <label htmlFor="description">Event Description</label>
          <textarea
            type="text"
            name="description"
            id="description"
            value={values.description}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <input type="submit" value="Update Event" className="btn" />
      </form>

      <h2>Event Image</h2>
      {imagePreview ? (
        <Image src={imagePreview} height={100} width={170} />
      ) : (
        <div>
          <p>No image uploaded</p>
        </div>
      )}
      <div>
        <button onClick={() => setShowModal(true)} className="btn-secondary">
          <FaImage /> Set Image
        </button>
      </div>

      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <ImageUpload
          websId={webs.id}
          imageUploaded={imageUploaded}
          token={token}
        />
      </Modal>
    </Layout>
  );
}

export async function getServerSideProps({ params: { id }, req }) {
  const { token } = parseCookies(req);
  const res = await fetch(`${API_URL}/webinars/${id}`);
  const webs = await res.json();

  return {
    props: {
      webs,
      token,
    },
  };
}
