
import { useState, useEffect } from "react";
import CardList from "./Components/CardList";
import Card from "./Components/Card";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {

  // state to store fetched data
  const [data, setData] = useState([]);

  // useEffect hook runs at the initial render
  // it fetches the data from the API and stores it in the state
  useEffect(() => {
    fetch('https://wizard-world-api.herokuapp.com/elixirs')
      .then(response => response.json()) 
      .then(data => setData(data)) 
      .catch(error => console.error('Error:', error)); 
  }, []); 

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CardList dataList={data} />} /> 
        <Route path="/:id" element={<Card />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
