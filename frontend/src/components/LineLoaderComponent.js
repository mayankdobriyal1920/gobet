import React from "react";
import "./LineLoaderComponent.css";

const LineLoaderComponent = () => {
    return (
        <div className="line-loader-container">
            <div className="line-loader">
                <div className="line-loader-body">
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line short"></div>
                </div>
            </div>
        </div>
    );
};

export default LineLoaderComponent;
