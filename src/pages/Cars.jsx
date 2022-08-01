import React, { useState, useEffect } from 'react';
import { queryData } from '../services/request';

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
        setListCars(results);
      }).catch((error) => {
        console.error(error);
        setListCars([]);
      });
  }, []);


  return (
    <section>
      <div>Lista de Carros</div>
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
      }
    </section>
  )
}

export default Cars;