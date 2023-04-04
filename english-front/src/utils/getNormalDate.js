export default function getNormalDate(d){
    const date = new Date(d);
    const year = date.getFullYear();
    const month = date.getMonth() > 9 ? date.getMonth() : "0" + date.getMonth();
    const day = date.getDay() > 9 ? date.getDay() : "0" + date.getDay();
    return year + "." + month + "." + day;
}