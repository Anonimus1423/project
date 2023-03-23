export default function getSecondLevel(level){
    let nextLevel = level;
    if(level === "A1" || level === null)
        nextLevel = "B1"
    if(level === "A2")
        nextLevel = "B2"
    if(level === "B1")
        nextLevel = "C1"
    if(level === "B2")
        nextLevel = "C2"
    if(level === "C1")
        nextLevel = "C2"
    return nextLevel
}