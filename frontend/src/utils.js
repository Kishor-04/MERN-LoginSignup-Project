import { toast } from "react-toastify";

export const handelSuccess = (msg) =>{
    toast.success(msg,{
        postion:'top-right'
    })
}

export const handelError = (msg) =>{
    toast.error(msg,{
        postion:'top-right'
    })
}