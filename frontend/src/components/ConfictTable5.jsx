import React, { useState } from "react";
import { AlertTriangle, X, Check } from "lucide-react";

function ConfictTable5() {
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

  const getStatusStyle = (status) => {
    switch (status) {
      case "Duplicate Name":
        return { bg: "bg-yellow-100", text: "text-yellow-800", border: "border-yellow-300" };
      case "Duplicate MacAddress":
        return { bg: "bg-orange-100", text: "text-orange-800", border: "border-orange-300" };
      case "Name & Mac Conflict":
        return { bg: "bg-red-100", text: "text-red-800", border: "border-red-300" };
      default:
        return { bg: "bg-gray-100", text: "text-gray-800", border: "border-gray-300" };
    }
  };

  const selectedCount = Object.values(selected).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header with Actions */}
        <div className="bg-white rounded-t-xl border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-red-500 to-orange-500">
                <AlertTriangle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Conflict Resolution Manager</h2>
                <p className="text-sm text-gray-500">{rows.length} devices require attention</p>
              </div>
            </div>
            
            {selectedCount > 0 && (
              <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-lg border border-blue-200">
                <span className="text-sm font-medium text-blue-700">{selectedCount} Selected</span>
                <div className="h-4 w-px bg-blue-300"></div>
                <button
                  onClick={handleIgnore}
                  className="flex items-center gap-1 px-3 py-1 text-sm font-medium text-gray-700 hover:bg-white rounded transition-colors"
                >
                  <X className="w-4 h-4" />
                  Ignore
                </button>
                <button
                  onClick={handleUpdate}
                  className="flex items-center gap-1 px-3 py-1 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded transition-colors"
                >
                  <Check className="w-4 h-4" />
                  Update
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-b-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-3 w-12">
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={toggleSelectAll}
                      className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wide">
                    Device Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wide">
                    MAC Address
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wide">
                    Existing ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wide">
                    Conflict Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {rows.map((item) => {
                  const isSelected = !!selected[item.id];
                  const statusStyle = getStatusStyle(item.status);
                  
                  return (
                    <tr
                      key={item.id}
                      className={`transition-all cursor-pointer ${
                        isSelected 
                          ? 'bg-blue-50 hover:bg-blue-100' 
                          : 'bg-white hover:bg-gray-50'
                      }`}
                      onClick={() => toggleSelect(item.id)}
                    >
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => {}}
                          className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                            {item.name.split('-')[1]}
                          </div>
                          <span className="text-sm font-semibold text-gray-900">{item.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-block px-3 py-1 text-xs font-mono font-semibold text-gray-700 bg-gray-100 rounded-md border border-gray-200">
                          {item.macAddress}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-medium text-gray-600">#{item.existingId}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}`}>
                          <div className="w-1.5 h-1.5 rounded-full bg-current"></div>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          {/* Footer */}
          <div className="bg-gray-50 border-t border-gray-200 px-6 py-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">
                Displaying <span className="font-semibold text-gray-900">{rows.length}</span> of <span className="font-semibold text-gray-900">{rows.length}</span> conflicts
              </span>
              <span className="text-gray-500">
                Last updated: Just now
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default ConfictTable5
