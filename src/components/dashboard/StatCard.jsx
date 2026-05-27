const StatCard = ({ title, value, color, icon }) => {
  return (
    <div
      className={`bg-white rounded-2xl p-6 shadow-sm border-l-4 ${color}`}
    >

      <div className="flex justify-between items-center">

        <div>

          <p className="text-slate-500 text-sm">
            {title}
          </p>

          <h3 className="text-4xl font-bold text-slate-800 mt-3">
            {value}
          </h3>

        </div>

        <div className="text-3xl text-slate-400">
          {icon}
        </div>

      </div>

    </div>
  )
}

export default StatCard
