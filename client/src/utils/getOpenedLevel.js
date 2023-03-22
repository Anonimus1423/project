export default function getOpenedLevel(level){
    let openedLevel = [level];
    if(level === "A2")
        openedLevel.push("A1")
    if(level === "B1")
        openedLevel.push("A1").push("A2")
    if(level === "B2")
        openedLevel.push("A1").push("A2").push("B1")
    if(level === "C1")
        openedLevel.push("A1").push("A2").push("B1").push("B2")
    if(level === "C2")
        openedLevel.push("A1").push("A2").push("B1").push("B2").push("C1")
    return openedLevel
}
