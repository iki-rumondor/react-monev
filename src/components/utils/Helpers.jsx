export const formatDateRange = (dateRange) => {
	if(!dateRange){
		return ""
	}
	const monthNames = [
		"Januari",
		"Februari",
		"Maret",
		"April",
		"Mei",
		"Juni",
		"Juli",
		"Agustus",
		"September",
		"Oktober",
		"November",
		"Desember",
	];

	const [startDate, endDate] = dateRange.split(" - ");

	function formatDate(date) {
		const [year, month, day] = date.split("-");
		const monthName = monthNames[parseInt(month) - 1];
		return `${day} ${monthName} ${year}`;
	}

	const formattedStartDate = formatDate(startDate);
	const formattedEndDate = formatDate(endDate);

	// Mengembalikan rentang tanggal yang diformat
	return `${formattedStartDate} - ${formattedEndDate}`;
};
