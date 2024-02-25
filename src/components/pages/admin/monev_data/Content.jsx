import React, { useEffect, useState } from "react";
import { PlanTable } from "../../../layout/table/PlanTable";
import { ModuleTable } from "../../../layout/table/ModuleTable";
import { ToolTable } from "../../../layout/table/ToolTable";
import { SkillTable } from "../../../layout/table/SkillTable";
import { FaCondTable } from "../../../layout/table/FaCondTable";
import { TeacherAttTable } from "../../../layout/table/TeacherAttTable";
import { StudentAttTable } from "../../../layout/table/StudentAttTable";
import { PlanMiddle } from "../../../layout/table/PlanMiddleTable";
import { StuPassedTable } from "../../../layout/table/StuPassedTable";
import { StuFinalTable } from "../../../layout/table/StuFinalTable";
import { GradeTable } from "../../../layout/table/GradeTable";

export const Content = ({ instrument, departmentID, yearID }) => {
	const [contentComponent, setContentComponent] = useState(null);

	useEffect(() => {
		switch (instrument) {
			case "1":
				setContentComponent(
					<PlanTable departmentID={departmentID} yearID={yearID} />
				);
				break;
			case "2":
				setContentComponent(
					<ModuleTable departmentID={departmentID} yearID={yearID} />
				);
				break;
			case "3":
				setContentComponent(
					<ToolTable departmentID={departmentID} yearID={yearID} />
				);
				break;
			case "4":
				setContentComponent(
					<SkillTable departmentID={departmentID} yearID={yearID} />
				);
				break;
			case "5":
				setContentComponent(
					<FaCondTable departmentID={departmentID} yearID={yearID} />
				);
				break;
			case "6":
				setContentComponent(
					<TeacherAttTable departmentID={departmentID} yearID={yearID} />
				);
				break;
			case "7":
				setContentComponent(
					<StudentAttTable departmentID={departmentID} yearID={yearID} />
				);
				break;
			case "8":
				setContentComponent(
					<PlanMiddle departmentID={departmentID} yearID={yearID} />
				);
				break;
			case "9":
				setContentComponent(
					<StuPassedTable departmentID={departmentID} yearID={yearID} />
				);
				break;
			case "10":
				setContentComponent(
					<StuFinalTable departmentID={departmentID} yearID={yearID} />
				);
				break;
			case "11":
				setContentComponent(
					<GradeTable departmentID={departmentID} yearID={yearID} />
				);
				break;
			default:
				setContentComponent(null);
				break;
		}
	}, [instrument, departmentID, yearID]);

	return <div>{contentComponent}</div>;
};
