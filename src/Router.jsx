import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Prodi from "./components/pages/prodi/Prodi";
import Login from "./components/pages/auth/Login";
import { RequireAuth } from "./components/utils/RequireAuth";
import { RequireLogout } from "./components/utils/RequireLogout";
import Logout from "./components/pages/auth/Logout";
import Subject from "./components/pages/subject/Index";
import { IsAdmin, IsProdi, StepAccept } from "./components/utils/Authorization";
import Major from "./components/pages/majors/Index";
import Laboratory from "./components/pages/laboratory/Index";
import AcademicYear from "./components/pages/academic_year/Index";
import Teacher from "./components/pages/teacher/Index";
import { SubRPS } from "./components/pages/rps/Index";
import { Tools } from "./components/pages/tools/Index";
import { HomeController } from "./components/pages/dashboard/Index";
import Skill from "./components/pages/skill/Index";
import Fasility from "./components/pages/fasilitas/Index";
import { SubFacilityCondition } from "./components/pages/facility_condition/SubIndex";
import FirstMonev from "./components/pages/monev/first/Index";
import { SubFirstMonev } from "./components/pages/monev/first/SubIndex";
import MiddleMonev from "./components/pages/monev/middle/Index";
import { SubMiddleMonev } from "./components/pages/monev/middle/SubIndex";
import MiddleTeacherAttendences from "./components/pages/monev/middle/teacher_attendence/Index";
import MiddleStudentAttendences from "./components/pages/monev/middle/student_attendence/Index";
import MiddlePlans from "./components/pages/monev/middle/plans/Index";
import MiddleLastMonev from "./components/pages/monev/middle_last/Index";
import { SubMiddleLastMonev } from "./components/pages/monev/middle_last/SubIndex";
import MiddleLastTeacherAttendences from "./components/pages/monev/middle_last/teacher_attendence/Index";
import MiddleLastStudentAttendences from "./components/pages/monev/middle_last/student_attendence/Index";
import MiddleLastPlans from "./components/pages/monev/middle_last/plans/Index";
import LastMonev from "./components/pages/monev/last/Index";
import { SubLastMonev } from "./components/pages/monev/last/SubIndex";
import StudentPassed from "./components/pages/monev/last/passed/Index";
import StudentFinal from "./components/pages/monev/last/final/Index";
import SubjectGrade from "./components/pages/monev/last/grade/Index";
import Monitoring from "./components/pages/admin/monitoring/Index";
import { YearMonitoring } from "./components/pages/admin/monitoring/Year";
import { AdminDashboard } from "./components/pages/dashboard/Admin";
import { ProdiDashboard } from "./components/pages/dashboard/Prodi";
import MonevData from "./components/pages/admin/monev_data/Index";
import { Modul } from "./components/pages/modul/Index";
import User from "./components/pages/admin/user/Index";

export const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<RequireAuth />}>
					<Route element={<IsAdmin />}>
						<Route
							path="/home/admin"
							element={<AdminDashboard/>}
						/>
						<Route path="/prodi" element={<Prodi />} />
						<Route path="/majors" element={<Major />} />
						<Route path="/users" element={<User />} />
						<Route
							path="/monitoring/years/:yearID"
							element={<Monitoring />}
						/>
						<Route
							path="/monitoring"
							element={<YearMonitoring />}
						/>
						<Route
							path="/monev/data"
							element={<MonevData />}
						/>
						<Route
							path="/academic-years"
							element={<AcademicYear />}
						/>
					</Route>
					<Route element={<IsProdi />}>
						<Route
							path="/home/department"
							element={<ProdiDashboard />}
						/>
						<Route path="/subjects" element={<Subject />} />
						<Route path="/lab" element={<Laboratory />} />
						<Route path="/fasilitas" element={<Fasility />} />
						<Route path="/teachers" element={<Teacher />} />
						<Route element={<StepAccept stepRequire={"1"} />}>
							<Route
								path="/first-monev"
								element={<FirstMonev />}
							/>
							<Route
								path="/first-monev/years/:yearID"
								element={<SubFirstMonev />}
							/>
							<Route
								path="/rps/years/:yearID"
								element={<SubRPS />}
							/>
							<Route
								path="/facility-conditions/years/:yearID"
								element={<SubFacilityCondition />}
							/>
							<Route
								path="/tools/years/:yearID"
								element={<Tools />}
							/>
							<Route
								path="/modules/years/:yearID"
								element={<Modul />}
							/>
							<Route
								path="/skills/years/:yearID"
								element={<Skill />}
							/>
						</Route>
						<Route element={<StepAccept stepRequire={"2"} />}>
							<Route
								path="/middle-monev"
								element={<MiddleMonev />}
							/>
							<Route
								path="/middle-monev/years/:yearID"
								element={<SubMiddleMonev />}
							/>
							<Route
								path="/middle-monev/teacher-attendences/years/:yearID"
								element={<MiddleTeacherAttendences />}
							/>
							<Route
								path="/middle-monev/student-attendences/years/:yearID"
								element={<MiddleStudentAttendences />}
							/>
							<Route
								path="/middle-monev/plans/years/:yearID"
								element={<MiddlePlans />}
							/>
						</Route>
						<Route element={<StepAccept stepRequire={"3"} />}>
							<Route
								path="/middle-last-monev"
								element={<MiddleLastMonev />}
							/>
							<Route
								path="/middle-last-monev/years/:yearID"
								element={<SubMiddleLastMonev />}
							/>
							<Route
								path="/middle-last-monev/teacher-attendences/years/:yearID"
								element={<MiddleLastTeacherAttendences />}
							/>
							<Route
								path="/middle-last-monev/student-attendences/years/:yearID"
								element={<MiddleLastStudentAttendences />}
							/>
							<Route
								path="/middle-last-monev/plans/years/:yearID"
								element={<MiddleLastPlans />}
							/>
						</Route>
						<Route element={<StepAccept stepRequire={"4"} />}>
							<Route path="/last-monev" element={<LastMonev />} />
							<Route
								path="/last-monev/years/:yearID"
								element={<SubLastMonev />}
							/>
							<Route
								path="/last-monev/student-passed/years/:yearID"
								element={<StudentPassed />}
							/>
							<Route
								path="/last-monev/student-final/years/:yearID"
								element={<StudentFinal />}
							/>
							<Route
								path="/last-monev/grade/years/:yearID"
								element={<SubjectGrade />}
							/>
						</Route>
					</Route>
					<Route path="/home" element={<HomeController />}></Route>
					<Route path="/logout" element={<Logout />} />
				</Route>
				<Route element={<RequireLogout />}>
					<Route index path="/login" element={<Login />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};
