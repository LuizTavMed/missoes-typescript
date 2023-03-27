import { pegaDataAgora } from "../../helpers/pegaDataAgora"

import {Request} from "express"

import Log from "../models/Log"

import { dataSource } from "../../db/dataSource"
const repositorioLog = dataSource.getRepository(Log)

export class LogService{

    async postaLog(req: Request): Promise<Log>{
        var log = new Log()
        log.date= pegaDataAgora()
        log.event = req.body.evento
        await repositorioLog.save(log)
        return log
    }
    
    async pegaTodosLogs(): Promise<Log[] | null> {
        const listaTodosLogs = await repositorioLog.find()
        return listaTodosLogs
    }

    async pegaLogPorId(req: Request): Promise<Log | null>{
        const log = await repositorioLog.findBy({
            id: parseInt(req.params.id)
        })
        return log[0]
    }
    
    async atualizaLogPorId(req: Request): Promise<Log[] | Log>{
        var log = await repositorioLog.findBy({
            id: parseInt(req.params.id)
        })
        if(log[0] === undefined){
            return log[0]
        }
        if (req.body.evento != undefined){
            log[0].event = req.body.evento
        }
        if (req.body.data != undefined){
            log[0].date = req.body.date
        }
        repositorioLog.save(log[0])
        return log[0]
    }

    async deletaLogPorId(req: Request): Promise<Log | Log>{
        const log = await repositorioLog.findBy({
            id: parseInt(req.params.id)
        })
        if (log[0] === undefined){
            return log[0]
        }
        else{
            repositorioLog.remove(log[0])
            return log[0]
        }
        
    }
}