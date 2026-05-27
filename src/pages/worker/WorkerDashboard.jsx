import React from "react";
import TaskCard from "../../components/worker/TaskCard";
import { assignedTasks } from "../../data/tasks";

export default function WorkerDashboard() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Worker Dashboard</h1>

      <div style={{ marginTop: "20px" }}>
        {assignedTasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}