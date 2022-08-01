const axios = require('axios');

const invoke = axios.create({
  baseURL: `${process.env.REACT_APP_HOSTNAME || 'http://localhost:3001'}/invoke`,
});

const query = axios.create({
  baseURL: `${process.env.REACT_APP_HOSTNAME || 'http://localhost:3001'}/query`,
});

const invokeData = async (txName, body) => {
  const { data } = await invoke.post(txName, body);
  const { result } = data
  return result;
};

const queryData = async (txName, body) => {
  const { data } = await query.post(txName, body);
  const { result } = data;
  return result;
};

export {
  invokeData,
  queryData,
};
