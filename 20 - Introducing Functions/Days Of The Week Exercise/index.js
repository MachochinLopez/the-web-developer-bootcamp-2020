// DEFINE YOUR FUNCTION BELOW:
function returnDay (number)
{
    let result = null;
    const daysOfTheWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    if (daysOfTheWeek[number - 1]) {
        result = daysOfTheWeek[number - 1];
    }

    return result;
}