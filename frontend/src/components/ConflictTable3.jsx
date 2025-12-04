import React, { useState } from "react";
import { AlertCircle, Info } from "lucide-react";

function ConflictTable3() {
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
        return "text-amber-700 bg-amber-50 border-amber-200";
      case "Duplicate MacAddress":
        return "text-orange-700 bg-orange-50 border-orange-200";
      case "Name & Mac Conflict":
        return "text-red-700 bg-red-50 border-red-200";
      default:
        return "text-gray-700 bg-gray-50 border-gray-200";
    }
  };

  const selectedCount = Object.values(selected).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-900">Conflict Resolution</h1>
          <p className="mt-2 text-sm text-gray-600">
            Review and resolve device configuration conflicts
          </p>
        </div>

        {/* Alert Banner */}
        <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="text-sm font-medium text-blue-900">Action Required</h3>
            <p className="mt-1 text-sm text-blue-700">
              {rows.length} device conflict{rows.length !== 1 ? 's' : ''} detected. Please review and take appropriate action.
            </p>
          </div>
        </div>

        {/* Main Table Card */}
        <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
          {/* Table Header with Actions */}
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    checked={selectAll}
                    onChange={toggleSelectAll}
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Select All
                  </span>
                </label>
                {selectedCount > 0 && (
                  <span className="text-sm text-gray-500">
                    {selectedCount} selected
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleIgnore}
                  disabled={selectedCount === 0}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Ignore
                </button>
                <button
                  onClick={handleUpdate}
                  disabled={selectedCount === 0}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Update Selected
                </button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="w-12 px-6 py-3"></th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Device Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    MAC Address
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Existing ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {rows.map((item) => {
                  const isSelected = !!selected[item.id];
                  return (
                    <tr
                      key={item.id}
                      className={`transition-colors ${
                        isSelected ? 'bg-blue-50' : 'hover:bg-gray-50'
                      }`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                          checked={isSelected}
                          onChange={() => toggleSelect(item.id)}
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center">
                            <span className="text-sm font-semibold text-gray-600">
                              {item.name.split('-')[1]}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {item.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-mono text-gray-900 bg-gray-100 px-3 py-1 rounded inline-block">
                          {item.macAddress}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-600">
                          #{item.existingId}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border ${getStatusColor(item.status)}`}>
                          <AlertCircle className="w-3.5 h-3.5" />
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
            <div className="text-sm text-gray-500">
              Showing <span className="font-medium text-gray-900">{rows.length}</span> conflict{rows.length !== 1 ? 's' : ''}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConflictTable3
