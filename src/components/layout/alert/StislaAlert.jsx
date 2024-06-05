import { formatDateRange } from "../../utils/Helpers";

export const StislaAlert = ({year}) => {
	const data = [
		{
			name: "Monitoring Awal Semester",
			tanggal: formatDateRange(year?.first_range),
			to: `/first-monev/years/${year?.uuid}`,
		},
		{
			name: "Monitoring Tengah Semester",
			tanggal: formatDateRange(year?.middle_range),
			to: `/middle-monev/years/${year?.uuid}`,
		},
		{
			name: "Monitoring Akhir Sebelum UAS",
			tanggal: formatDateRange(year?.middle_last_range),
			to: `/middle-last-monev/years/${year?.uuid}`,
		},
		{
			name: "Monitoring Akhir Setelah UAS",
			tanggal: formatDateRange(year?.last_range),
			to: `/last-monev/years/${year?.uuid}`,
		},
	];
	return (
		<>
			<div class="card card-hero">
				<div class="card-header">
					<div class="card-icon">
						<i class="far fa-question-circle"></i>
					</div>
					<h4>Jadwal Monitoring Pembelajaran</h4>
					<div class="card-description">
						Tahun Ajaran {year?.year} {year?.semester}
					</div>
				</div>
				<div class="card-body p-0">
					<div class="tickets-list">
						{data.map((item) => (
							<a href={item.to} class="ticket-item">
								<div class="ticket-title">
									<h4>{item.name}</h4>
								</div>
								<div class="ticket-info">
									<div>{item.tanggal}</div>
								</div>
							</a>
						))}
					</div>
				</div>
			</div>
		</>
	);
};
