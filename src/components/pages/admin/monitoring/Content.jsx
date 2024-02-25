import React, { useEffect, useState } from "react";
import { ChartModel } from "../../../layout/chart/ApexChart";
import useLoading from "../../../hooks/useLoading";
import toast from "react-hot-toast";
import { fetchAPI } from "../../../utils/Fetching";

export const Content = ({ step = "1", departmentID, yearID }) => {
	const { setIsLoading } = useLoading();
	const [values, setValues] = useState([]);
	const handleLoad = async () => {
		try {
			setIsLoading(true);
			const res = await fetchAPI(
				`/api/monev/departments/${departmentID}/years/${yearID}`
			);
			setValues(res.data);
		} catch (error) {
			console.log(error);
			toast.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		handleLoad();
	}, []);

	switch (step) {
		case "1":
			const first_categories = [
				"RPS",
				"Modul Praktikum",
				"Alat Praktikum",
				"Kemampuan Dosen",
				"Kondisi Fasilitas",
			];
			const first_series = [
				{
					name: "Data Monev",
					data: values.first_monev,
				},
			];

			return (
				<ChartModel
					series={first_series}
					categories={first_categories}
					type={"bar"}
				/>
			);
		case "2":
			 const middle_categories = [
				"Kehadiran Dosen",
				"Kehadiran Mahasiswa",
				"Mata Kuliah Sesuai RPS",
			];

			const middle_series = [
				{
					name: "Data Monev",
					data: values.middle_monev,
				},
			];

			return (
				<ChartModel
					series={middle_series}
					categories={middle_categories}
					type={"bar"}
				/>
			);
		case "3":
			const middle_last_categories = [
				"Kehadiran Dosen",
				"Kehadiran Mahasiswa",
				"Mata Kuliah Sesuai RPS",
			];

			const middle_last_series = [
				{
					name: "Data Tengah Semester",
					data: values.middle_monev,
				},
				{
					name: "Data Akhir Semester",
					data: values.middle_last_monev,
				},
			];

			return (
				<ChartModel
					series={middle_last_series}
					categories={middle_last_categories}
					type={"bar"}
				/>
			);
		default:
			const last_categories = [
				"Mahasiswa Lulus",
				"Kehadiran Ikut UAS",
				"Tepat Waktu Pemasukan Nilai",
			];

			const last_series = [
				{
					name: "Data Monev",
					data: values.last_monev,
				},
			];

			return (
				<ChartModel
					series={last_series}
					categories={last_categories}
					type={"bar"}
				/>
			);
	}
};
