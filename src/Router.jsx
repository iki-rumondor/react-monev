import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Prodi from "./components/pages/prodi/Prodi";
import Login from "./components/pages/auth/Login";
import { RequireAuth } from "./components/utils/RequireAuth";
import { RequireLogout } from "./components/utils/RequireLogout";
import Logout from "./components/pages/auth/Logout";
import Subject from "./components/pages/subject/Index";
import { IsAdmin, IsProdi } from "./components/utils/Authorization";
import Major from "./components/pages/majors/Index";
import Laboratory from "./components/pages/laboratory/Index";
import AcademicYear from "./components/pages/academic_year/Index";
import Teacher from "./components/pages/teacher/Index";
import RPS from "./components/pages/rps/Index";
import { SubRPS } from "./components/pages/rps/SubIndex";
import Tools from "./components/pages/tools/Index";
import { SubTools } from "./components/pages/tools/SubIndex";
import Modul from "./components/pages/modul/Index";
import { SubModul } from "./components/pages/modul/SubIndex";
import { HomeController } from "./components/pages/dashboard/Index";
import Skill from "./components/pages/skill/Index";
import Fasility from "./components/pages/fasilitas/Index";
import FacilityCondition from "./components/pages/facility_condition/Index";
import { SubFacilityCondition } from "./components/pages/facility_condition/SubIndex";
import FirstMonev from "./components/pages/monev/first/Index";
import { SubFirstMonev } from "./components/pages/monev/first/SubIndex";

export const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<RequireAuth />}>
					<Route element={<IsAdmin />}>
						<Route path="/prodi" element={<Prodi />} />
						<Route path="/majors" element={<Major />} />
						<Route
							path="/academic-years"
							element={<AcademicYear />}
						/>
					</Route>
					<Route element={<IsProdi />}>
						<Route path="/subjects" element={<Subject />} />
						<Route path="/lab" element={<Laboratory />} />
						<Route path="/fasilitas" element={<Fasility />} />
						<Route path="/teachers" element={<Teacher />} />
						<Route path="/first-monev" element={<FirstMonev />} />
						<Route path="/first-monev/years/:yearID" element={<SubFirstMonev />} />
						<Route path="/rps" element={<RPS />} />
						<Route path="/rps/years/:yearID" element={<SubRPS />} />
						<Route path="/tools" element={<Tools />} />
						<Route path="/skills" element={<Skill />} />
						<Route path="/facility-conditions" element={<FacilityCondition />} />
						<Route path="/facility-conditions/years/:yearID" element={<SubFacilityCondition />} />
						<Route
							path="/tools/years/:yearID"
							element={<SubTools />}
						/>
						<Route path="/modules" element={<Modul />} />
						<Route
							path="/modules/years/:yearID"
							element={<SubModul />}
						/>
					</Route>
					<Route path="/home" element={<HomeController />}></Route>
					<Route path="/logout" element={<Logout />} />
				</Route>
				<Route element={<RequireLogout />}>
					<Route path="/login" element={<Login />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};
