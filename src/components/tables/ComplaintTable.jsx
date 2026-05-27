import { useState } from "react"

const ComplaintTable = () => {

  // Complaint Data
  const [complaints, setComplaints] = useState([
    {
      id: "#1024",
      location: "Thrissur Town",
      status: "Pending",
      worker: "Unassigned",
      date: "11 May 2026",
    },

    {
      id: "#1025",
      location: "MG Road",
      status: "In Progress",
      worker: "Rahul",
      date: "10 May 2026",
    },

    {
      id: "#1026",
      location: "Round South",
      status: "Resolved",
      worker: "Arjun",
      date: "9 May 2026",
    },
  ])

  // States
  const [filter, setFilter] = useState("All")

  const [search, setSearch] = useState("")

  const [selectedComplaint, setSelectedComplaint] = useState(null)

  const [openModal, setOpenModal] = useState(false)

  const [deleteModal, setDeleteModal] = useState(false)

  // Filter + Search Logic
  const filteredComplaints = complaints.filter((complaint) => {

    const matchesFilter =
      filter === "All" || complaint.status === filter

    const matchesSearch =
      complaint.id.toLowerCase().includes(search.toLowerCase()) ||

      complaint.location
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      complaint.worker
        .toLowerCase()
        .includes(search.toLowerCase())

    return matchesFilter && matchesSearch
  })

  // Delete Function
  const handleDelete = () => {

    const updatedComplaints = complaints.filter(
      (complaint) =>
        complaint.id !== selectedComplaint.id
    )

    setComplaints(updatedComplaints)

    setDeleteModal(false)
  }

  return (
    <div className="bg-white mt-10 p-6 rounded-2xl shadow-sm w-full">

      {/* Top Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">

        {/* Title */}
        <h2 className="text-2xl font-bold text-slate-800">
          Complaint Management
        </h2>

        {/* Right Side */}
        <div className="flex flex-col md:flex-row gap-4">

          {/* Search */}
          <input
            type="text"
            placeholder="Search complaints..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-slate-300 px-4 py-2 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500"
          />

          {/* Filter Buttons */}
          <div className="flex gap-3 flex-wrap">

            <button
              onClick={() => setFilter("All")}
              className="bg-emerald-600 text-white px-4 py-2 rounded-xl"
            >
              All
            </button>

            <button
              onClick={() => setFilter("Pending")}
              className="bg-yellow-400 text-white px-4 py-2 rounded-xl"
            >
              Pending
            </button>

            <button
              onClick={() => setFilter("In Progress")}
              className="bg-blue-500 text-white px-4 py-2 rounded-xl"
            >
              In Progress
            </button>

            <button
              onClick={() => setFilter("Resolved")}
              className="bg-green-600 text-white px-4 py-2 rounded-xl"
            >
              Resolved
            </button>

          </div>

        </div>

      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto">

        <table className="w-full min-w-[900px]">

          {/* Table Head */}
          <thead>

            <tr className="bg-slate-100 text-slate-600">

              <th className="text-left p-4 rounded-l-xl">
                ID
              </th>

              <th className="text-left p-4">
                Location
              </th>

              <th className="text-left p-4">
                Status
              </th>

              <th className="text-left p-4">
                Worker
              </th>

              <th className="text-left p-4">
                Date
              </th>

              <th className="text-left p-4 rounded-r-xl">
                Actions
              </th>

            </tr>

          </thead>

          {/* Table Body */}
          <tbody>

            {filteredComplaints.map((complaint, index) => (

              <tr
                key={index}
                className="border-b border-slate-200 hover:bg-slate-50 transition"
              >

                <td className="p-4 font-medium">
                  {complaint.id}
                </td>

                <td className="p-4">
                  {complaint.location}
                </td>

                <td className="p-4">

                  <span
                    className={`
                      px-3 py-1 rounded-full text-sm

                      ${
                        complaint.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"

                          : complaint.status === "In Progress"
                          ? "bg-blue-100 text-blue-700"

                          : "bg-green-100 text-green-700"
                      }
                    `}
                  >
                    {complaint.status}
                  </span>

                </td>

                <td className="p-4">
                  {complaint.worker}
                </td>

                <td className="p-4">
                  {complaint.date}
                </td>

                <td className="p-4 flex gap-2">

                  {/* View */}
                  <button
                    onClick={() => {
                      setSelectedComplaint(complaint)
                      setOpenModal(true)
                    }}
                    className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm"
                  >
                    View
                  </button>

                  {/* Assign */}
                  <button className="bg-emerald-600 text-white px-3 py-1 rounded-lg text-sm">
                    Assign
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => {
                      setSelectedComplaint(complaint)
                      setDeleteModal(true)
                    }}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* View Modal */}
      {openModal && selectedComplaint && (

        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

          <div className="bg-white w-[500px] rounded-2xl p-8 shadow-xl">

            {/* Header */}
            <div className="flex justify-between items-center mb-6">

              <h2 className="text-2xl font-bold text-slate-800">
                Complaint Details
              </h2>

              <button
                onClick={() => setOpenModal(false)}
                className="text-slate-500 text-xl"
              >
                ✕
              </button>

            </div>

            {/* Content */}
            <div className="space-y-4">

              <div>
                <p className="text-slate-500 text-sm">
                  Complaint ID
                </p>

                <h3 className="font-semibold text-lg">
                  {selectedComplaint.id}
                </h3>
              </div>

              <div>
                <p className="text-slate-500 text-sm">
                  Location
                </p>

                <h3 className="font-semibold text-lg">
                  {selectedComplaint.location}
                </h3>
              </div>

              <div>
                <p className="text-slate-500 text-sm">
                  Worker
                </p>

                <h3 className="font-semibold text-lg">
                  {selectedComplaint.worker}
                </h3>
              </div>

              <div>
                <p className="text-slate-500 text-sm">
                  Status
                </p>

                <h3 className="font-semibold text-lg">
                  {selectedComplaint.status}
                </h3>
              </div>

            </div>

          </div>

        </div>

      )}

      {/* Delete Modal */}
      {deleteModal && selectedComplaint && (

        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

          <div className="bg-white w-[400px] rounded-2xl p-8 shadow-xl">

            <h2 className="text-2xl font-bold text-slate-800 mb-4">
              Delete Complaint
            </h2>

            <p className="text-slate-600 mb-6">
              Are you sure you want to delete complaint
              <span className="font-bold">
                {" "} {selectedComplaint.id}
              </span>
              ?
            </p>

            <div className="flex justify-end gap-4">

              <button
                onClick={() => setDeleteModal(false)}
                className="bg-slate-200 px-4 py-2 rounded-xl"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-xl"
              >
                Delete
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  )
}

export default ComplaintTable