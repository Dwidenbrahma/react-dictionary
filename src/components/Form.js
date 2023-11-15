import "./form.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import Loading from "./Loading";
import Display from "./Display";

function Form() {
  const [data, setData] = useState([]); //for setting value of api data
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchData();
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${inputValue}`
      );
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && <Loading />}

      {!loading && (
        <div>
          <div className="container-md mycontainer">
            <form>
              <div className="mb-3">
                <label htmfor="exampleInputEmail1" className="form-label">
                  [note: some words are not accessible or available]
                </label>
                <input
                  type="text"
                  placeholder="search a word"
                  onChange={handleChange}
                  value={inputValue}
                  className="form-control"
                />
              </div>
              <button
                onClick={handleSubmit}
                className="btn btn-outline-secondary">
                Find a Word
              </button>
            </form>
          </div>

          <div>
            {data && data.length > 0 && data[0] ? (
              <Display
                word={data[0]?.word}
                phonetic={
                  data[0]?.phonetic ||
                  data[0]?.phonetics[1]?.text ||
                  "no phonetics"
                }
                example1={
                  data[0]?.meanings[0]?.definitions[0]?.definition ||
                  "no example"
                }
                example2={
                  data[0]?.meanings[1]?.definitions[0]?.definition ||
                  "no example for verb"
                }
              />
            ) : (
              "No Data Found. Try searching for a different word or Search a word"
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Form;
