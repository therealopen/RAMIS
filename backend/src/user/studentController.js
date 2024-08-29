const studentModel = require('./studentModel');
const studentService = require('./studentService');

const createStudentControllerFn = async (req, res) => {
  try {
    const body = req.body;
    const studentModelData = new studentModel();
    studentModelData.firstname = body.firstname;
    studentModelData.middlename = body.middlename;
    studentModelData.lastname = body.lastname;
    studentModelData.email = body.email;
    studentModelData.gender = body.gender;
    studentModelData.block = body.block;
    studentModelData.floor = body.floor;
    studentModelData.room = body.room;
    studentModelData.wing = body.wing;
    studentModelData.phone = body.phone;
    studentModelData.password = body.password;
    studentModelData.role = body.role;
    
    await studentService.createStudentDBService(studentModelData, (error, result) => {
      if (error) {
        res.send({ "status": false, "message": "Make sure you submit valid data empty field not allowed" });
      } else {
        res.send({"status": true, "message": "User addesd successfully"});
      }
    });
  } catch (error) {
    console.log(error);
    res.send({ "status": false, "message": error.msg });
  }
};

const loginUserControllerFn = async (req, res) => {
    try {
      const result = await studentService.loginUserDBService(req.body);
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
  
var getDataControllerFn = async (req, res) => {
    var student = await studentService.getData();
    res.send({"status":true, "data":student});
}


//delete student here
var deleteStudentControllerFn = async(req, res) => 
{
  console.log(req.params.id);
  var result=await studentService.removeOneStudentDBService(req.params.id);
  if(result){
    res.send({"status": true,"message":"Student deleted successfully"});

  }
  else{
    res.send({"status": true,"message":"Student deleted Failed"});

  }
}

//edit and update student here
var updateStudentControllerFn = async(req, res)=>
{
  console.log(req.params.id);
  console.log(req.body);
  var result=await studentService.updateOneStudentDBService(req.params.id, req.body);

  if(result){
    res.send({"status": true,"message":"Data Updated successfully"});

  }
  else{
    res.send({"status": true,"message":"Data Updated Failed"});

  }
}


module.exports = { createStudentControllerFn, loginUserControllerFn, getDataControllerFn, deleteStudentControllerFn, updateStudentControllerFn };
