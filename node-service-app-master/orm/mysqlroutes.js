const model= require('../orm/model')

const route= require("express").Router();



const {QueryTypes} = require('sequelize');



const sequelize = require('./connection');

const employees = model.employees;
const softlock=model.softlock;



route.post("/employees",async function(request,response){

    try{

        let loginname = request.body.username;

        await sequelize.query('select e.employee_id as EmployeeID,e.name as Name,group_concat(s.name) as Skills,e.lockstatus as Status,e.experience as Experince, e.manager as Manager,p.name as Profile from employee e join skillmap sk on e.employee_id=sk.employee_id join skills s on sk.skillid=s.skillid join profile p on p.profile_id = e.profile_id where e.manager like :managername and e.lockstatus="not_requested" group by e.employee_id;',

        {replacements: {managername: loginname},model:employees,mapToModel: true,type:sequelize.QueryTypes.SELECT}

        ).then(function(employees){

            response.status(200).json(employees)

        })

    }

    catch(e){

        console.log(e)

        response.status(500);

    }

})

route.put("/updateemployees",async function(request,response){
    try{
        let employeeid = request.body.employeeid;
        await sequelize.query("update employee set lockstatus='request_waiting' where employee_id=:employeeid;",
        {replacements: {employeeid: employeeid},model:employees,mapToModel: true,type:sequelize.QueryTypes.UPDATE}
        ).then(function(employees){
            response.status(200).send("record updated");
        })
    }
    catch(e){
        console.log(e)
        response.status(500)
    }
})


route.post("/insertsoftlock",async function(request,response){

    try{

        let employeeid = request.body.employeeid;

        let manager = request.body.manager;

        let responsemessage = request.body.responsemessage;

        await sequelize.query("insert into softlock (employee_id,manager,reqdate,status,requestmessage) values(?,?,CurDate(),'waiting',?)",

        {replacements: [employeeid,manager,responsemessage],model:softlock,mapToModel: true,type:sequelize.QueryTypes.INSERT}

        ).then(function(){

            response.status(200).send("record inserted");

        })

    }

    catch(e){

        console.log(e)

        response.status(500);

    }
})

module.exports = route;