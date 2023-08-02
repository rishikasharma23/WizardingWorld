import { Link } from "react-router-dom";
import { useState } from "react";

const CardList = ({ dataList }) => {
    // state to store the selected difficulty level
    const [difficulty, setDifficulty] = useState("All");
    // filter the dataList to get the cards that have at least one inventor
    const cards = dataList.filter((card) => card.inventors && card.inventors.length > 0);
    // filter the cards to get those matching the selected difficulty level
    const filteredListOfCards = cards.filter((cards) => cards.difficulty === difficulty);
    // finalCards holds either all cards or cards of a specific difficulty level, based on the selected difficulty
    const finalCards = difficulty == 'All' ? cards : filteredListOfCards;

    // map over the finalCards to render each card
    const listOfCards = finalCards.map((card) =>
        <div key={card.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
            <div className="card h-100">
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{card.name}</h5>
                    <p className="card-text">Inventor(s): {card.inventors
                        .map(inv => (inv.firstName ? inv.firstName : "") + " " + (inv.lastName ? inv.lastName : ""))
                        .filter(name => name.trim() !== "")
                        .join(', ')
                    }</p>
                    <div className="mt-auto">
                        <Link to={`/${card.id}`} className="btn btn-dark mx-auto">Show Details</Link>
                    </div>
                </div>
            </div>
        </div>
    );

    // get the unique difficulty levels from the cards
    const levelTemp = cards.map((i) => i.difficulty);
    const levels = Array.from(new Set(levelTemp)).sort();

    // function to handle difficulty level selection
    const handleChange = (value) => {
        setDifficulty(value);
    }

    return (
        <div className="d-flex justify-content-center">
            <div className="container">
                <h1 className="text-center"> Wizarding World!!!</h1>
                <div className="d-flex align-items-center mb-3">
                    <h6 className="me-2">Filter By Difficulty:</h6>
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            {difficulty}
                        </button>
                        <ul className="dropdown-menu" >
                            <li onClick={() => handleChange("All")}><a className="dropdown-item">All</a></li>
                            {levels.map((level) => <li key={level} onClick={() => handleChange(level)}><a className="dropdown-item">{level}</a></li>)}
                        </ul>
                    </div>
                </div>
                <div className="row">
                    {listOfCards}
                </div>
            </div>
        </div>
    );
};

export default CardList;
