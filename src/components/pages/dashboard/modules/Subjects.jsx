import { Tooltip } from "react-tooltip";

export const SubjectInfo = ({all, practical}) => {

	return (
		<>
			<div>
				<span className="praktikum">{practical ?? 0}</span> /{" "}
				<span className="all">{all ?? 0}</span>
			</div>
			<Tooltip anchorSelect=".all" place="bottom">
				<small>Seluruh Mata Kuliah</small>
			</Tooltip>
			<Tooltip anchorSelect=".praktikum" place="bottom">
				<small>Mata Kuliah Praktikum</small>
			</Tooltip>
		</>
	);
};
