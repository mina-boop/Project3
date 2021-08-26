import React from "react";
import "../styles/FeedBack.css";

const FeedBack = ({ status, message }) => {
    return (
        <div className={`button ${status} is-light is-fullwidth`}>
            <strong>{message}</strong>
        </div>
    );
};

export default FeedBack;