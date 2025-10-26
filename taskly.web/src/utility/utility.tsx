import type { Order } from "../types/types";

// sort(a, b) ->
// 1 means sort a after b
// 0 means keep order of a and b
// -1 means sort a before b
export function compareBoolean(a: boolean, b: boolean, order: Order) {
	const sortDirection = order === "asc" ? 1 : -1;
	
	return sortDirection * (Number(a) - Number(b));
}

export function compareDates(a: Date | null | string, b: Date | null | string, order: Order) {
	// Sort dates above any value that is null
	if (a === null && b !== null) return 1;
	if (a !== null && b === null) return -1;
	
	const da = new Date(a || 0);
	const db = new Date(b || 0);
	
	// Make sure null values are sorted at the bottom of the list
	if (order === "asc") return da > db ? 1 : da < db ? -1 : 0;
	else return da < db ? 1 : da > db ? -1 : 0;
}