import Layout from "@/components/Layout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import DashboardEvent from "@/components/DashboardEvent";
import { parseCookies } from "@/helpers/index";
import { API_URL } from "@/config/index";
import styles from "@/styles/DashBoard.module.css";
import { useRouter } from "next/router";

export default function DashboardPage({ webinars, token }) {
  const router = useRouter();
  const deleteEvent = async (id) => {
    if (confirm("Are you sure?")) {
      const res = await fetch(`${API_URL}/webinars/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message);
      } else {
        router.reload();
      }
    }
  };

  return (
    <Layout title="User Dashboard">
      <div className={styles.dash}>
        <h1>Dashboard</h1>
        <h3>My Webinars</h3>
        {webinars.map((webs) => (
          <DashboardEvent
            key={webs.id}
            webs={webs}
            handleDelete={deleteEvent}
          />
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req);

  const res = await fetch(`${API_URL}/webinars/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const webinars = await res.json();

  return {
    props: {
      webinars,
      token,
    },
  };
}
