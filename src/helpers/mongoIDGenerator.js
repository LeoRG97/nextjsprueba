/* eslint-disable no-bitwise */
export const generateMongoID = () => {
  // creador de IDs de mongo
  const timestamp = (new Date().getTime() / 1000 | 0).toString(16);
  return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, () => {
    return (Math.random() * 16 | 0).toString(16);
  }).toLowerCase();
};
