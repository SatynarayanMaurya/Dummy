import React, { useState } from "react";
import { AlertTriangle, CheckCircle2, XCircle, Wifi, Monitor } from "lucide-react";

function ConflictTable2() {
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
    alert(`Updating ${selectedRows.length} devices...`);
  };

  const handleIgnore = () => {
    const selectedRows = rows.filter((r) => selected[r.id]);
    console.log("IGNORE THESE ROWS:", selectedRows);
    alert(`Ignoring ${selectedRows.length} conflicts...`);
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case "Duplicate Name":
        return {
          color: "from-yellow-400 to-amber-500",
          bg: "bg-yellow-50",
          text: "text-yellow-700",
          icon: <AlertTriangle className="w-4 h-4" />
        };
      case "Duplicate MacAddress":
        return {
          color: "from-orange-400 to-red-500",
          bg: "bg-orange-50",
          text: "text-orange-700",
          icon: <XCircle className="w-4 h-4" />
        };
      case "Name & Mac Conflict":
        return {
          color: "from-red-500 to-pink-600",
          bg: "bg-red-50",
          text: "text-red-700",
          icon: <AlertTriangle className="w-4 h-4" />
        };
      default:
        return {
          color: "from-gray-400 to-gray-500",
          bg: "bg-gray-50",
          text: "text-gray-700",
          icon: <AlertTriangle className="w-4 h-4" />
        };
    }
  };

  const selectedCount = Object.values(selected).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-lg">
              <Wifi className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Device Conflicts
              </h1>
              <p className="text-gray-600 mt-1">Resolve network device conflicts to maintain optimal performance</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-2xl p-5 shadow-md border border-purple-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Total Conflicts</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{rows.length}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-md border border-green-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Selected</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{selectedCount}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-md border border-blue-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Devices Active</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{rows.length}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                <Monitor className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
          {/* Toolbar */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-5">
            <div className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    className="w-6 h-6 rounded-lg border-2 border-white/30 bg-white/10 text-white focus:ring-2 focus:ring-white/50 cursor-pointer"
                    checked={selectAll}
                    onChange={toggleSelectAll}
                  />
                </div>
                <span className="ml-3 text-white font-semibold text-lg">
                  Select All Devices
                </span>
              </label>
              
              <div className="flex gap-3">
                <button
                  onClick={handleIgnore}
                  disabled={selectedCount === 0}
                  className="px-6 py-2.5 rounded-xl font-medium bg-white/20 hover:bg-white/30 text-white border-2 border-white/30 backdrop-blur-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Ignore ({selectedCount})
                </button>
                
                <button
                  onClick={handleUpdate}
                  disabled={selectedCount === 0}
                  className="px-6 py-2.5 rounded-xl font-medium bg-white text-purple-600 hover:bg-gray-50 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Update ({selectedCount})
                </button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden">
                {rows.map((item, index) => {
                  const statusConfig = getStatusConfig(item.status);
                  const isSelected = !!selected[item.id];
                  
                  return (
                    <div
                      key={item.id}
                      className={`flex items-center p-6 border-b border-gray-100 transition-all cursor-pointer ${
                        isSelected 
                          ? 'bg-gradient-to-r from-purple-50 to-pink-50' 
                          : 'hover:bg-gray-50'
                      }`}
                      onClick={() => toggleSelect(item.id)}
                    >
                      {/* Checkbox */}
                      <div className="flex-shrink-0 mr-5">
                        <input
                          type="checkbox"
                          className="w-5 h-5 rounded-lg border-2 border-purple-300 text-purple-600 focus:ring-2 focus:ring-purple-500 cursor-pointer"
                          checked={isSelected}
                          onChange={() => {}}
                        />
                      </div>

                      {/* Device Info */}
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                        {/* Name & Avatar */}
                        <div className="flex items-center gap-4">
                          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${statusConfig.color} flex items-center justify-center shadow-lg`}>
                            <span className="text-white font-bold text-lg">{item.name.split('-')[1]}</span>
                          </div>
                          <div>
                            <p className="font-bold text-gray-900 text-lg">{item.name}</p>
                            <p className="text-sm text-gray-500">Existing ID: {item.existingId}</p>
                          </div>
                        </div>

                        {/* MAC Address */}
                        <div className="flex flex-col">
                          <span className="text-xs text-gray-500 font-medium mb-1">MAC ADDRESS</span>
                          <span className="font-mono text-sm font-semibold text-gray-700 bg-gray-100 px-3 py-1.5 rounded-lg inline-block">
                            {item.macAddress}
                          </span>
                        </div>

                        {/* Status */}
                        <div className="flex flex-col">
                          <span className="text-xs text-gray-500 font-medium mb-1">CONFLICT STATUS</span>
                          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full ${statusConfig.bg} ${statusConfig.text} font-semibold text-sm w-fit`}>
                            {statusConfig.icon}
                            <span>{item.status}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
            <p className="text-sm text-gray-600 text-center">
              {selectedCount === 0 
                ? "Select devices to resolve conflicts"
                : `${selectedCount} device${selectedCount > 1 ? 's' : ''} selected • Ready to process`
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


export default ConflictTable2;
