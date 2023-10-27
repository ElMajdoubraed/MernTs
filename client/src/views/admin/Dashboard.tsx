import { useEffect } from "react";
import AdminSideBar from "../../components/navbar/admin.sidebar";
import moment from "moment";

export default function AdminDashboard() {
  useEffect(() => {
    console.log("moment : ", moment.locale("fa"));
  }, []);
  return (
    <>
      <AdminSideBar />
    </>
  );
}
