import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
function App() {
  const URL =
    "https://api.giphy.com/v1/gifs/search?api_key=SpyhZWWpbxTw8X8rGCs4WGth3QibLXaA&q=";
  const [search, setSearch] = useState("hello"); //este va a guardar el valor a buscar de los gifs
  const [gifs, setGifs] = useState([]); // va a guardar los gifs de la api
  useEffect(() => {
    console.log("Desde useEffect");
    axios
      .get(URL + search)
      .then((response) => {
        setGifs(response.data.data); //Primer data es de axios y el segundo data es de respuesta de giphy
      })
      .catch((error) => {
        console.log(error);
      });
  }, [search]);
  const findGif = (event) => {
    event.preventDefault(); // Evita que recargue la pagina al momento de hacer submit al form
    //Llamada a la API
    axios
      .get(URL + search)
      .then((response) => {
        setGifs(response.data.data); //Primer data es de axios y el segundo data es de respuesta de giphy
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="App">
      <h2>Giphy App</h2>
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-12 col-sm8 col-md-8 col-lg-8">
            <form
              onSubmit={findGif}
              className="form-inline justify-content-center"
            >
              <input
                className="form-control"
                onChange={(event) => setSearch(event.target.value)}
                placeholder={`Ejemplo ${search}`}
                name="gif"
              />
              <button type="submit" className="btn btn-success">
                Buscar
              </button>
            </form>
          </div>
        </div>
        <div className="row mt-5">
          { gifs.length > 0 ? gifs.map((gif) => {
            return (
              <div className="col-12 col-sm-12 col-md-4 col-lg-4 card-deck my-5">
                <div className="card bg-dark text-white">
                  <img
                    className="card-img"
                    alt=""
                    src={gif.images.downsized_large.url}
                  />
                  <h5 className="card-title">{gif.title}</h5>
                </div>
              </div>
            );
          }) : (
            <div className="col-12">
              <h1>No hay resultados en tu busqueda😢 </h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default App;
