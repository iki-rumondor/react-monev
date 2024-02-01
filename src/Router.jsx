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

export const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<RequireAuth />}>
					<Route element={<IsAdmin />}>
						<Route path="/prodi" element={<Prodi />} />
						<Route path="/majors" element={<Major />} />
						<Route path="/academic-years" element={<AcademicYear />} />
					</Route>
					<Route element={<IsProdi />}>
						<Route path="/subjects" element={<Subject />} />
						<Route path="/lab" element={<Laboratory />} />
						<Route path="/teachers" element={<Teacher />} />
						<Route path="/rps" element={<RPS />} />
						<Route path="/rps/year/:yearID" element={<SubRPS />} />
					</Route>
					<Route path="/logout" element={<Logout />} />
				</Route>
				<Route element={<RequireLogout />}>
					<Route path="/login" element={<Login />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};
