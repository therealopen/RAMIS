const { response } = require('express');
const studentModel = require('./studentModel');

//get student data
module.exports.getData = () => {
  return studentModel.find({})
    .then(result => {
      return Promise.resolve(result);
    })
    .catch(error => {
      return Promise.reject(error);
    });
};



// createStudentDBService
module.exports.createStudentDBService = async (studentDetails, callback) => {
  try {
    const studentModel = require('./studentModel');
    const studentModelData = new studentModel();

    // Validate input fields
    if (!studentDetails.firstname || !studentDetails.lastname || !studentDetails.email || !studentDetails.password) {
      callback({ status: false, message: "Please Fill all Empty fields" });
      return;
    }

    // Set properties on the studentModelData object
    studentModelData.firstname = studentDetails.firstname;
    studentModelData.middlename = studentDetails.middlename;
    studentModelData.lastname = studentDetails.lastname;
    studentModelData.email = studentDetails.email;
    studentModelData.gender = studentDetails.gender;
    studentModelData.block = studentDetails.block;
    studentModelData.floor = studentDetails.floor;
    studentModelData.room = studentDetails.room;
    studentModelData.wing = studentDetails.wing;
    studentModelData.phone = studentDetails.phone;
    studentModelData.password = studentDetails.password;
    studentModelData.role = studentDetails.role;

    const result = await studentModelData.save();
    callback(null, true);
  } catch (error) {
    callback(error);
  }
};

// loginUserDBService
module.exports.loginUserDBService = (studentDetails) => {
  const studentModel = require('./studentModel');
  return new Promise((resolve, reject) => {
    studentModel.findOne({ email: studentDetails.email })
      .then((result) => {
        if (result !== undefined && result !== null) {
          var pwd = result.password;  
          var em=result.email;
          var r=result.role; 
               
          
          if (result.email===studentDetails.email && pwd===studentDetails.password) {
            resolve({ status: true, msg: r });
            console.log(r); 
            resolve({ status: true, msg: "Student Validated Successfully" });
            resolve.json.console(r);  
            resolve.json({role:r});

          }else{
            reject({ status: false, msg: "Incorrect Username or Password!" });
          }
        } else {
          //reject({ status: false, msg: "Invalid username or password" });
        } 
      })
      .catch((error) => {
        reject(error);
      });
  });
};

//delete student
module.exports.removeOneStudentDBService = (id) => {
  return studentModel.findByIdAndDelete(id)
    .then((result) => {
      return result;
    })
    .catch((error) => {
      throw error;
    });
};

//update student
module.exports.updateOneStudentDBService = (id,studentDetails) => {
  return studentModel.findByIdAndUpdate(id, studentDetails)
    .then((result) => {
      return result;
    })
    .catch((error) => {
      throw error;
    });
};
