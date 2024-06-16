export function CreateTime(date:string){
    const time= new Date(date)
    const timeSlot=time.getHours() > 11 ? 'PM' : 'AM'
    return `${time.getHours()}:${time.getMinutes()} ${timeSlot}`
}