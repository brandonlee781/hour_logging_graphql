export const createLog = async (root, data, { mongo: { Logs } }) => {
  const response = await Logs.insert(data);
  return Object.assign({ id: response.insertedIds[0] }, data);
};