const validate_date = (d) =>{
	let a = new Date(d);
	let year = a.getFullYear();
	let month = a.getMonth();
	let day = a.getDate();
	let hours = a.getHours() +1;
	let minutes = a.getMinutes();
	let seconds = a.getSeconds();
	let aa = new Date(year, month, day, hours, minutes, seconds);

	return aa
}

module.exports = validate_date;