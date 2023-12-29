import { useRef, useState } from "react";
import axios from "axios";
import { youtube_parser } from "./util";
function App() {
  const [urlResult, setURlResult] = useState(null);
  const inputUrlRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputUrlRef.current.value);

    const youtubeID = youtube_parser(inputUrlRef.current.value);
    console.log(youtubeID);
    const options = {
      method: "GET",
      url: "https://youtube-mp36.p.rapidapi.com/dl",
      params: { id: youtubeID },
      headers: {
        "X-RapidAPI-Key": "cbc0393b57msh7182336394b084fp1f0b9bjsn4d055ca31c2f",
        "X-RapidAPI-Host": "youtube-mp36.p.rapidapi.com",
      },
    };

    axios(options)
      .then((response) => setURlResult(response.data.link))
      .catch((error) => {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        console.log(error);
      });

    inputUrlRef.current.value = "";

    console.log(urlResult);
  };
  return (
    <>
      <div className="app">
        <span className="logo">youtubemp3</span>
        <section className="content">
          <h1 className="content_title">Youtube Link Mp3 Convertor</h1>
          <p className="content_description">
            Transform Youtube into mp3 in just few clicks
          </p>
          <form onSubmit={handleSubmit} className="form">
            <input
              ref={inputUrlRef}
              placeholder="Paste a YouTube URL... link"
              type="text"
              className="form_input"
            />
            <button type="submit" className="form_button">
              Search
            </button>
            {urlResult ? (
              <a
                href={urlResult}
                target="_blank"
                rel="noopener noreferrer"
                className="download_btn"
              >
                Download mp3
              </a>
            ) : null}
          </form>
        </section>
      </div>
    </>
  );
}

export default App;
