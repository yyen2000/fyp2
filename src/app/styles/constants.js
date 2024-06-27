import { GiHamburgerMenu } from "react-icons/gi";
import { RiDashboardFill } from "react-icons/ri"; 
import { GoGraph } from "react-icons/go";
import { IoCalendarClearOutline } from "react-icons/io5"
import { IoNotificationsOutline } from "react-icons/io5";
import { FaCircle, FaRegUserCircle } from "react-icons/fa";
import {SideNavItem} from "./type.js";

/** 
 * @type {SideNavItem}
*/
    const exampleItem = {
        title: "Home",
        path: "home/homepage",
        icon: <RiDashboardFill />,

        title: "Trending Topics",
        path: "home/trendingtopic",
        icon: <GoGraph />,

        title: "Past FYP Topics",
        path: "home/pastfyptopics",
        icon: <IoCalendarClearOutline />,

        title: "Profile",
        path: "home/profile",
        icon: <FaCircle />,
     };