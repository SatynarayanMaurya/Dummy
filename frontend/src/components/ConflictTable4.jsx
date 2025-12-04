import React, { useState } from "react";
import { AlertCircle, CheckSquare, Square } from "lucide-react";

function ConflictTable4() {
  const dummyConflicts = [
    {
      id: 1,
      name: "R-11",
      macAddress: "1234",
      status: "Duplicate Name",
      existingId: 101
    },
    {
      id: 2,
      name: "R-12",
      macAddress: "5678",
      status: "Duplicate MacAddress",
      existingId: 102
    },
    {
      id: 3,
      name: "R-13",
      macAddress: "9999",
      status: "Name & Mac Conflict",
      existingId: 103
    }
  ];

  const [rows, setRows] = useState(dummyConflicts);
  const [selected, setSelected] = useState({});
  const [selectAll, setSelectAll] = useState(false);

  const toggleSelect = (id) => {
    setSelected((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      const allChecked = rows.every((row) => updated[row.id]);
      setSelectAll(allChecked);
      return updated;
    });
  };

  const toggleSelectAll = () => {
    const newState = !selectAll;
    setSelectAll(newState);
    const newSelected = {};
    rows.forEach((r) => {
      newSelected[r.id] = newState;
    });
    setSelected(newSelected);
  };

  const handleUpdate = () => {
    const selectedRows = rows.filter((r) => selected[r.id]);
    console.log("UPDATE THESE ROWS:", selectedRows);
    alert(`Updating ${selectedRows.length} device(s)`);
  };

  const handleIgnore = () => {
    const selectedRows = rows.filter((r) => selected[r.id]);
    console.log("IGNORE THESE ROWS:", selectedRows);
    alert(`Ignoring ${selectedRows.length} conflict(s)`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Duplicate Name":
        return "text-amber-700 bg-amber-50";
      case "Duplicate MacAddress":
        return "text-orange-700 bg-orange-50";
      case "Name & Mac Conflict":
        return "text-red-700 bg-red-50";
      default:
        return "text-gray-700 bg-gray-50";
    }
  };

  const selectedCount = Object.values(selected).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Compact Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Device Conflicts</h1>
            <p className="text-sm text-gray-500 mt-0.5">{rows.length} conflicts found</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleIgnore}
              disabled={selectedCount === 0}
              className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Ignore ({selectedCount})
            </button>
            <button
              onClick={handleUpdate}
              disabled={selectedCount === 0}
              className="px-3 py-1.5 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Update ({selectedCount})
            </button>
          </div>
        </div>

        {/* Compact Table Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-slate-50">
              <tr>
                <th scope="col" className="w-10 px-4 py-2">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                    checked={selectAll}
                    onChange={toggleSelectAll}
                  />
                </th>
                <th scope="col" className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Device
                </th>
                <th scope="col" className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  MAC Address
                </th>
                <th scope="col" className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Existing ID
                </th>
                <th scope="col" className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Conflict Type
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {rows.map((item) => {
                const isSelected = !!selected[item.id];
                return (
                  <tr
                    key={item.id}
                    className={`transition-colors ${
                      isSelected ? 'bg-blue-50' : 'hover:bg-gray-50'
                    }`}
                  >
                    <td className="px-4 py-2.5">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                        checked={isSelected}
                        onChange={() => toggleSelect(item.id)}
                      />
                    </td>
                    <td className="px-4 py-2.5">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 bg-slate-100 rounded flex items-center justify-center flex-shrink-0">
                          <span className="text-xs font-semibold text-slate-600">
                            {item.name.split('-')[1]}
                          </span>
                        </div>
                        <span className="text-sm font-medium text-gray-900">{item.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-2.5">
                      <code className="text-xs font-mono text-gray-700 bg-gray-100 px-2 py-0.5 rounded">
                        {item.macAddress}
                      </code>
                    </td>
                    <td className="px-4 py-2.5">
                      <span className="text-sm text-gray-600">#{item.existingId}</span>
                    </td>
                    <td className="px-4 py-2.5">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${getStatusColor(item.status)}`}>
                        <AlertCircle className="w-3 h-3" />
                        {item.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Compact Footer */}
        <div className="mt-3 text-xs text-gray-500 flex items-center justify-between">
          <span>Total: {rows.length} conflicts</span>
          {selectedCount > 0 && (
            <span className="text-blue-600 font-medium">{selectedCount} selected</span>
          )}
        </div>
      </div>
    </div>
  );
}


export default ConflictTable4
