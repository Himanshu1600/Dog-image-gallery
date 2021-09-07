import React, { useEffect, useState } from "react";
import "./Homepage.css";

function Homepage() {
  const [breed, setbreed] = useState([]);
  const [subbreed, setsubbreed] = useState([]);
  const [currentbreed, setcurrentbreed] = useState("affenpinscher");
  const [currentSubbreed, setcurrentSubbreed] = useState("");
  const [breedimg, setbreedimg] = useState([]);
  const [getimg, setgetimg] = useState(false);

  const handlebreed = (e) => {
    // console.log(e.target.value);
    setcurrentbreed(e.target.value);
  };

  const handlesubbreed = (e) => {
    setcurrentSubbreed(e.target.value);
    // console.log(currentSubbreed);
  };

  useEffect(() => {
    getbreedimageApi();
    getsubbreedApi();
    setgetimg(false);
  }, [currentbreed, currentSubbreed]);

  useEffect(() => {
    getbreedApi();
    getsubbreedApi();
  }, []);

  const getbreedApi = async () => {
    let data = await fetch("https://dog.ceo/api/breeds/list");
    let parsedata = await data.json();
    setbreed(parsedata.message);
    // console.log(breed);
  };

  const getsubbreedApi = async () => {
    let subdata = await fetch(`https://dog.ceo/api/breed/${currentbreed}/list`);
    let parsedata = await subdata.json();

    // console.log(parsedata.message);
    setsubbreed(parsedata.message);
  };
  const getbreedimageApi = async () => {
    let Url = currentSubbreed.length
      ? `https://dog.ceo/api/breed/${currentbreed}/${currentSubbreed}/images/random/20`
      : `https://dog.ceo/api/breed/${currentbreed}/images/random/15`;
    let subdata = await fetch(Url);
    let parsedata = await subdata.json();
    let newimg = Object.values(parsedata.message);
    // console.log(newimg);
    setbreedimg(newimg);
  };

  return (
    <div className="container">
      <h1>The Dog Image Gallery</h1>
      <div className="heading">
        <div className="select_list">
          <label>Choose breed -</label>
          <select id="dogs" name="breed" onChange={handlebreed}>
            {breed.map((element, index) => {
              return <option id={index}>{element}</option>;
            })}
          </select>
        </div>
        {subbreed.length ? (
          <div className="select_list">
            <label>Choose subbreed -</label>
            <select id="subdogs" name="subbreed" onChange={handlesubbreed}>
              <option> </option>
              {subbreed.map((element) => {
                return <option>{element}</option>;
              })}
            </select>
          </div>
        ) : null}

        <button className="btn" onClick={() => setgetimg(true)}>
          Get image
        </button>
      </div>

      <div className="img-container">
        {getimg &&
          breedimg.map((imglink) => {
            return <img src={imglink} alt="loading" className="img" />;
          })}
      </div>
    </div>
  );
}

export default Homepage;
