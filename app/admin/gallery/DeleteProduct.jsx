import React from "react";
import { FaExclamationTriangle, FaTimes } from "react-icons/fa";

const DeleteProduct = ({ isOpen, onClose, productId, instagramLink, onDelete }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-red-500">
          <FaTimes size={20} />
        </button>

        {/* Warning Icon */}
        <div className="flex flex-col items-center text-center">
          <FaExclamationTriangle className="text-red-500 text-5xl mb-3" />
          <h2 className="text-xl font-bold text-gray-800 mb-2">Are you sure?</h2>
          <p className="text-gray-600 text-sm">
            Do you really want to delete this post from the gallery?
          </p>
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={onDelete}
            className="flex-1 py-2 bg-black text-white rounded-md mx-1 hover:bg-gray-800 transition-all"
          >
            Delete
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-2 border border-gray-400 text-gray-600 rounded-md mx-1 hover:bg-gray-100 transition-all"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProduct;
