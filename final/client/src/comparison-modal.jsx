import Modal from "react-bootstrap/Modal";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./comparison-modal.css";

function ComparisonModal({ show, onHide, barChartData, selectedContestant1, selectedContestant2 }) {
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
            className="comparison-modal"
        >
            <Modal.Header closeButton>
                <Modal.Title id="comparison-modal-title">
                    Contestant Comparison
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div style={{ width: "100%", height: 500 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={barChartData}>
                            <XAxis dataKey="week" angle={-45} textAnchor="end" height={60} />
                            <YAxis width="auto" label={{ value: 'Average Score', position: 'insideLeft', dx: 0, dy: 20, angle: -90 }} />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey={selectedContestant1} fill="#c7a4ff" />
                            <Bar dataKey={selectedContestant2} fill="#a26bff" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default ComparisonModal;
