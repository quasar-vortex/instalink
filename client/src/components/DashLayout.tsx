import React from "react";
import { Outlet } from "react-router-dom";

/*
isDrawerOpen / chatwindow

*/

const ChatWindow = () => {
  return (
    <div>
      <div>
        {/* Avatar and Name*/} {/* Delete / Mute Chat Options*/}
      </div>
      <div>{/* Display Messages */}</div>
      <div>
        {/* Send Text  */}
        {/* Send Files */}
      </div>
    </div>
  );
};
const ChatList = () => {};
const SideBar = () => {};
const PlaceHolder = () => {};
const DashLayout = () => {
  return (
    <>
      <aside></aside>
      <main>
        <div>
          <Outlet />
        </div>
        <div></div>
      </main>
    </>
  );
};

export default DashLayout;
