// src/app/admin/components/forms/AddDocumentModal.js
"use client";
import { useState, useRef } from "react";
import { toast } from "react-toastify";
import { PiX, PiFileDuotone } from "react-icons/pi";

export default function AddDocumentModal({
    documentModal,
    handleClose,
    allDocs,
    setAllDocs,
}) {
    const documentsInputRef = useRef(null);

    const handleSelectDocuments = (e) => {
        e.preventDefault();
        const selectedFiles = [...e.target.files];
        setAllDocs(selectedFiles);
    };

    return (
        <div
            className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 ${documentModal ? "block" : "hidden"
                }`}
        >
            <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-auto relative">
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 bg-primary text-white rounded-full p-2 hover:bg-primary-dark"
                >
                    <PiX size={14} />
                </button>
                <div className="flex flex-col gap-5 p-5">
                    <h3 className="text-lg font-semibold text-primary">Upload Documents</h3>

                    <div className="flex flex-wrap items-center gap-5">
                        {allDocs?.map((doc, index) => (
                            <div
                                key={index}
                                className="flex flex-col w-[100px] items-center text-center gap-2"
                            >
                                <PiFileDuotone size={60} className="text-gray-500" />
                                <p className="text-sm truncate w-full">{doc.name}</p>
                            </div>
                        ))}
                        <button
                            onClick={() => documentsInputRef.current?.click()}
                            className="w-[100px] h-[100px] border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100"
                        >
                            <PiPlus size={24} className="text-gray-500" />
                        </button>
                    </div>

                    <div className="flex justify-center">
                        <button
                            onClick={() => {
                                if (allDocs?.length === 0) {
                                    documentsInputRef.current?.click();
                                } else {
                                    handleClose();
                                }
                            }}
                            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark"
                        >
                            {allDocs?.length === 0 ? "Upload Documents" : "Select"}
                        </button>
                    </div>
                    <input
                        type="file"
                        multiple
                        hidden
                        ref={documentsInputRef}
                        onChange={handleSelectDocuments}
                        accept=".pdf,.xlsx,.doc,.docx"
                    />
                </div>
            </div>
        </div>
    );
}