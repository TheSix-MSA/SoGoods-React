import Dashboard from "../views/Dashboard.js";
import MemberTable from "../views/MemberTable";
import FundingTable from "../views/FundingTable";
import MemberApprovalTable from "../views/MemberApprovalTable";
import FundingRequestTable from "../views/FundingRequestTable";
import NoticeTable from "../views/NoticeTable";


const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/member",
    name: "Member List",
    icon: "nc-icon nc-notes",
    component: MemberTable,
    layout: "/admin",
  },
  {
    path: "/approval",
    name: "Approval Request",
    icon: "nc-icon nc-atom",
    component: MemberApprovalTable,
    layout: "/admin",
  },
  {
    path: "/funding",
    name: "Funding List",
    icon: "nc-icon nc-paper-2",
    component: FundingTable,
    layout: "/admin",
  },
  {
    path: "/request",
    name: "Funding Request",
    icon: "nc-icon nc-pin-3",
    component: FundingRequestTable,
    layout: "/admin",
  },
  {
    path: "/notice",
    name: "Notice",
    icon: "nc-icon nc-bell-55",
    component: NoticeTable,
    layout: "/admin",
  },
];

export default dashboardRoutes;
