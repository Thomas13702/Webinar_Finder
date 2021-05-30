import qs from "qs";
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "@/components/Layout";
import WebinarItem from "@/components/WebinarItem";
import { API_URL } from "@/config/index";

export default function SearchPage({ webinars }) {
  //catch events as a prop
  const router = useRouter(); //use this to get url
  return (
    <Layout title="Search Results">
      <Link href="/events">Go Back</Link>
      <h1>Search Results for {router.query.term} </h1>
      {webinars.length === 0 && <h3>No webinars to show</h3>}

      {webinars.map((evt) => (
        <WebinarItem key={evt.id} evt={evt} />
      ))}
    </Layout>
  );
}

export async function getServerSideProps({ query: { term } }) {
  //term will be in url

  const query = qs.stringify({
    _where: {
      _or: [
        { name_contains: term },
        { speaker_contains: term },
        { description_contains: term },
        { venue_contains: term },
      ],
    },
  }); //using this so the term is search in name, performers, description, venue

  const res = await fetch(`${API_URL}/webinars?${query}`); //gets all evens and sorts by date ascending
  const webinars = await res.json();

  return {
    props: { webinars }, //return webinars as a prop - > passes webinars to our client side component as a prop
  };
}
