import AdminLayout from "../components/layouts/AdminLayout"

import StatCard from "../components/dashboard/StatCard"
import ComplaintTable from "../components/tables/ComplaintTable"
import UserTable from "../components/tables/UserTable"

import {
  FaClipboardList,
  FaClock,
  FaCheckCircle,
  FaUsers
} from "react-icons/fa"

const AdminDashboard = () => {
  return (

    <AdminLayout>

      {/* Statistic Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

        <StatCard
          title="Total Complaints"
          value="1,248"
          color="border-emerald-500"
          icon={<FaClipboardList />}
        />

        <StatCard
          title="Pending"
          value="342"
          color="border-yellow-400"
          icon={<FaClock />}
        />

        <StatCard
          title="Resolved"
          value="876"
          color="border-green-500"
          icon={<FaCheckCircle />}
        />

        <StatCard
          title="Workers"
          value="56"
          color="border-blue-500"
          icon={<FaUsers />}
        />

      </div>

      {/* Complaint Table */}
      <ComplaintTable />

      {/* User Table */}
      <UserTable />

    </AdminLayout>

  )
}

export default AdminDashboard