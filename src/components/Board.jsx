import "../styles.css";
import { useEffect, useState } from "react";
import calculateWinner from "./Game";

export default function Board() {
    const [state, setState] = useState(Array(9).fill(null));
    const [turn, setTurn] = useState(false);
    const [text, setText] = useState("");

    function click(id) {
        const nextArr = state.map((c, i) => {
            if (i === parseInt(id, 10)) {
                if (turn === true) {
                    return "X";
                } else {
                    return "O";
                }
            } else {
                return c;
            }
        });
        setTurn(!turn);
        setState(nextArr);
    }
    //-------------------runs for every state change--------------------------------------
    useEffect(() => {
        if (calculateWinner(state)) {
            setText(calculateWinner(state) + " won!");
        } else if (!state.includes(null)) {
            setText("Draw!");
        } else {
            setText(`Next player : ${turn ? "X" : "O"}`);
        }
    }, [state]);
    //-----------------For generating Square----------------------------------------
    const Square = (i) => {
        return (
            <button
                id={i}
                onClick={
                    calculateWinner(state) || state[i]
                        ? (e) => e.preventDefault()
                        : (e) => click(e.target.id)
                }
            >
                {state[i]}
            </button>
        );
    };

    return (
        <>
            <div className="Board">
                {Square(0)}
                {Square(1)}
                {Square(2)}
                {Square(3)}
                {Square(4)}
                {Square(5)}
                {Square(6)}
                {Square(7)}
                {Square(8)}
            </div>
            <h2>{text}</h2>
            {calculateWinner(state) || !state.includes(null) ? (
                <button
                    onClick={() => setState(Array(9).fill(null))}
                    className="restart-btn"
                >
                    Restart
                </button>
            ) : null}
        </>
    );
}
