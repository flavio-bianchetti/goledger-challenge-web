import React, { useState, useEffect } from 'react';
import { queryData } from '../services/request';
import Table from '../components/Table';

const Cars = () => {
  const [listCars, setListCars] = useState([]);

  const queryCar = () => ({
    "query": {
      "selector": {
        "@assetType": "car"
      }
    }
  });

  const queryDriver = (keyDriver) => ({
    "query": {
      "selector": {
        "@assetType": "driver",
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

  useEffect(() => {
    queryData('search', queryCar())
      .then((resultsCar) => {
        const dataCar = resultsCar.map((elem) => {
          const result = {
            '@key': elem['@key'],
            'id': elem['id'],
            'model': elem['model'],
            'driver': '',
            'team': ' - ',
          };

          if (elem.driver["@key"].split(':')[0] === 'car') {
            result['driver'] = elem['model'];
          } else {
          queryData('search', queryDriver(elem.driver['@key']))
            .then((resultsDriver) =>{
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
  }, []);

  const headers = [
    '@Key',
    'id',
    'model',
    'driver',
    'team',
    'ações',
  ];

  const handleClickEdit = () => true;

  const handleClickDelete = () => true;

  return (
    <section>
      <Table
        title={ 'Lista de Carros' }
        header={ headers }
        data={ listCars }
        handleClickEdit={ handleClickEdit }
        handleClickDelete={ handleClickDelete }
        isIconsDisabled={ false }
      />
    </section>
  )
}

export default Cars;
