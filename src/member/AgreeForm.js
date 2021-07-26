import PropTypes from "prop-types";
import React, {Fragment, useState} from "react";
import { Link } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import LayoutOne from "../components/layouts/header/LayoutOne";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import useInputs from "../customHooks/useInputs";
import Agreement from "../data/AgreementForm.json"
import {ToastWarning} from "../modules/toastModule";


const AgreeForm = ({setAgreeBoxes,agreeBoxes}) => {

    const getAccept = (e) => {
        console.log(e.target.name);
        setAgreeBoxes({...agreeBoxes,[e.target.name]:!agreeBoxes[e.target.name]})

    };


    return (
        <Fragment>
            <div>
            </div>
            <div
                style={{height: "200px", overflowY: "scroll", border: "1px solid #c2c2c2"}}>
                {Agreement.agreeMentOne}
            </div>
            <div style={{textAlign: "right"}}>
                <label htmlFor="acceptOne">동의합니다</label>
                <input type="checkBox" id="acceptOne" style={{margin: "15px 0"}}
                       onChange={getAccept} name="acceptOne"
                       checked={agreeBoxes.acceptOne}/>
            </div>
            <div
                style={{height: "200px", overflowY: "scroll", border: "1px solid #c2c2c2"}}>
                {Agreement.agreeMentTwo}
            </div>
            <div style={{textAlign: "right"}}>
                <label htmlFor="acceptTwo">동의합니다</label>
                <input type="checkBox" id="acceptTwo" style={{margin: "15px 0"}}
                       onChange={getAccept} name="acceptTwo"
                       checked={agreeBoxes.acceptTwo}/>
            </div>
        </Fragment>
    );

};

AgreeForm.propTypes = {
    location: PropTypes.object
};

export default AgreeForm;
