let date = new Date();
let date1 = new Date('10-09-1996');
let d = date.toJSON();
let x = date.toDateString('DD/MM/YYYY');
let y = date.toLocaleDateString('en-us', {day:"numeric", month:"numeric", year:"numeric"});

// toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})

console.log(d, 'json date');
console.log(typeof d);
console.log()
console.log(Date(x) , '------------');
console.log(x);
console.log(y,'-----------y date');
// console.log(date);
// console.log(typeof date);
console.log(typeof x);
console.log(typeof y,'-----------y date');
// console.log(date1.toDateString('dd-mm-yyyy'));
// console.log(typeof date1);
// let dates = [date, date1]
// console.log(dates.sort());    