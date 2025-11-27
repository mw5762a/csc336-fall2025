import { useState } from "react";
import VideoModal from "./video-modal.jsx";

function ContestantCard({ star, danceSong, danceType, scores, eliminated, video }) {
    const [modalShow, setModalShow] = useState(false);

    return (
        <>
            <div
                onClick={() => setModalShow(true)}
                className={`contestant-card ${eliminated ? "eliminated" : ""}`}
            >
                <h2>{star}</h2>
                <p><b>Dance Type:</b> {danceType}</p>
                <p><b>Song:</b> {danceSong}</p>
                <p><b>Judges Score:</b> {scores}</p>
            </div>

            <VideoModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                star={star}
                video={video}
                danceType={danceType}
            />
        </>
    );
}

export default ContestantCard;
