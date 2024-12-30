export const LIST_GROUP = "/student-group/list";

export const GET_GROUP = (id) => {
	return `/group/${id}`;
};
export const PUT_GROUP = (id) => {
	return `/group/update/${id}`;
};
export const GET_MEMBER = (assessmentId) => {
	return `/student-group/${assessmentId}/members`;
};
export const GET_STUDENT_ASSESSMENT = (id) => {
	return `/group/studentAssignmentDropdown/${id}`;
};

export const JOIN_GROUP = (id) => {
	return `/student-group/join/${id}`;
};
export const LIST_PUBLIC_GROUP = "/student-group/public";

export const CREATE_CROUP = "/group/create";

export const GROUP_ASSESSMENT = "/student-group/assessment/list";

