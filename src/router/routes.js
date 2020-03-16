//==============================================================================
// ■ Routes (routes.js)
//------------------------------------------------------------------------------
//     Routes definitions.
//==============================================================================
import Home from "../views/Home";
import Profile from "../views/Profile";
import Settings from "../views/Settings";
// import Admin from "../views/Admin";
// import AdminOverview from "../views/Admin/Overview";
// import AdminUsers from "../views/Admin/Users";
// import AdminUser from "../views/Admin/User";
import routeGuards from "./guards";

export default [
  //----------------------------------------------------------------------------
  // ● Public Routes
  //----------------------------------------------------------------------------
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About")
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login"),
    beforeEnter: routeGuards.publicOnly
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/Register"),
    beforeEnter: routeGuards.publicOnly
  },
  //----------------------------------------------------------------------------
  // ● User Routes
  //----------------------------------------------------------------------------
  {
    path: "/profile/:userName",
    name: "Profile",
    component: Profile,
    beforeEnter: routeGuards.userOnly
  },
  {
    path: "/settings",
    name: "Settings",
    component: Settings,
    beforeEnter: routeGuards.userOnly
  },
  //----------------------------------------------------------------------------
  // ● Admin Routes
  //----------------------------------------------------------------------------
  // {
  //   path: "/admin",
  //   component: Admin,
  //   beforeEnter: routeGuards.adminOnly,
  //   children: [
  //     {
  //       path: "/",
  //       name: "AdminOverview",
  //       component: AdminOverview
  //     },
  //     {
  //       path: "users",
  //       name: "AdminUsers",
  //       component: AdminUsers
  //     },
  //     {
  //       path: "users/:id",
  //       name: "AdminUser",
  //       component: AdminUser
  //     }
  //   ]
  // },
  //----------------------------------------------------------------------------
  // ● Default Route
  //----------------------------------------------------------------------------
  {
    path: "/*",
    redirect: { name: "Home" }
  }
];
