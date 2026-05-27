import Sidebar from "./Sidebar"
import Topbar from "./Topbar"


const AdminLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-slate-100">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-8 overflow-x-hidden">

        {/* Topbar */}
        <Topbar />

        {/* Dynamic Content */}
        <div className="mt-6">
          {children}
        </div>

      </main>

    </div>
  )
}

export default AdminLayout