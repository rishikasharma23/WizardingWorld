import { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';

const Card = () => {
  // state to store the elixir data fetched from the API
  const [elixir, setElixir] = useState();
  // state to store the elixirs by the same inventor
  const [elixirsByInventor, setElixirsByInventor] = useState([]);
  // useParams is a hook to access the dynamic parts of the URL
  const { id } = useParams();

  // useEffect hook is used to fetch the elixir data when the id changes
  useEffect(() => {
    fetch(`https://wizard-world-api.herokuapp.com/elixirs/${id}`)
      .then(response => response.json())
      .then(data => {
        setElixir(data);
        const inventorId = data.inventors.map((i) => i.id);

        // fetching all elixirs from the API
        fetch(`https://wizard-world-api.herokuapp.com/elixirs`)
          .then(response => response.json())
          .then(allElixirs => {
            // filter out the elixirs by the same inventor
            const sameAuthorElixirs = allElixirs.filter(elixir => elixir.id !== id && elixir.inventors.some(i => inventorId.includes(i.id)));
            setElixirsByInventor(sameAuthorElixirs);
          })
          .catch(error => console.error('Error:', error));
      })
      .catch(error => console.error('Error:', error));
  }, [id]); // re-run the hook when the id changes

  // if elixir data is not available, return null and stop the rendering process
  if (!elixir) {
    return null;
  }

  return (
    <div className="ms-3 me-3 mt-2">
      <div className="card mb-4">
        <div className="card-body d-flex flex-column">
          <h1 className="card-title">{elixir.name}</h1>
          <br />
          {/* rendering the elixir details */}
          {elixir.effect && <p><b>Effect: </b> {elixir.effect}</p>}
          {elixir.sideEffects && <p><b>Side Effects: </b>{elixir.sideEffects}</p>}
          {elixir.characteristics && <p><b>Characteristics: </b>{elixir.characteristics}</p>}
          {elixir.time && <p><b>Time needed: </b>{elixir.time}</p>}
          {elixir.difficulty && <p><b>Difficulty: </b>{elixir.difficulty}</p>}
          {elixir.ingredients && elixir.ingredients.length > 0 && (
            <p><b>Ingredients: </b>{elixir.ingredients.map(ing => ing.name).join(', ')}</p>
          )}
          {elixir.inventors && elixir.inventors.length > 0 && (
            <p><b>Inventor(s): </b>{elixir.inventors
              .map(inv => (inv.firstName ? inv.firstName : "") + " " + (inv.lastName ? inv.lastName : ""))
              .filter(name => name.trim() !== "")
              .join(', ')
            }</p>
          )}
        </div>
      </div>
      {/* if there are elixirs by the same inventor, render them */}
      {elixirsByInventor.length > 0 &&
        <div className="ml-4">
          <h4 className="ms-3">Elixirs by the same Author(s):</h4>
          <div className="d-flex flex-row flex-wrap">
            <div className="container-fluid">
              <div className="row d-flex align-items-stretch">
                {/* map over the elixirsByInventor state and render each elixir */}
                {elixirsByInventor.map((elixirsByInventor) => (
                  <div className="col-sm-6 col-md-4 col-lg-3 mb-2 d-flex">
                    <div className="card flex-fill">
                      <div className="card-body d-flex flex-column">
                        <h5 className="card-title">{elixirsByInventor.name}</h5>
                        <p className="card-text">Inventors: {elixirsByInventor.inventors
                          .map(inv => (inv.firstName ? inv.firstName : "") + " " + (inv.lastName ? inv.lastName : ""))
                          .filter(name => name.trim() !== "")
                          .join(', ')
                        }</p>
                        <div className="mt-auto">
                          <Link to={`/${elixirsByInventor.id}`} className="btn btn-dark mx-auto">Show Details</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  );

};

export default Card;
