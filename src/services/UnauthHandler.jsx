import { redirect } from "react-router-dom"

export const handleLogout = () => {
	if(sessionStorage.getItem("token")){
		sessionStorage.removeItem("token")
	}
	return redirect("/login")
}
