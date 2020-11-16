// DEFINE YOUR FUNCTION BELOW:
function capitalize (str)
{
    let firstLetter = str[0].toUpperCase();
    let restOfTheString = str.slice(1, str.length);

    return firstLetter + restOfTheString;
}