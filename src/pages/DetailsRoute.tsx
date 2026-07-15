import { useParams } from "react-router";
import Details from "../components/Details";

export default function DetailsRoute() {
    const { bioguide } = useParams<{ bioguide: string }>();
    return bioguide
        ? <Details bioguide={bioguide} />
        : <p>No bioguide provided.</p>;
}