import Chart from "react-apexcharts";
import { Card, CardBody } from "react-bootstrap";
import { ActionsCard } from "../../../../layout/cards/ActionsCard";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useLoading from "../../../../hooks/useLoading";
import { fetchAPI } from "../../../../utils/Fetching";

export const TeacherAttendance = ({ departmentID, yearID }) => {
	const [data, setData] = useState(null);
	const [seriesData, setSeriesData] = useState([0, 0]);
	const [titleClass, setTitleClass] = useState("");
	const [dropdown, setDropdown] = useState(null);
	const { setIsLoading } = useLoading();
	const [chart, setChart] = useState(null);
	const handleClick = (value) => {
		setChart(value);
		data.map((item) => {
			if (item.uuid == value) {
				setSeriesData([item.middle, item.last]);
				setTitleClass(
					`Mata Kuliah: ${item.subject.name} (${item.class})`
				);
			}
		});
	};

	const handleLoad = async () => {
		try {
			setIsLoading(true);
			const res = await fetchAPI(
				`/api/teacher-attendences/departments/${departmentID}/years/${yearID}`
			);
			const dataSet = [];
			res.data &&
				res.data.map((item) => {
					dataSet.push({
						uuid: item.uuid,
						name: `[${item.class}] ${item.subject.name}`,
					});
				});
			setData(res.data);
			setDropdown(dataSet);
		} catch (error) {
			toast.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		handleLoad();
	}, [departmentID]);

	const options = {
		chart: {
			id: "basic-bar",
		},
		yaxis: {
			max: 100,
		},
		xaxis: {
			categories: ["Tengah Semester", "Akhir Semester"],
		},
		plotOptions: {
			bar: {
				distributed: true,
			},
		},
		title: {
			text: titleClass,
		},
		dataLabels: {
			enabled: true,
			formatter: function (val) {
				return val + "%";
			},
		},
	};

	const series = [
		{
			name: "Data Monev",
			data: seriesData,
		},
	];

	return (
		<ActionsCard
			dropdownName={"Pilih Kelas"}
			data={dropdown}
			chart={chart}
			handleClick={handleClick}
		>
			<Chart options={options} series={series} type={"bar"} />;
		</ActionsCard>
	);
};
