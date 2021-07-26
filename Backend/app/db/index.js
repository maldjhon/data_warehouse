const {Sequelize} = require('sequelize');
const variables = require('../modules/config');

let host = variables.database.host;
let port = variables.database.port;
let dbName = variables.database.dbName;
let user = variables.database.user;
let password = variables.database.password;
let dialect = variables.database.dialect;

const sequelize = new Sequelize (dbName,user,password,{
    host:host,
    port: port,
    dialect:dialect
})

try{
    sequelize.authenticate();
    console.log("Conexión exitosa...");
}catch(err){
    console.log(err);
}

const Users = sequelize.define("users",{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: true,
        unique: true,
        allowNull: false
    },
    createdAt:{
        type:Sequelize.DATE,
        unique: false,
        allowNull: false
    },
    updatedAt:{
        type:Sequelize.DATE,
        unique: false,
        allowNull: false
    },
    name:{
        type:Sequelize.STRING,
        unique: false,
        allowNull: false
    },
    email:{
        type:Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    password:{
        type:Sequelize.STRING,
        unique: false,
        allowNull: false
    }
},{
    freezeTableName: true
})

const Postn = sequelize.define("postn",{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: true,
        unique: true,
        allowNull: false
    },
    createdAt:{
        type:Sequelize.DATE,
        unique: false,
        allowNull: false
    },
    updatedAt:{
        type:Sequelize.DATE,
        unique: false,
        allowNull: false
    },
    name:{
        type:Sequelize.STRING,
        unique: false,
        allowNull: false
    },
    description:{
        type:Sequelize.STRING,
        unique: false,
        allowNull: true
    }
},{
    freezeTableName: true
})

const Regions = sequelize.define("regions",{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: true,
        unique: true,
        allowNull: false
    },
    createdAt:{
        type:Sequelize.DATE,
        unique: false,
        allowNull: false
    },
    updatedAt:{
        type:Sequelize.DATE,
        unique: false,
        allowNull: false
    },
    name:{
        type:Sequelize.STRING,
        unique: false,
        allowNull: false
    }
},{
    freezeTableName: true
})

const Countries = sequelize.define("countries",{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: true,
        unique: true,
        allowNull: false
    },
    createdAt:{
        type:Sequelize.DATE,
        unique: false,
        allowNull: false
    },
    updatedAt:{
        type:Sequelize.DATE,
        unique: false,
        allowNull: false
    },
    name:{
        type:Sequelize.STRING,
        unique: false,
        allowNull: false
    }
},{
    freezeTableName: true
})

const Cities = sequelize.define("cities",{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: true,
        unique: true,
        allowNull: false
    },
    createdAt:{
        type:Sequelize.DATE,
        unique: false,
        allowNull: false
    },
    updatedAt:{
        type:Sequelize.DATE,
        unique: false,
        allowNull: false
    },
    name:{
        type:Sequelize.STRING,
        unique: false,
        allowNull: false
    }
},{
    freezeTableName: true
})

const Companies = sequelize.define("companies",{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: true,
        unique: true,
        allowNull: false
    },
    createdAt:{
        type:Sequelize.DATE,
        unique: false,
        allowNull: false
    },
    updatedAt:{
        type:Sequelize.DATE,
        unique: false,
        allowNull: false
    },
    name:{
        type:Sequelize.STRING,
        unique: false,
        allowNull: false
    },
    address:{
        type:Sequelize.STRING,
        unique: false,
        allowNull: false
    },
    email:{
        type:Sequelize.STRING,
        unique: false,
        allowNull: false
    },
    phone:{
        type:Sequelize.STRING,
        unique: false,
        allowNull: false
    }
},{
    freezeTableName: true
})

const Contacts = sequelize.define("contacts",{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: true,
        unique: true,
        allowNull: false
    },
    createdAt:{
        type:Sequelize.DATE,
        unique: false,
        allowNull: false
    },
    updatedAt:{
        type:Sequelize.DATE,
        unique: false,
        allowNull: false
    },
    fstName:{
        type:Sequelize.STRING,
        unique: false,
        allowNull: false
    },
    lstName:{
        type:Sequelize.STRING,
        unique: false,
        allowNull: false
    },
    ocupation:{
        type:Sequelize.STRING,
        unique: false,
        allowNull: false
    },
    address:{
        type:Sequelize.STRING,
        unique: false,
        allowNull: false
    },
    email:{
        type:Sequelize.STRING,
        unique: false,
        allowNull: false
    },
    interest:{
        type:Sequelize.INTEGER,
        unique: false,
        allowNull: true
    }
},{
    freezeTableName: true
})

const Channels = sequelize.define("channels",{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: true,
        unique: true,
        allowNull: false
    },
    createdAt:{
        type:Sequelize.DATE,
        unique: false,
        allowNull: false
    },
    updatedAt:{
        type:Sequelize.DATE,
        unique: false,
        allowNull: false
    },
    name:{
        type:Sequelize.STRING,
        unique: false,
        allowNull: false
    },
    accountUser:{
        type:Sequelize.STRING,
        unique: false,
        allowNull: false
    },
    preference:{
        type:Sequelize.STRING,
        unique: false,
        allowNull: false
    }
},{
    freezeTableName: true
})

const ContactsToChannels = sequelize.define("contactsTochannels",{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: true,
        unique: true,
        allowNull: false
    },
    createdAt:{
        type:Sequelize.DATE,
        unique: false,
        allowNull: false
    },
    updatedAt:{
        type:Sequelize.DATE,
        unique: false,
        allowNull: false
    }
},{
    freezeTableName: true
})

Users.belongsTo(Postn,{
    foreignKey:{
        name: "postnId",
        type:Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 2
    }
});

Countries.belongsTo(Regions,{
    foreignKey:{
        name: "regionId",
        type:Sequelize.INTEGER,
        allowNull: true
    }
});

Cities.belongsTo(Countries,{
    foreignKey:{
        name: "countryId",
        type:Sequelize.INTEGER,
        allowNull: true
    }
});

Companies.belongsTo(Regions,{
    foreignKey:{
        name: "regionId",
        type:Sequelize.INTEGER,
        allowNull: true
    }
});

Companies.belongsTo(Countries,{
    foreignKey:{
        name: "countryId",
        type:Sequelize.INTEGER,
        allowNull: true
    }
});

Companies.belongsTo(Cities,{
    foreignKey:{
        name: "cityId",
        type:Sequelize.INTEGER,
        allowNull: true
    }
});

Contacts.belongsToMany(Channels,{
    through: ContactsToChannels,
    foreignKey:{
        name: "contactId",
        type:Sequelize.INTEGER,
        allowNull: true
    }
});

Channels.belongsToMany(Contacts,{
    through: ContactsToChannels,
    foreignKey:{
        name: "channelId",
        type:Sequelize.INTEGER,
        allowNull: true
    }
});

Contacts.belongsTo(Regions,{
    foreignKey:{
        name: "regionId",
        type:Sequelize.INTEGER,
        allowNull: true
    }
});

Contacts.belongsTo(Countries,{
    foreignKey:{
        name: "countryId",
        type:Sequelize.INTEGER,
        allowNull: true
    }
});

Contacts.belongsTo(Cities,{
    foreignKey:{
        name: "cityId",
        type:Sequelize.INTEGER,
        allowNull: true
    }
});

Contacts.belongsTo(Companies,{
    foreignKey:{
        name: "companyId",
        type:Sequelize.INTEGER,
        allowNull: true
    }
});

sequelize.sync();

module.exports ={sequelize,Users,Postn,Regions,Countries,Cities,Companies,Contacts,Channels,ContactsToChannels}