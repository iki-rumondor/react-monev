import React, { useEffect, useState } from "react";
import { MonitoringTable } from "../../../layout/table/MonitoringTable";
import { ChartModel } from "../../../layout/chart/ApexChart";
import useLoading from "../../../hooks/useLoading";
import toast from "react-hot-toast";
import { fetchAPI } from "../../../utils/Fetching";

export const Content = ({ step="1", departmentID, yearID }) => {
	const { setIsLoading } = useLoading();
	const [values, setValues] = useState([]);
	const handleLoad = async () => {
		try {
			setIsLoading(true);
			const res = await fetchAPI(`/api/monev/departments/${departmentID}/years/${yearID}`);
			setValues(res.data)
		} catch (error) {
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
			const categories = ["RPS", "Modul Praktikum", "Alat Praktikum", "Kemampuan Dosen", "Kondisi Fasilitas"]
			return <ChartModel data={values.first_monev} categories={categories} type={"bar"}  />;
		default:
			return <MonitoringTable />;
	}
	// useEffect(() => {
	// }, []);
};
