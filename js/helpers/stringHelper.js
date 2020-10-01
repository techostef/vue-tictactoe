export const trim = (number, precision) => {
    var array = number.toString().split(".");
    array.push(array.pop().substring(0, precision));
    return array.join(".");
}