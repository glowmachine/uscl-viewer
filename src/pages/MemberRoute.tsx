import { useParams } from "react-router";
import Page from "../components/Member/Page";

export default function DetailsRoute() {
    const { bioguide } = useParams<{ bioguide: string }>();
    return bioguide
        ? <Page bioguide={bioguide} />
        : <p>No bioguide provided.</p>;
}