'use strict';

module.exports = function (years, months, weeks, days, hours, minutes, seconds) {
	let durationStr = '';

	// Handle regular stuff
	if (years > 0) durationStr += years === 1 ? 'one year ' : `${years} years `;
	if (months > 0) durationStr += months === 1 ? 'one month ' : `${months} months `;
	if (weeks > 0) durationStr += weeks === 1 ? 'one week ' : `${weeks} weeks `;
	if (days > 0) durationStr += days === 1 ? 'one day ' : `${days} days `;
	if (hours > 0) durationStr += hours === 1 ? 'one hour ' : `${hours} hours `;
	if (minutes > 0) durationStr += minutes === 1 ? 'one minute ' : `${minutes} minutes `;
	if (seconds > 0) durationStr += seconds === 1 ? 'one second ' : `${seconds} seconds `;

	// Handle edge case that all inputs are 0 or undefined
	if (durationStr.length === 0) durationStr = 'Just now';
	else {
		// Handle the last "and"
		const split = durationStr.split(' ');
		if (split.length > 3) durationStr = `${split.slice(0, -3).join(' ')} and ${split.slice(-3).join(' ')}`;
		// Add the "ago" without a whitespace because that is already there
		durationStr = `${durationStr}ago`;
		// Fix first letter capitalized if it is an "o"
		if (durationStr.charAt(0) === 'o') durationStr = `O${durationStr.substr(1)}`;
	}

	return durationStr;
};
