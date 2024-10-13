import { CiGrid31, CiShop, CiWarning } from "react-icons/ci";
import { LiaClipboardListSolid } from "react-icons/lia";
import { RiShieldUserLine } from "react-icons/ri";
import { SlHandbag } from "react-icons/sl";
import dashboardLinkProps from "../types/dashboardLinkProps";

const dashboardLinks: dashboardLinkProps[] = [
  {
    title: "Dashboard",
    path: "/dashboard",
    Icon: CiGrid31
  },
  {
    title: "Members",
    path: "/dashboard/members",
    Icon: LiaClipboardListSolid
  },
  {
    title: "My Listings",
    path: "/dashboard/my-services",
    Icon: CiShop
  },
  {
    title: "My Orders",
    path: "/orders",
    Icon: SlHandbag
  },
  {
    title: "Reports",
    path: "/CiWarning",
    Icon: CiWarning
  },
  {
    title: "Profile",
    path: "/profile",
    Icon: RiShieldUserLine
  }
];

export default dashboardLinks;
