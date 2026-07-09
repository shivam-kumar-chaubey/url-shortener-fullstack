function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
}) {

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">

      <div className="modal">

        <h2>🗑 Delete URL</h2>

        <p>
          Are you sure you want to delete this URL?
        </p>

        <div className="modal-buttons">

          <button
            className="cancel-btn"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="confirm-btn"
            onClick={onConfirm}
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}

export default ConfirmModal;