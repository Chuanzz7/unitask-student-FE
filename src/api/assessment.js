
export const LIST_ASSESSMENT_SUBMISSION = "/assessment-submission/list";

export const GET_ASSESSMENT_SUBMISSION = (id) => {
    return `/assessment-submission/${id}`
};

export const RESUBMIT_ASSESSMENT = (id) => {
    return `/assessment-submission/resubmit/${id}`
};
