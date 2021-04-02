const mongoose = require('mongoose');

const dbConnection = async () => {
  const { USER_DB, PASS_DB, DATABASE } = process.env;
  const url = `mongodb+srv://${USER_DB}:${PASS_DB}@clustercourse.dpj3z.mongodb.net/${DATABASE}`;
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log('DB connection OK...');
  } catch (error) {
    console.log(error);
    throw new Error('DB connection ERROR...');
  }
};

module.exports = {
  dbConnection,
};
