module.exports = (template, data) => {
	let tempOutput = template.replace(/{%PRODUCTNAME%}/g, data.productName);
	tempOutput = tempOutput.replace(/{%IMAGE%}/g, data.image);
	tempOutput = tempOutput.replace(/{%PRICE%}/g, data.price);
	tempOutput = tempOutput.replace(/{%FROM%}/g, data.from);
	tempOutput = tempOutput.replace(/{%NUTRIENTS%}/g, data.nutrients);
	tempOutput = tempOutput.replace(/{%QUANTITY%}/g, data.quantity);
	tempOutput = tempOutput.replace(/{%DESCRIPTION%}/g, data.description);
	tempOutput = tempOutput.replace(/{%ID%}/g, data.id);
	if (!data.organic) {
		tempOutput = tempOutput.replace(/{%NOT_ORGANIC%}/g, "not-organic");
	} else {
		tempOutput = tempOutput.replace(/{%NOT_ORGANIC%}/g, "");
	}

	return tempOutput;
};
