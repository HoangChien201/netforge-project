export function GetTimeComment(date){
    let time=(new Date()-new Date(date))/1000 //đổi từ milisecond sang second
    let timeUnit='s'

    if(time>59){//trường hợp số giây lớn hơn 59
        time=(new Date()-new Date(date))/1000/60 //đổi từ second sang minute
        timeUnit='m'
    }
    if(time>59){//trường hợp số phút lớn hơn 59
        time=(new Date()-new Date(date))/1000/60/60 //đổi từ minute sang hour
        timeUnit='h'
    }
    if(time>24){//trường hợp số giờ lớn hơn 59
        time=(new Date()-new Date(date))/1000/60/60/24 //đổi từ hour sang day
        timeUnit='d'
    }
    return (Math.floor(time) + timeUnit).toString()
}

export function GetTimeSecond(date){
    let time=(new Date()-new Date(date))/1000 //đổi từ milisecond sang second
    return Math.floor(time).toString()
}

export function FormatDate(date_param:Date){
    const setDate=new Date(date_param)
    const date=setDate.getDate() > 9 ? setDate.getDate() : '0'+setDate.getDate()
    const month=setDate.getMonth() > 9 ? setDate.getMonth() : '0'+setDate.getMonth()
    const year=setDate.getFullYear() > 9 ? setDate.getFullYear() : '0'+setDate.getFullYear()

    return `${date}-${month}-${year}`
}

export function FormatTime(date:Date){
    const setDate=new Date(date)
    const minute=setDate.getMinutes() > 9 ? setDate.getMinutes() : setDate.getMinutes()+'0'
    const hour=setDate.getHours() > 9 ? setDate.getHours() : '0'+setDate.getHours()

    return `${hour}:${minute}`
}