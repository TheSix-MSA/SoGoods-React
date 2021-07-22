import Dashboard from "../views/Dashboard.js";
// import UserProfile from "views/UserProfile.js";
import MemberTable from "../views/MemberTable";
import FundingList from "../views/FundingTable";
import FundingTable from "../views/FundingTable";
import MemberApprovalTable from "../views/MemberApprovalTable";
import FundingRequestTable from "../views/FundingRequestTable";
// import Typography from "views/Typography.js";
// import Icons from "views/Icons.js";
// import Maps from "views/Maps.js";
// import Notifications from "views/Notifications.js";
// import Upgrade from "views/Upgrade.js";

const dashboardRoutes = [
  // {
  //   upgrade: true,
  //   path: "/upgrade",
  //   name: "Upgrade to PRO",
  //   icon: "nc-icon nc-alien-33",
  //   component: Upgrade,
  //   layout: "/admin",
  // },
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/admin",
  },
  // {
  //   path: "/user",
  //   name: "User Profile",
  //   icon: "nc-icon nc-circle-09",
  //   component: UserProfile,
  //   layout: "/admin",
  // },
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
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   icon: "nc-icon nc-bell-55",
  //   component: Notifications,
  //   layout: "/admin",
  // },
];

export default dashboardRoutes;
