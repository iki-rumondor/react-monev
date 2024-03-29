import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import * as am4plugins_wordCloud from "@amcharts/amcharts4/plugins/wordCloud";
import { useEffect, useRef } from "react";
am4core.useTheme(am4themes_animated);

export const WordCloud = ({ text }) => {
	const chartRef = useRef(null);

	useEffect(() => {
		let chart = am4core.create(
			chartRef.current,
			am4plugins_wordCloud.WordCloud
		);
		let series = chart.series.push(
			new am4plugins_wordCloud.WordCloudSeries()
		);
		series.text = text;
		series.randomness = 0;
		series.colors = new am4core.ColorSet();
		series.colors.passOptions = {};
		return () => {
			chart.dispose();
		};
	}, [text]);

	return (
		<div ref={chartRef} style={{ width: "100%", height: "500px" }}></div>
	);
};
