import React, { useState, useEffect } from 'react';
import RacesContext from './RacesContext';
import { queryData, invokeData } from '../services/request';
import PropTypes from 'prop-types';

const RacesProvider = ({ children }) => {

  const queryCar = () => ({
    "query": {
      "selector": {
        "@assetType": "car"
      }
    }
  });

  const queryDriver = (asset, keyDriver) => ({
    "query": {
      "selector": {
        "@assetType": asset,
        "@key": keyDriver,
      }
    }
  });

  const queryTeam = (keyTeam) => ({
    "query": {
      "selector": {
        "@assetType": "team",
        "@key": keyTeam,
      }
    }
  });

  const queryFindCar = (id) => {
    return {
      "query": {
        "selector": {
          "@assetType": "car",
          "id": id
        }
      }
    };
  };

  const queryPostCar = ({ idCar, model, idDriver }) => {
    return {
      "asset": [
        {
          "@assetType": "car",
          "id": idCar,
          "model": model,
          "driver": {
            "@assetType": "driver",
            "id": idDriver
          }
        }
      ]
    };
  };

  const queryPutCar = ({ idCar, model, idDriver }) => {
    return {
      "update": {
        "@assetType": "car",
        "id": idCar,
        "model": model,
        "driver": {
          "@assetType": "driver",
          "id": idDriver
        }
      }
    };
  };

  const queryDelete = (asset, id) => {
    return {
      "key": {
        "@assetType": asset,
        "id": id
      }
    };
  }
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
