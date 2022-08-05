import React, { useState, useEffect } from 'react';
import RacesContext from './RacesContext';
import { queryData, invokeData } from '../services/request';
import PropTypes from 'prop-types';

const RacesProvider = ({ children }) => {
  const [listCars, setListCars] = useState([]);
  const [updateData, setUpdateData] = useState(true);
  const [carId, setCarId] = useState('');
  const [carModel, setCarModel] = useState('');
  const [carDriver, setCarDriver] = useState('');
  const [listDrivers, setListDrivers] = useState([]);
  const [isShowMessage, setIsShowMessage] = useState(false);
  const [configMessage, setConfigMessage] = useState({});
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);
  const [isEditCar, setIsEditCar] = useState(false);
  const [isIconsDisabled, setIsIconsDisabled] = useState(false);

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

  useEffect(() => {
    if (updateData) {
      queryData('search', queryCar())
      .then((resultsCar) => {
        const dataCar = resultsCar.map((elem) => {
          const result = {
            'id': elem['id'],
            'model': elem['model'],
            'driver': '',
            'team': ' - ',
          };

          if (elem.driver["@key"].split(':')[0] === 'car') {
            result['driver'] = elem['model'];
          } else {
          queryData('search', queryDriver(
            elem.driver['@assetType'],
            elem.driver['@key']
          ))
            .then((resultsDriver) => {
              result['driver'] = resultsDriver[0].name;
              queryData('search', queryTeam(resultsDriver[0].team['@key']))
                .then((resultsTeam) => {
                  result['team'] = resultsTeam[0].name;
                }).catch((error) => {
                  console.error(error);
                  result['team'] = 'Not found'; 
                });
            }).catch((error) => {
              console.error(error);
              result['driver'] = 'Not found';
              result['team'] = 'Not found';
            });
          }
          return result;

        });
        setListCars(dataCar);
      }).catch((error) => {
        console.error(error);
        setListCars([]);
      });
      setUpdateData(false);
    }
  }, [updateData]);

  useEffect(() => {
    queryData('search', {
      "query": {
        "selector": {
          "@assetType": "driver",
        }
      }
    }).then((resultDrivers) => setListDrivers(resultDrivers));
  }, []);

  useEffect(() => {
    if (carId.length === 0 || carModel.length === 0 || carDriver.length === 0) {
      setIsBtnDisabled(true);
    } else {
      setIsBtnDisabled(false);
    }
  }, [carId, carModel, carDriver]);

  useEffect(() => {
    if (isShowMessage) {
      let timer = setInterval(() => {
        setIsShowMessage(false);
      }, 3000);
      return () => clearInterval(timer);
    }
  }, [isShowMessage]);

  const handleSubmitCar = () => {
    queryData('search', queryFindCar(Number(carId)))
      .then((resultsCar) => {
        if (resultsCar.length !== 0) {
          setConfigMessage({
            backgroundColor: 'red',
            severity: 'error',
            message: 'Código de veículo já cadastrado',
          });
          setIsShowMessage(true);
          return;
        }
        const newCar = {
          idCar: carId,
          model: carModel,
          idDriver: carDriver,
        };
        invokeData('createAsset', queryPostCar(newCar))
          .then((resultNewCar) => {
            setConfigMessage({
              backgroundColor: 'green',
              severity: 'success',
              message: 'Veículo incluído com sucesso!',
            });
            setIsShowMessage(true);
            setCarId('');
            setCarModel('');
            setCarDriver('');
            updateCarList();

          }).catch((error) => {
            console.error(error);
            setConfigMessage({
              backgroundColor: 'red',
              severity: 'error',
              message: 'Erro durante a inclusão do veículo.',
            });
            setIsShowMessage(true);
          })
      }).catch((error) => {
        console.error(error);
        setConfigMessage({
          backgroundColor: 'red',
          severity: 'error',
          message: 'Erro durante a pesquisa dos veículos.',
        });
        setIsShowMessage(true);
      });
  };

  const updateCarList = () => {
    setUpdateData(true);
  }

  const editCarRegister = (id) => {
    queryData('search', queryFindCar(Number(id)))
      .then((resultsCar) => {
        queryData('search', queryDriver(
          resultsCar[0].driver['@assetType'],
          resultsCar[0].driver['@key']
        ))
        .then((resultsDriver) => {
          setCarId(resultsCar[0].id);
          setCarModel(resultsCar[0].model);
          if (resultsDriver.length) {
            setCarDriver(resultsDriver[0]['id']);
          } else {
            setCarDriver(0);
          }
          setIsEditCar(true);
          setIsIconsDisabled(true);
        }).catch((error) => {
          console.error(error);
          setConfigMessage({
            backgroundColor: 'red',
            severity: 'error',
            message: 'Erro durante a busca do veículo.',
          });
          setIsShowMessage(true);
        })

      }).catch((error) => {
        console.error(error);
        setConfigMessage({
          backgroundColor: 'red',
          severity: 'error',
          message: 'Erro durante a pesquisa dos veículos.',
        });
        setIsShowMessage(true);
      });
  }

  const handleChangeCar = () => {
    queryData('search', queryFindCar(Number(carId)))
      .then((resultsCar) => {
        const currentCar = {
          idCar: Number(carId),
          model: carModel,
          idDriver: Number(carDriver),
        };
        invokeData('updateAsset', queryPutCar(currentCar))
          .then((resultNewCar) => {
            setConfigMessage({
              backgroundColor: 'warning',
              severity: 'success',
              message: 'Veículo alterado com sucesso!',
            });
            setIsShowMessage(true);
            setCarId('');
            setCarModel('');
            setCarDriver('');
            updateCarList();
            setIsEditCar(false);
            setIsIconsDisabled(false);

          }).catch((error) => {
            console.error(error);
            setConfigMessage({
              backgroundColor: 'red',
              severity: 'error',
              message: 'Erro durante a alteração do veículo.',
            });
            setIsShowMessage(true);
          })
      }).catch((error) => {
        console.error(error);
        setConfigMessage({
          backgroundColor: 'red',
          severity: 'error',
          message: 'Erro durante a pesquisa dos veículos.',
        });
        setIsShowMessage(true);
      });
  }

  const listRacesProvider = {
    listCars,
    setListCars,
    updateData,
    setUpdateData,
    carId,
    setCarId,
    carModel,
    setCarModel,
    carDriver,
    setCarDriver,
    listDrivers,
    isShowMessage,
    configMessage,
    isBtnDisabled,
    handleSubmitCar,
    editCarRegister,
    isEditCar,
    handleChangeCar,
    deleteCarRegister,
    isIconsDisabled,
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
