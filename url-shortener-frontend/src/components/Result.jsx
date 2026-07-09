import { toast } from "react-toastify";
import QRCode from "react-qr-code";

function Result({ shortUrl }) {

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    toast.success("Copied to Clipboard");
  };

  return (
    <div className="result">
      <h3>Your Short URL</h3>

      <input
        type="text"
        value={shortUrl}
        readOnly
      />

      <button onClick={handleCopy}>
        Copy
      </button>
      <div className="qr-section">
        <QRCode
          value={shortUrl}
          size={170}
        />
        <p>Scan QR to open URL</p>
      </div>
    </div>
  );
}

export default Result;