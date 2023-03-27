import { Request } from "express";

class UserValidator{
    isSalute(req: Request){
        if (req.body.mensagem === "bom dia"){
            return true
        }
        else{
            return false
        }
    }
}

export default UserValidator