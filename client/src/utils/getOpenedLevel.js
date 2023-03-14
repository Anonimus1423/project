export default function getOpenedLevel(level) {
  let openedLevel = [level];
  console.log(openedLevel);
  if (level === "A2") {
    openedLevel = [...openedLevel, "A1"];
  }
  if (level === "B1") openedLevel = [...openedLevel, "A1", "A2"];
  if (level === "B2") openedLevel = [...openedLevel, "A1", "A2", "B1"];
  if (level === "C1") openedLevel = [...openedLevel, "A1", "A2", "B1", "B2"];
  if (level === "C2")
    openedLevel = [...openedLevel, "A1", "A2", "B1", "B2", "C2"];
  return openedLevel;
}
