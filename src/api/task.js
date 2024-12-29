export const LIST_TASK = "/task/list";
export const LIST_GROUP_TASK = "/task/list/group";
export const CHECK_TASK = (id) => {
    return `/task/checked/${id}`;
};
export const UNCHECK_TASK = (id) => {
    return `/task/unchecked/${id}`;
};
export const ADD_TASK = "/task/create"