import { Request } from "express";

class LogValidator{
    messageIsEmpty(req: Request){
        if (req.body.message == null){
            return true
        }
        else{
            return false
        }
    }

    dateIsEmpty(req: Request){
        if (req.body.message == null){
            return true
        }
        else{
            return false
        }
    }
}

export default LogValidator