import { useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";
import ConfirmModal from "./ConfirmModal";

function History({ urls, fetchUrls }) {
  const [showModal, setShowModal] = useState(false);

  const [selectedId, setSelectedId] = useState(null);
  const handleDelete = async (id) => {


    try {
      await api.delete(`/delete/${id}`);

      toast.success("URL Deleted Successfully");

      fetchUrls(); // List refresh
    } catch (error) {
      toast.error("Failed to delete URL");
    }
  };
  return (
    <>
    <div className="history">

      <h2>📜 Recent URLs</h2>

      {urls.length === 0 ? (
        <p>No URLs Found</p>
      ) : (
        urls.map((item) => (
          <div className="history-card" key={item._id}>

            <h3>{item.originalUrl}</h3>

            <p>
              https://url-shortener-api-jhd4.onrender.com/{item.shortCode}
            </p>

            <span>👆 Clicks : {item.clicks}</span>

            <button
              className="delete-btn"
              onClick={() => {
                setSelectedId(item._id);
                setShowModal(true);
              }}
            >
              🗑 Delete
            </button>
          </div>
        ))
      )}

    </div>
    <ConfirmModal

isOpen={showModal}

onClose={()=>setShowModal(false)}

onConfirm={()=>{

handleDelete(selectedId);

setShowModal(false);

}}

/></>
  );
}

export default History;