export function counterWithStrPrefix(strPrefix, initial) {
	var n = initial;
	return function() {
		return strPrefix + (n++);
	}
}