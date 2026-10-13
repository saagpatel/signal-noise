export function centralInterval(
	mean: number,
	standardDeviation: number,
): [number, number] {
	return [mean - standardDeviation, mean + standardDeviation];
}
