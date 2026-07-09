import api from "../services/api";
import Result from "./Result";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import History from "./History";




function UrlForm() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [shortUrl, setShortUrl] = useState("");
  const [urls, setUrls] = useState([]);

const handleSubmit = async () => {

    if (!url.trim()) {
        toast.error("Please enter a URL");
        return;
    }
    try {
        setLoading(true);
        const res = await api.post("/shorten", {
            url,
        });
        setShortUrl(res.data.shortUrl);
        fetchUrls();
        toast.success("URL shortened successfully!");
    } catch (error) {

      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
        setLoading(false);

    }

};

const fetchUrls = async () => {

    try {

        const res = await api.get("/urls");
        setUrls(res.data);
    } catch (error) {

        console.log(error);
    }

};
  useEffect(() => {
        fetchUrls();
    }, []);
  return (
    <>
      <div className="form-box">
        <input
          type="text"
          placeholder="Enter your long URL..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <button onClick={handleSubmit} disabled={loading}>
          {loading ? "Creating..." : "Shorten URL"}
        </button>
      </div>

      {shortUrl && <Result shortUrl={shortUrl} />}
      <History urls={urls} fetchUrls={fetchUrls} />
    </>
  );
}

export default UrlForm;