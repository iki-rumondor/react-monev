import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Prodi from "./components/pages/prodi/Prodi";
import Login from "./components/pages/auth/Login";
import { RequireAuth } from "./components/utils/RequireAuth";
import { RequireLogout } from "./components/utils/RequireLogout";
import Logout from "./components/pages/auth/Logout";
import AssessmentType from "./components/pages/assessment_type/Index";
import AssessmentQuestion from "./components/pages/assessment_question/Index";
import Response from "./components/pages/response/Index";
import { DetailResponse } from "./components/pages/response/Detail";
import Subject from "./components/pages/subject/Index";
import Credential from "./components/pages/auth/Credential";
import { IsAdmin, IsProdi } from "./components/utils/Authorization";

export const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<RequireAuth />}>
					<Route element={<IsAdmin />}>
						<Route path="/prodi" element={<Prodi />} />
						<Route
							path="/assessments/type"
							element={<AssessmentType />}
						/>
						<Route
							path="/assessments/question"
							element={<AssessmentQuestion />}
						/>
						<Route path="/response" element={<Response />} />
						<Route
							path="/response/detail/:assessmentId"
							element={<DetailResponse />}
						/>
					</Route>
					<Route element={<IsProdi />}>
						<Route path="/subjects" element={<Subject />} />
					</Route>
					<Route path="/logout" element={<Logout />} />
				</Route>
				<Route element={<RequireLogout />}>
					<Route path="/login" element={<Login />} />
					<Route path="/credential" element={<Credential />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};
