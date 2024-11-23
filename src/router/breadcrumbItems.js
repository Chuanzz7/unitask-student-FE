import pathnames from "./pathnames";

const breadcrumbsItem = {
	dashboard: [
		{ label: "Page", to: "/" },
		{ label: "Dashboard", to: pathnames.DashboardView },
	],
	announcement: [
		{ label: "Page", to: "/" },
		{ label: "Announcement", to: pathnames.Announcement },
	],
	subject: [
		{ label: "Page", to: "/" },
		{ label: "Subject", to: pathnames.SubjectView },
	],
	subjectDetails: [
		{ label: "Page", to: "/" },
		{ label: "Subject", to: pathnames.SubjectView },
	],
	assignment: [
		{ label: "Page", to: "/" },
		{ label: "Assignment", to: pathnames.Assignment },
	],
	group: [
		{ label: "Page", to: "/" },
		{ label: "Group", to: pathnames.Group },
	],
	task: [
		{ label: "Page", to: "/" },
		{ label: "Task", to: pathnames.Task },
	],
	document: [
		{ label: "Page", to: "/" },
		{ label: "Document", to: pathnames.Document },
	],
};

export default breadcrumbsItem;
