export default function getNextLevel(level){
    let nextLevel = level;
    if(level === "A1")
        nextLevel = "A2"
    if(level === "A2")
        nextLevel = "B1"
    if(level === "B1")
        nextLevel = "B2"
    if(level === "B2")
        nextLevel = "C1"
    if(level === "C1")
        nextLevel = "C2"
    return nextLevel
}