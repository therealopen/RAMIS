const usersService = require('./usersService');

const getUsersDataControllerFn = async (req, res) => {
  try {
    const users = await usersService.getData();
    res.send({ status: true, data: users });
  } catch (error) {
    console.log(error);
    res.send({ status: false, message: error.message });
  }
};

module.exports = getUsersDataControllerFn;
