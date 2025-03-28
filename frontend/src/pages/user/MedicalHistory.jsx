import React, { useState } from "react";

const MedicalRecords = () => {
    const [prescriptions, setPrescriptions] = useState([
        { id: 1, date: "2024-03-15", reason: "Fever & Cold", image: "https://via.placeholder.com/150" },
        { id: 2, date: "2024-02-10", reason: "Headache", image: "https://via.placeholder.com/150" }
    ]);
    const [newPrescription, setNewPrescription] = useState({ date: "", reason: "", image: "" });
    const [filter, setFilter] = useState("all");
    const [sortOrder, setSortOrder] = useState("desc");
    const [selectedPrescription, setSelectedPrescription] = useState(null);
    const [zoom, setZoom] = useState(1);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewPrescription({ ...newPrescription, [name]: value });
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setNewPrescription({ ...newPrescription, image: imageUrl });
        }
    };

    const addPrescription = () => {
        if (newPrescription.date && newPrescription.reason && newPrescription.image) {
            setPrescriptions([...prescriptions, { ...newPrescription, id: prescriptions.length + 1 }]);
            setNewPrescription({ date: "", reason: "", image: "" });
        }
    };

    const deletePrescription = (id) => {
        setPrescriptions(prescriptions.filter(p => p.id !== id));
    };

    const filterPrescriptions = () => {
        const now = new Date();
        return prescriptions.filter(p => {
            const prescriptionDate = new Date(p.date);
            if (filter === "week") {
                return (now - prescriptionDate) / (1000 * 60 * 60 * 24) <= 7;
            } else if (filter === "month") {
                return (now - prescriptionDate) / (1000 * 60 * 60 * 24) <= 30;
            } else if (filter === "year") {
                return (now - prescriptionDate) / (1000 * 60 * 60 * 24) <= 365;
            }
            return true;
        });
    };

    const sortedPrescriptions = [...filterPrescriptions()].sort((a, b) => sortOrder === "desc" ? new Date(b.date) - new Date(a.date) : new Date(a.date) - new Date(b.date));

    return (
        <div className="w-full max-w-4xl mx-auto p-6 bg-gradient-to-b from-blue-50 to-indigo-50 min-h-screen">
            <h1 className="text-3xl font-bold text-indigo-600 mb-6">Medical Records</h1>
            
            {/* Add New Prescription */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-2xl font-semibold mb-4 text-indigo-600">Add New Prescription</h2>
                <div className="grid gap-4">
                    <input type="date" name="date" value={newPrescription.date} onChange={handleInputChange} className="border p-2 rounded w-full" />
                    <input type="text" name="reason" placeholder="Reason" value={newPrescription.reason} onChange={handleInputChange} className="border p-2 rounded w-full" />
                    <input type="file" onChange={handleFileUpload} className="border p-2 rounded w-full" />
                    <button onClick={addPrescription} className="bg-indigo-600 text-white px-4 py-2 rounded shadow hover:bg-indigo-700">Add Prescription</button>
                </div>
            </div>

            {/* Prescription List */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between mb-4">
                    <h2 className="text-2xl font-semibold text-indigo-600">Previous Prescriptions</h2>
                    <div className="flex gap-2">
                        <select onChange={(e) => setFilter(e.target.value)} className="border px-3 py-1 rounded">
                            <option value="all">All</option>
                            <option value="week">Past Week</option>
                            <option value="month">Past Month</option>
                            <option value="year">Past Year</option>
                        </select>
                        <button onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")} className="bg-gray-200 px-3 py-1 rounded">Sort {sortOrder === "desc" ? "Oldest" : "Newest"}</button>
                    </div>
                </div>
                <div className="overflow-x-auto whitespace-nowrap flex gap-4 p-2">
                    {sortedPrescriptions.map(prescription => (
                        <div key={prescription.id} className="border p-4 rounded-lg shadow-md bg-indigo-100 min-w-[200px] cursor-pointer">
                            <p className="font-semibold">{prescription.date}</p>
                            <p className="text-gray-700">{prescription.reason}</p>
                            <img src={prescription.image} alt="Prescription" className="w-32 h-32 mt-2 rounded" />
                            <div className="flex justify-between mt-2">
                                <button onClick={() => deletePrescription(prescription.id)} className="bg-red-500 text-white px-3 py-1 rounded shadow hover:bg-red-700">Delete</button>
                                <button onClick={() => { setSelectedPrescription(prescription); setZoom(1); }} className="bg-blue-500 text-white px-3 py-1 rounded shadow hover:bg-blue-700">View</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* View Prescription Overlay */}
            {selectedPrescription && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50" onWheel={(e) => setZoom(prev => Math.max(1, prev + e.deltaY * -0.001))}>
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
                        <h2 className="text-2xl font-semibold mb-4">Prescription Details</h2>
                        <p><strong>Date:</strong> {selectedPrescription.date}</p>
                        <p><strong>Reason:</strong> {selectedPrescription.reason}</p>
                        <div className="flex justify-center items-center">
                            <img src={selectedPrescription.image} alt="Prescription" className="mt-4 rounded" style={{ transform: `scale(${zoom})`, transition: "transform 0.2s" }} />
                        </div>
                        <div className="flex justify-between mt-4">
                            <button onClick={() => setSelectedPrescription(null)} className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-700">Close</button>
                            <a href={selectedPrescription.image} download className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-700">Download</a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MedicalRecords;

