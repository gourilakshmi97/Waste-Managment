import React from 'react'

const UserTable = () => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">

        <h2 className="text-2xl font-bold text-slate-800">
          User Management
        </h2>

        <input
          type="text"
          placeholder="Search users..."
          className="border border-slate-300 px-4 py-2 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500"
        />

      </div>

      {/* Table */}
      <div className="overflow-x-auto">

        <table className="w-full min-w-[900px]">

          <thead>

            <tr className="bg-slate-100 text-slate-600">

              <th className="text-left p-4 rounded-l-xl">
                User
              </th>

              <th className="text-left p-4">
                Email
              </th>

              <th className="text-left p-4">
                Phone
              </th>

              <th className="text-left p-4">
                Complaints
              </th>

              <th className="text-left p-4">
                Status
              </th>

              <th className="text-left p-4 rounded-r-xl">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            <tr className="border-b border-slate-200 hover:bg-slate-50">

              <td className="p-4 font-medium">
                Rahul Krishna
              </td>

              <td className="p-4">
                rahul@gmail.com
              </td>

              <td className="p-4">
                +91 9876543210
              </td>

              <td className="p-4">
                12
              </td>

              <td className="p-4">

                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                  Active
                </span>

              </td>

              <td className="p-4 flex gap-2">

                <button className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm">
                  Edit
                </button>

                <button className="bg-yellow-500 text-white px-3 py-1 rounded-lg text-sm">
                  Block
                </button>

                <button className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm">
                  Delete
                </button>

              </td>

            </tr>

          </tbody>

        </table>

      </div>

    </div>
  )
}

export default UserTable
