const db = require('../config/connection');

module.exports = async (Model) => {
  try {
    await Model.deleteMany({});
    console.log(`${Model.modelName} collection cleaned`);
  } catch (error) {
    throw error;
  }
};
