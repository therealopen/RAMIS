const studentService = require('./studentService');

const getDataControllerFn = async (req, res) => {
  try {
    const students = await studentService.getData();
    res.send({ status: true, data: students });
  } catch (error) {
    console.log(error);
    res.send({ status: false, message: error.message });
  }
};

module.exports = getDataControllerFn;
