"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button, TextField, IconButton, MenuItem, Select } from "@mui/material";
import { Search, FilterList, Visibility, ArrowUpward, ArrowDownward } from "@mui/icons-material";
import InvoiceModal from "./InvoiceModal";

const InvoiceDetails = ({ allInvoices }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredInvoices, setFilteredInvoices] = useState(allInvoices);
  const [sortField, setSortField] = useState("orderDate");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sync filtered invoices with `allInvoices` when it updates
  useEffect(() => {
    setFilteredInvoices(allInvoices);
  }, [allInvoices]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-500 text-white";
      case "Shipped":
        return "bg-blue-500 text-white";
      case "Delivered":
        return "bg-green-500 text-white";
      default:
        return "bg-gray-400 text-white";
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredInvoices(allInvoices.filter((invoice) => invoice.invoiceId.toLowerCase().includes(query)));
  };

  const handleSort = (field) => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(newOrder);
 

    setFilteredInvoices(prevInvoices => [...prevInvoices].sort((a, b) => {
      if (field === "orderDate" || field === "shippedDate") {
        return newOrder === "asc" ? new Date(a[field]) - new Date(b[field]) : new Date(b[field]) - new Date(a[field]);
      } else if (field === "invoiceId" || field === "memberName") {
        return newOrder === "asc" ? a[field].localeCompare(b[field]) : b[field].localeCompare(a[field]);
      }
      return 0;
    }));
  };

  const openModal = (invoice) => {
    // console.log(invoice)
    setSelectedInvoice(invoice);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedInvoice(null);
  };

  // console.log(selectedInvoice+"selected invoce ")

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <motion.h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        Invoice Records <FilterList className="ml-2 text-gray-600" />
      </motion.h2>

      <div className="flex items-center space-x-4 mb-4">
        <TextField label="Search Invoice ID" variant="outlined" size="small" fullWidth value={searchQuery} onChange={handleSearch} InputProps={{ startAdornment: <Search className="text-gray-500" /> }} />
        <Select value={sortField} onChange={(e) => handleSort(e.target.value)} size="small">
          <MenuItem value="orderDate">Order Date</MenuItem>
          <MenuItem value="shippedDate">Shipped Date</MenuItem>
          <MenuItem value="invoiceId">Invoice ID</MenuItem>
          <MenuItem value="memberName">Member Name</MenuItem>
        </Select>
        <IconButton onClick={() => handleSort(sortField)}>{sortOrder === "asc" ? <ArrowUpward /> : <ArrowDownward />}</IconButton>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-500 text-white">
            <tr>
              {["Sno", "Invoice ID", "Order Date", "Shipped Date", "Member Name", "Product Description", "Status", "Action"].map((heading, index) => (
                <th key={index} className="py-3 px-4 text-left font-semibold">{heading}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredInvoices.length > 0 ? (
              filteredInvoices.map((invoice, index) => (
                <motion.tr key={invoice.invoiceId} className="border-b last:border-none hover:bg-gray-200 transition-all" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: index * 0.1 }}>
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4">{invoice.invoiceId}</td>
                  <td className="py-3 px-4">{invoice.orderDate}</td>
                  <td className="py-3 px-4">{invoice.shippedDate}</td>
                  <td className="py-3 px-4">{invoice.memberName}</td>
                  <td className="py-3 px-4">{invoice.productDescription}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-md text-sm ${getStatusColor(invoice.status)}`}>{invoice.status}</span>
                  </td>
                  <td className="py-3 px-4"><IconButton onClick={() => openModal(invoice)}><Visibility /></IconButton></td>
                </motion.tr>
              ))
            ) : (
              <tr><td colSpan="8" className="text-center py-4 text-gray-500">No invoices found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <InvoiceModal open={isModalOpen} onClose={closeModal} invoice={selectedInvoice} />
    </div>
  );
};

export default InvoiceDetails;
