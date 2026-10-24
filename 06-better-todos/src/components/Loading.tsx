import Image from "react-bootstrap/Image";
import imgLoading from "../assets/images/loading.svg";

function Loading() {
	return (
		<div className="loading-wrapper" role="status">
			<Image src={imgLoading} className="loading-image" alt="Batman holding umbrella" fluid />
			<p>Fetching data…</p>
		</div>
	);
}

export default Loading;
