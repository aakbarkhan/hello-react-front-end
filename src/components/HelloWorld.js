import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';

const GET_THINGS_REQUEST = 'GET_THINGS_REQUEST';
export const GET_THINGS_SUCCESS = 'GET_THINGS_SUCCESS';

export function getThingsSuccess(json) {
  return {
    type: GET_THINGS_SUCCESS,
    json,
  };
}

function getThings() {
  return (dispatch) => {
    dispatch({ type: GET_THINGS_REQUEST });
    return fetch('http://localhost:3000/greetings')
      .then((response) => response.json())
      .then((json) => dispatch(getThingsSuccess(json)))
      .catch((error) => console.log(`Fetching Error ${error}`));
  };
}

function HelloWorld(props) {
  const { greetings, getThings } = props;
  const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
  return (
    <>
      Greeting:
      <p>{randomGreeting.name}</p>
      <br />
      <button
        type="button"
        className="getThingsBtn"
        onClick={() => getThings()}
      >
        Greet Me
      </button>
    </>
  );
}

const structuredSelector = createStructuredSelector({
  greetings: (state) => state.greetings,
});

const mapDispatchToProps = { getThings };
HelloWorld.propTypes = {
  greetings: PropTypes.arrayOf(PropTypes.any.isRequired).isRequired,
  getThings: PropTypes.func.isRequired,
};

export default connect(structuredSelector, mapDispatchToProps)(HelloWorld);
