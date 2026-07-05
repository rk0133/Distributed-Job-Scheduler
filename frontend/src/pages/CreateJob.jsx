import { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import api from "../api/api";

export default function CreateJob() {
  const [form, setForm] = useState({
    title: "",
    priority: "MEDIUM",
    scheduledAt: "",
    isRecurring: false,
    cronExpression: "",
  });

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const createJob = async () => {
    try {
     console.log(form);

await api.post("/jobs", form);

      alert("Job Created Successfully");

      setForm({
        title: "",
        priority: "MEDIUM",
        scheduledAt: "",
        isRecurring: false,
        cronExpression: "",
      });

    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  return (
    <DashboardLayout>
      <h1>Create Job</h1>

      <br />

      <input
        name="title"
        placeholder="Job Title"
        value={form.title}
        onChange={handleChange}
      />

      <br /><br />

      <select
        name="priority"
        value={form.priority}
        onChange={handleChange}
      >
        <option>LOW</option>
        <option>MEDIUM</option>
        <option>HIGH</option>
      </select>

      <br /><br />

      <input
        type="datetime-local"
        name="scheduledAt"
        value={form.scheduledAt}
        onChange={handleChange}
      />

      <br /><br />

      <label>
        <input
          type="checkbox"
          name="isRecurring"
          checked={form.isRecurring}
          onChange={handleChange}
        />
        Recurring Job
      </label>

      <br /><br />

      <input
        name="cronExpression"
        placeholder="*/1 * * * *"
        value={form.cronExpression}
        onChange={handleChange}
      />

      <br /><br />

      <button onClick={createJob}>
        Create Job
      </button>
    </DashboardLayout>
  );
}