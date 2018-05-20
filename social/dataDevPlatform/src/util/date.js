export default (value) => {
	var date = new Date(value);
	let dateYear = date.getFullYear();
	let dateMonth = date.getMonth();
	let dateDay = date.getDate();
	let dateHours = date.getHours();
	let dateMin = date.getUTCMinutes();
	let dateSec = date.getSeconds();
	return `${dateYear}-${dateMonth}-${dateDay} ${dateHours}:${dateMin}:${dateSec}`;
};
