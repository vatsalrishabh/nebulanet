// AllPayments.jsx
"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button, TextField, IconButton, MenuItem, Select } from "@mui/material";
import { Search, FilterList, Visibility, ArrowUpward, ArrowDownward } from "@mui/icons-material";
import TransactionModal from "./TransactionModal";

const AllPayments = ({ allTransactions }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [sortField, setSortField] = useState("date");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 🔹 Ensure filteredTransactions updates when new transactions arrive
  useEffect(() => {
    setFilteredTransactions(allTransactions);
  }, [allTransactions]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-500 text-white";
      case "Completed":
        return "bg-green-500 text-white";
      case "Unsuccessful":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-400 text-white";
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    const filtered = allTransactions.filter((transaction) =>
      transaction.invoiceId.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredTransactions(filtered);
  };

  const handleSort = (field) => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(newOrder);
    const sortedData = [...filteredTransactions].sort((a, b) => {
      if (field === "amount") {
        return newOrder === "asc" ? a.amount - b.amount : b.amount - a.amount;
      } else if (field === "date") {
        return newOrder === "asc" ? new Date(a.date) - new Date(b.date) : new Date(b.date) - new Date(a.date);
      } else if (field === "invoiceId") {
        return newOrder === "asc" ? a.invoiceId.localeCompare(b.invoiceId) : b.invoiceId.localeCompare(a.invoiceId);
      }
      return 0;
    });
    setFilteredTransactions(sortedData);
  };

  const openModal = (transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTransaction(null);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <motion.h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        Transactions <FilterList className="ml-2 text-gray-600" />
      </motion.h2>

      <div className="flex items-center space-x-4 mb-4">
        <TextField label="Search Invoice ID" variant="outlined" size="small" fullWidth value={searchQuery} onChange={handleSearch} InputProps={{ startAdornment: <Search className="text-gray-500" /> }} />
        <Select value={sortField} onChange={(e) => handleSort(e.target.value)} size="small">
          <MenuItem value="date">Date</MenuItem>
          <MenuItem value="amount">Amount</MenuItem>
          <MenuItem value="invoiceId">Invoice ID</MenuItem>
        </Select>
        <IconButton onClick={() => handleSort(sortField)}>{sortOrder === "asc" ? <ArrowUpward /> : <ArrowDownward />}</IconButton>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-400 text-white">
            <tr>
              {["Sno", "Invoice ID", "Date", "Member", "Product", "Amount", "Status", "Action"].map((heading, index) => (
                <th key={index} className="py-3 px-4 text-left font-semibold">{heading}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction, index) => (
                <motion.tr key={transaction.invoiceId} className="border-b last:border-none hover:bg-gray-200 transition-all" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: index * 0.1 }}>
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4">{transaction.invoiceId}</td>
                  <td className="py-3 px-4">{transaction.date}</td>
                  <td className="py-3 px-4">{transaction.member}</td>
                  <td className="py-3 px-4">{transaction.product}</td>
                  <td className="py-3 px-4">₹{transaction.amount}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-md text-sm ${getStatusColor(transaction.status)}`}>{transaction.status}</span>
                  </td>
                  <td className="py-3 px-4">
                    <IconButton className="text-custom-green hover:text-green-700 transition-all" onClick={() => openModal(transaction)}>
                      <Visibility />
                    </IconButton>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-4 text-gray-500">No transactions found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <TransactionModal open={isModalOpen} onClose={closeModal} transaction={selectedTransaction} />
    </div>
  );
};

export default AllPayments;
