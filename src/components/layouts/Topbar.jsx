const Topbar = () => {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm flex justify-between items-center mb-8">

      <div>
        <h2 className="text-3xl font-bold text-slate-800">
          Admin Dashboard
        </h2>

        <p className="text-slate-500 mt-1">
          Smart Waste Management System
        </p>
      </div>

      <button className="bg-emerald-600 text-white px-5 py-2 rounded-xl hover:bg-emerald-700 transition duration-300">
        Admin
      </button>

    </div>
  )
}

export default Topbar