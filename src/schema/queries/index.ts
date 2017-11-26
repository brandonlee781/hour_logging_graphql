export const allLogs = async (root, data , { mongo: { Logs } }) => {
  return await Logs.find({}).toArray();
};