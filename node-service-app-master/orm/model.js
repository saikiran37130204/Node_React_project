const Sequelize = require('sequelize');
var sequelize=require('./connection');

var user=sequelize.define('user',{
    username:{
      type: Sequelize.STRING,
      primaryKey:true
    },
    password:{
      type: Sequelize.TEXT,
      allowNull:false
    },
    name:{
      type: Sequelize.TEXT,
      allowNull:false
    },
    role:{
      type: Sequelize.TEXT,
      allowNull:false
    },
    email:{
      type: Sequelize.TEXT,
      allowNull:false
    }
},{
      //don't add the timestamp attributes (updatedAt, createdAt)
  timestamps: false,

  // If don't want createdAt
  createdAt: false,

  // If don't want updatedAt
  updatedAt: false
} );

var employees = sequelize.define('employees',{
  employee_id:{
    type: Sequelize.INTEGER,
    allowNull:false
  },
  name:{
    type: Sequelize.TEXT,
    allowNull:false
  },
  status:{
    type: Sequelize.TEXT,
    allowNull:false
  },
  manager:{
    type: Sequelize.TEXT,
    allowNull:false
  },
  wfm_manager:{
    type: Sequelize.TEXT,
    allowNull:false
  },
  email:{
    type: Sequelize.TEXT,
    allowNull:false
  },
  lockstatus:{
    type: Sequelize.TEXT,
    allowNull:false
  },
  experience:{
    type: Sequelize.DECIMAL(5,0),
    allowNull:false
  },
  profile_id:{
    type: Sequelize.INTEGER,
    allowNull:false
  }
},{
  //don't add the timestamp attributes (updatedAt, createdAt)
timestamps: false,
// If don't want createdAt
createdAt: false,
// If don't want updatedAt
updatedAt: false
})

var softlock = sequelize.define('softlock',{
  employee_id:{
    type:Sequelize.INTEGER,
    allowNull:false
  },
  manager:{
    type:Sequelize.TEXT,
    allowNull:false
  },
  reqdate:{
    type:Sequelize.DATEONLY,
    allowNull:false
  },
  status:{
    type:Sequelize.TEXT,
    allowNull:false
  },
  lastupdated:{
    type:Sequelize.DATEONLY,
    allowNull:false
  },
  lockid:{
    type:Sequelize.INTEGER,
    primaryKey:true
  },
  requestmessage:{
    type: Sequelize.TEXT,
    allowNull:false
  },
  wfmremark:{
    type: Sequelize.TEXT,
    allowNull:true
  },
  managerstatus:{
    type:Sequelize.TEXT,
    allowNull:true
  },
  mgrstatuscomment:{
    type:Sequelize.TEXT,
    allowNull:true
  },
  mgrlastupdate:{
    type:Sequelize.DATEONLY,
    allowNull:true
  }
},{
  //don't add the timestamp attributes (updatedAt, createdAt)
timestamps: false,
// If don't want createdAt
createdAt: false,
// If don't want updatedAt
updatedAt: false
  })

user.sync({force: false}).then(() => {    
    console.log("User table Synched!!!");
});

employees.sync({force: false}).then(() => {    
    console.log("employees table Synched!!!");
});

softlock.sync({force: false}).then(() => {    

  console.log("Softlock table Synched!!!");
});


module.exports={user:user,employees:employees,softlock:softlock};