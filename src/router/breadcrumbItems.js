import pathnames from "./pathnames";

const breadcrumbsItem = {
    dashboard: [
        { label: "Page", to: "/" },
        { label: "Dashboard", to: pathnames.DashboardView },
    ],
    announcement: [
        { label: "Page", to: "/" },
        { label: "Announcement", to: pathnames.AnnouncementView },
    ],
    subject: [
        { label: "Page", to: "/" },
        { label: "Subject", to: pathnames.SubjectView },
    ],
    subjectDetails: [
        { label: "Page", to: "/" },
        { label: "Subject", to: pathnames.SubjectView },
    ],
    profile: [
        { label: "Page", to: "/" },
        { label: "Profile", to: pathnames.Profile },
    ],
    groupPublic: [
        { label: "Page", to: "/" },
        { label: "Group", to: pathnames.Group },
    ],
    groupDetails: [
        { label: "Page", to: "/" },
        { label: "Group", to: pathnames.Group },
    ],
    groupCreate: [
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
