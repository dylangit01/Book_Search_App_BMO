export const sortByTitleFun = (arr) => {
	return arr.sort((a, b) => {
		if (a.title.toLowerCase() < b.title.toLowerCase()) {
			return -1;
		}
		if (a.title.toLowerCase() > b.title.toLowerCase()) {
			return 1;
		}
		return 0;
	});
};

export const sortByYearFun = (arr) => {
	return arr
		.filter((item) => item.publish_year)
		.sort((a, b) => {
			return Number(b.publish_year[0]) - Number(a.publish_year[0]);
		});
};

export const fetchDataFun = async (endPoint, query) => {
	const res = await fetch(endPoint, {
		method: 'POST',
		headers: {
			'Content-type': 'application/json',
		},
		body: JSON.stringify({ query }),
	});
	return res;
}
