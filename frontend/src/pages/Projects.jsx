import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import api from "../api/api";

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const res = await api.get("/projects");
      setProjects(res.data.projects || []);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Projects</h1>

      <table className="w-full border border-gray-300 bg-white shadow rounded-lg">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="p-3">ID</th>
            <th className="p-3">Project Name</th>
            <th className="p-3">Description</th>
            <th className="p-3">Organization ID</th>
            <th className="p-3">Created</th>
          </tr>
        </thead>

        <tbody>
          {projects.map((project) => (
            <tr key={project.id} className="text-center border-t">
              <td className="p-3">{project.id}</td>
              <td className="p-3">{project.name}</td>
              <td className="p-3">{project.description}</td>
              <td className="p-3">{project.organizationId}</td>
              <td className="p-3">
                {new Date(project.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </DashboardLayout>
  );
}