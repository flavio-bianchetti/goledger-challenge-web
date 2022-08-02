import React, { useState, useEffect } from 'react';
import { queryData } from '../services/request';
import Table from '../components/Table';

const Cars = () => {
  const [listCars, setListCars] = useState([]);

  useEffect(() => {
    const data = {
      "query": {
        "selector": {
          "@assetType": "car"
        }
      }
    };
    queryData('search', data)
      .then((results) => {
        const data = results.map((elem) => {
          return {
            '@key': elem['@key'],
            '@lastTouchBy': elem['@lastTouchBy'],
            '@lastTx': elem['@lastTx'],
            'driver.@key': elem.driver['@key'],
            '@id': elem['id'],
            'model': elem['model'],
          };
        });
        setListCars(data);
      }).catch((error) => {
        console.error(error);
        setListCars([]);
      });
  }, []);

  const header = [
    '@Key',
    '@lastTouchBy',
    '@lastTx',
    'driver.@key',
    'id',
    'model',
    'ação',
  ];

  const handleClickEdit = () => true;

  const handleClickDelete = () => true;

  return (
    <section>
      {/* <div>Lista de Carros</div>
      {
        listCars.map((car, index) => (
          <div
            key={ index }
          >
            <p>@key: <span>{ car['@key'] }</span> </p>
            <p>@lastTouchBy: <span>{ car['@lastTouchBy'] }</span> </p>
            <p>@lastTx: <span>{ car['@lastTx'] }</span> </p>
            <p>driver.@key: <span>{ car.driver['@key'] }</span> </p>
            <p>@id: <span>{ car['id'] }</span> </p>
            <p>model: <span>{ car['model'] }</span> </p>
          </div>
        ))
      } */}
      {
        Table({
          'title': 'Lista de Carros',
          'header': header,
          'data': listCars,
          'handleClickEdit': handleClickEdit,
          'handleClickDelete': handleClickDelete,
          'isIconsDisabled': false,
        })
      }
    </section>
  )
}

export default Cars;