import Sidebar from "../Sidebar";

export const ProdiLinks = () => {
	return (
		<>
			<Sidebar.HeaderLink>Prodi</Sidebar.HeaderLink>
			<Sidebar.Link path={"/home/department"} icon={"fa-user"}>
				Dashboard
			</Sidebar.Link>
			<Sidebar.HeaderLink>Master</Sidebar.HeaderLink>
			<Sidebar.Link path={"/subjects"} icon={"fa-user"}>
				Mata Kuliah
			</Sidebar.Link>
			<Sidebar.Link path={"/lab"} icon={"fa-user"}>
				Laboratorium
			</Sidebar.Link>
			<Sidebar.Link path={"/fasilitas"} icon={"fa-user"}>
				Fasilitas
			</Sidebar.Link>
			<Sidebar.Link path={"/teachers"} icon={"fa-user"}>
				Dosen
			</Sidebar.Link>
			<Sidebar.HeaderLink>Monev</Sidebar.HeaderLink>
			<Sidebar.Link path={"/first-monev"} icon={"fa-user"}>
				Awal Semester
			</Sidebar.Link>
			<Sidebar.Link path={"/middle-monev"} icon={"fa-user"}>
				Tengah Semester
			</Sidebar.Link>
			<Sidebar.Link path={"/middle-last-monev"} icon={"fa-user"}>
				Akhir Sebelum UAS
			</Sidebar.Link>
			<Sidebar.Link path={"/last-monev"} icon={"fa-user"}>
				Akhir Setelah UAS
			</Sidebar.Link>
		</>
	);
};
