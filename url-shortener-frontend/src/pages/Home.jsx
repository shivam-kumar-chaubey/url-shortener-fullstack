import UrlForm from "../components/UrlForm";

function Home() {
  return (
    <div className="container">

      <h1>🔗 URL Shortener</h1>

      <p>
        Paste your long URL and generate a short,
        shareable link instantly.
      </p>

      <UrlForm />

    </div>
  );
}

export default Home;