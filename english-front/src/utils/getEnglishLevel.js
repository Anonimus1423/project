export default function getEnglishLevel(score){
    let yourLevel = null;
    const points = [0, 5, 10, 15, 20, 25]
    if(score >= points[0])
        yourLevel = "A1"
    if(score >= points[1])
        yourLevel = "A2"
    if(score >= points[2])
        yourLevel = "B1"
    if(score >= points[3])
        yourLevel = "B2"
    if(score >= points[4])
        yourLevel = "C1"
    if(score >= points[5])
        yourLevel = "C2"
    return yourLevel
}