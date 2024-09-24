import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <nav className="border-b-2 ">
          <div className="h-14 flex justify-between items-center container">
            <div>
              <NavLink
                to="/"
                className="font-bold text-lg hover:text-gray-700 duration-200"
              >
                InstaLink
              </NavLink>
            </div>
            <ul className="flex gap-4 items-center">
              <li>
                <NavLink to="/register" className="btn btn-indigo">
                  Register
                </NavLink>
              </li>
              <li>
                <NavLink className="btn btn-blue" to="/">
                  Login
                </NavLink>
              </li>
              {import.meta.env.PROD ? null : (
                <li>
                  <NavLink className="btn btn-blue" to="/dash">
                    Dash
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </nav>
        <main className="flex flex-col flex-grow ">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Layout;
