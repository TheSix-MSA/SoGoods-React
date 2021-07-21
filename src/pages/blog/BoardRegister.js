import React from 'react';
import useInputs from "../../customHooks/useInputs";
import {useSelector} from "react-redux";

const BoardRegister = () => {
    const boardForm = useSelector(state => state.board.initialState)
    const [ board, setBoard, changeBoard ] = useInputs(boardForm);
    return (
        <div>

        </div>
    );
};

export default BoardRegister;