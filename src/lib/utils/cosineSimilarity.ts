function dotp(x: number[], y: number[]) {
	function dotp_sum(a: number, b: number) {
		return a + b;
	}
	function dotp_times(_a: number, i: number) {
		return x[i] * y[i];
	}

	return x.map(dotp_times).reduce(dotp_sum, 0);
}

export default function cosineSimilarity(A: number[], B: number[]) {
	const similarity = dotp(A, B) / (Math.sqrt(dotp(A, A)) * Math.sqrt(dotp(B, B)));
	return similarity;
}
