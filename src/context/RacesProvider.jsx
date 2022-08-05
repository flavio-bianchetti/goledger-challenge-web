import React, { useState, useEffect } from 'react';
import RacesContext from './RacesContext';
import { queryData, invokeData } from '../services/request';
import PropTypes from 'prop-types';

const RacesProvider = ({ children }) => {
  const listRacesProvider = {
  };

  return (
    <RacesContext.Provider value={ listRacesProvider }>
      {children}
    </RacesContext.Provider>
  );
};

RacesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RacesProvider;
