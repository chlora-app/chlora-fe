import React, { useEffect } from "react";
import PropTypes from "prop-types";

const RootPageCustom = (props) => {
    return (
        <React.Fragment>
            <div>
                {props.children}
            </div>
        </React.Fragment>
    )
}

RootPageCustom.propTypes = {
    children: PropTypes.any,
};

export default RootPageCustom;