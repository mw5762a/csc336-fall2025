import Modal from "react-bootstrap/Modal";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./video-modal.css"

function VideoModal({ show, onHide, star, video, danceType }) {
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
            className="video-modal"
            aria-labelledby="contained-modal-title-vcenter"
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {`${star} | ${danceType} `}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <iframe
                    width="100%"
                    height="450"
                    src={video}
                    title={`Weekly dance for ${star}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </Modal.Body>
        </Modal>
    );
}

export default VideoModal;
