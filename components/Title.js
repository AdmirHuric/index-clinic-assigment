import React from "react";
import PropTypes from "prop-types";

const Title = ({title}) => (
  <div className="container-fluid text-center py-5">
    <h1 className="display-4">{title}</h1>
  </div>
);

Title.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Title;
