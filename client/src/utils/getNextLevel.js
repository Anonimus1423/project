export default function getNextLevel(level){
    let nextLevel = level;
    if(level === "A1" || level === null)
        nextLevel = "A2"
    if(level === "A2")
        nextLevel = "B1"
    if(level === "B1")
        nextLevel = "B2"
    if(level === "B2")
        nextLevel = "C1"
    if(level === "C1")
        nextLevel = "C2"
    if(level === "C2")
    {
        nextLevel = "C2"
    }
    console.log(nextLevel);
    return nextLevel
}