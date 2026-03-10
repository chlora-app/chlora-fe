import React, { useEffect } from "react";
import PropTypes from "prop-types";

const RootPageCustom = (props) => {
    useEffect(() => {
        if (props.setFirstRender != null) {
            props.setFirstRender(true)
        }
    }, [])

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
    setFirstRender: PropTypes.any,
};

export default RootPageCustom;