const usersModel = require('./usersModel');
const usersService = require('./usersService');

const createUsersControllerFn = async (req, res) => {
  try {
    const body = req.body;
    const usersModelData = new usersModel();
    usersModelData.firstname = body.firstname;
    usersModelData.middlename = body.middlename;
    usersModelData.lastname = body.lastname;
    usersModelData.email = body.email;
    usersModelData.gender = body.gender;
    usersModelData.phone = body.phone;
    usersModelData.password = body.password;
    usersModelData.role = body.role;
    []
    await usersService.createUsersDBService(usersModelData, (error, result) => {
      if (error) {
        res.send({ "status": false, "message": "Make sure you submit valid data empty field not allowed" });
      } else {
        res.send({"status": true, "message": "User added successfully"});
      }
    });
  } catch (error) {
    console.log(error);
    res.send({ "status": false, "message": error.msg });
  }
};

const loginUsersControllerFn = async (req, res) => {
    try {
      const result = await usersService.loginUsersDBService(req.body);
      if (result.status) {
        res.send({ "status": true, "message": result.msg });
      } else {
        res.send({ "status": false, "message": result.msg });
      }
    } catch (error) {
      console.log(error);
      res.send({ "status": false, "message": error.msg });
    }
  };
  
var getUsersDataControllerFn = async (req, res) => {
    var users = await usersService.getData();
    res.send({"status":true, "data":users});
}


//delete users here
var deleteUsersControllerFn = async(req, res) => 
{
  console.log(req.params.id);
  var result=await usersService.removeOneUsersDBService(req.params.id);
  if(result){
    res.send({"status": true,"message":"user deleted successfully"});

  }
  else{
    res.send({"status": true,"message":"user deleted Failed"});

  }
}

//edit and update user here
var updateUsersControllerFn = async(req, res)=>
{
  console.log(req.params.email);
  console.log(req.body);
  var result=await usersService.updateOneUsersDBService(req.params.email, req.body);

  if(result){
    res.send({"status": true,"message":"Data Updated successfully"});

  }
  else{
    res.send({"status": true,"message":"Data Updated Failed"});

  }
}


module.exports = { createUsersControllerFn,updateUsersControllerFn,deleteUsersControllerFn, loginUsersControllerFn, getUsersDataControllerFn, deleteUsersControllerFn, updateUsersControllerFn };
