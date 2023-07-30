export default function sortCourses(a, b)
{
    let count1, count2;
    if(a.level === "A1")
     count1 = 1
    if(a.level === "A2")
     count1 = 2
    if(a.level === "B1")
     count1 = 3
    if(a.level === "B2")
      count1 = 4
    if(a.level === "C1")
      count1 = 5
    if(a.level === "C2")
      count1 = 6
    if(b.level === "A1")
     count2 = 1
    if(b.level === "A2")
     count2 = 2
    if(b.level === "B1")
     count2 = 3
    if(b.level === "B2")
      count2 = 4
    if(b.level === "C1")
      count2 = 5
    if(b.level === "C2")
      count2 = 6
    return count1 > count2 ? 1 : -1;
}