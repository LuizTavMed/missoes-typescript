import "reflect-metadata"
import { DataSource } from "typeorm"

//importando entidades do banco

import Log from "../api/models/Log"
import User  from "../api/models/User"
import PoliceReport from "../api/models/PoliceReport"

export const dataSource = new DataSource({
    type: "mysql",
    database: "police-station",
    host: process.env.HOST_DATABASE,
    username: process.env.USER_DATABASE,
    password: process.env.PASSWORD_DATABASE,
    port: 3306,
    //sid: process.env.SSID_DATABASE,
    synchronize: true,
    logging: true,
    entities: [Log,User,PoliceReport],
    migrations: [],
    subscribers: [],
    })
