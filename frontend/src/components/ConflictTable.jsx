import React, { useState } from "react";

function ConflictTable() {
  // ---------- Dummy data (you can replace with API data) ----------
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

  // ---------- States ----------
  const [rows, setRows] = useState(dummyConflicts);
  const [selected, setSelected] = useState({});
  const [selectAll, setSelectAll] = useState(false);

  // ---------- Toggle single row ----------
  const toggleSelect = (id) => {
    setSelected((prev) => {
      const updated = { ...prev, [id]: !prev[id] };

      // If manually change a checkbox → disable "select all"
      const allChecked = rows.every((row) => updated[row.id]);
      setSelectAll(allChecked);

      return updated;
    });
  };

  // ---------- Toggle all rows ----------
  const toggleSelectAll = () => {
    const newState = !selectAll;
    setSelectAll(newState);

    const newSelected = {};
    rows.forEach((r) => {
      newSelected[r.id] = newState;
    });

    setSelected(newSelected);
  };

  // ---------- Actions ----------
  const handleUpdate = () => {
    const selectedRows = rows.filter((r) => selected[r.id]);
    console.log("UPDATE THESE ROWS:", selectedRows);
    alert("Update operation triggered. Check console.");
  };

  const handleIgnore = () => {
    const selectedRows = rows.filter((r) => selected[r.id]);
    console.log("IGNORE THESE ROWS:", selectedRows);
    alert("Ignore operation triggered. Check console.");
  };

  // ==================================================================

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Conflict Data</h2>

      {/* ---------- Select All ---------- */}
      <div className="flex items-center mb-2">
        <input
          type="checkbox"
          className="mr-2"
          checked={selectAll}
          onChange={toggleSelectAll}
        />
        <span className="font-medium">Select All</span>
      </div>

      {/* ---------- Table ---------- */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-3 w-10"></th>
            <th className="p-3">Remote Name</th>
            <th className="p-3">Mac Address</th>
            <th className="p-3">Status</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((item) => (
            <tr key={item.id} className="border-b">
              <td className="p-3">
                <input
                  type="checkbox"
                  checked={!!selected[item.id]}
                  onChange={() => toggleSelect(item.id)}
                />
              </td>
              <td className="p-3">{item.name}</td>
              <td className="p-3">{item.macAddress}</td>
              <td className="p-3 text-red-600 font-medium">{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ---------- Buttons ---------- */}
      <div className="mt-4 flex gap-4">
        <button
          onClick={handleUpdate}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
        >
          Update Selected
        </button>

        <button
          onClick={handleIgnore}
          className="bg-gray-600 text-white px-5 py-2 rounded-lg hover:bg-gray-700"
        >
          Ignore Selected
        </button>
      </div>
    </div>
  );
}

export default ConflictTable;
