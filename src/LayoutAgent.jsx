
import HeaderAgent from "./HeaderAgent";
import {Outlet} from "react-router-dom";

export default function LayoutAgent() {
  return (
    // <div className="py-4 px-8 flex flex-col min-h-screen max-w-4xl mx-auto">
    <div className="bg-gray-100 w-full overflow-hidden">
      <HeaderAgent  />
      <Outlet />
    </div>
  );
}
