import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import api from "../api/api";

export default function Organizations() {
  const [organizations, setOrganizations] = useState([]);

  useEffect(() => {
    loadOrganizations();
  }, []);

  const loadOrganizations = async () => {
    try {
      const res = await api.get("/organizations");
      setOrganizations(res.data.organizations || []);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Organizations</h1>

      <table className="w-full border border-gray-300 bg-white shadow rounded-lg">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="p-3">ID</th>
            <th className="p-3">Organization Name</th>
            <th className="p-3">Created</th>
          </tr>
        </thead>

        <tbody>
          {organizations.map((org) => (
            <tr key={org.id} className="text-center border-t">
              <td className="p-3">{org.id}</td>
              <td className="p-3">{org.name}</td>
              <td className="p-3">
                {new Date(org.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </DashboardLayout>
  );
}