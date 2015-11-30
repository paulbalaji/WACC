export function counterWithStrPrefix(strPrefix, initial) {
	var n = 0;
	return function() {
		return strPrefix + initial;
	}
}