const { response } = require('express');
const usersModel = require('./usersModel');

//get users data
module.exports.getData = () => {
  return usersModel.find({})
    .then(result => {
      return Promise.resolve(result);
    })
    .catch(error => {
      return Promise.reject(error);
    });
};



// createusersDBService
module.exports.createUsersDBService = async (usersDetails, callback) => {
  try {
    const usersModel = require('./usersModel');
    const usersModelData = new usersModel();

    // Validate input fields
    if (!usersDetails.firstname || !usersDetails.lastname || !usersDetails.email || !usersDetails.password) {
      callback({ status: false, message: "Please Fill all Empty fields" });
      return;
    }

    // Set properties on the usersModelData object
    usersModelData.firstname = usersDetails.firstname;
    usersModelData.middlename = usersDetails.middlename;
    usersModelData.lastname = usersDetails.lastname;
    usersModelData.email = usersDetails.email;
    usersModelData.gender = usersDetails.gender;
    usersModelData.phone = usersDetails.phone;
    usersModelData.password = usersDetails.password;
    usersModelData.role = usersDetails.role;

    const result = await usersModelData.save();
    callback(null, true);
  } catch (error) {
    callback(error);
  }
};

// loginUserDBService
module.exports.loginUsersDBService = (usersDetails) => {
  const usersModel = require('./usersModel');
  return new Promise((resolve, reject) => {
    usersModel.findOne({ email: usersDetails.email,password: usersDetails.password })
      .then((result) => {
        if (result !== undefined && result !== null) {
          var pwd = result.password;  
          var em=result.email;
          var r=result.role; 
               
          if (em===usersDetails.email && pwd===usersDetails.password) {
            resolve({ status: true, msg: r });
            console.log(r); 
            resolve({ status: true, msg: "users Validated Successfully" });
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

//delete users
module.exports.removeOneusersDBService = (id) => {
  return usersModel.findByIdAndDelete(id)
    .then((result) => {
      return result;
    })
    .catch((error) => {
      throw error;
    });
};

//update users
module.exports.updateOneusersDBService = (id,usersDetails) => {
  return usersModel.findByIdAndUpdate(id, usersDetails)
    .then((result) => {
      return result;
    })
    .catch((error) => {
      throw error;
    });
};
