"use client";
import React, { useEffect, useState } from 'react';
import AdminBreadCrumbs from '@/app/components/Admin/AdminBreadCrumbs';
import InvoiceDetails from './InvoiceDetails';
import axios from 'axios';

const RightManageOrder = () => {
  const [allOrders, setAllOrders] = useState([]);

  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        const response = await axios.post(`/api/admin/getOrders`);
        if (response.data.orders) {
          setAllOrders(response.data.orders);
        } else {
          console.warn("No orders found.");
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchAllOrders();
  }, []);

  const invoiceData = allOrders.map(order => ({
    invoiceId: order.razorpayId || "N/A",
    orderDate: order.createdAt ? new Date(order.createdAt).toISOString().split("T")[0] : "N/A",
    shippedDate: order.createdAt ? new Date(order.createdAt).toISOString().split("T")[0] : "N/A",
    memberName: order.name || "N/A",
    productDescription: order.productId || "N/A",
    status: order.deliveryStatus || "Pending",
    roomNumber: order.roomNumber || "N/A",
    state: order.state || "N/A",
    streetAddress: order.streetAddress || "N/A",
    zipcode: order.zipcode || "N/A",
    quantity: order.quantity || 1,
    mobileNumber: order.mobileNumber || "N/A",
    email: order.email || "N/A",
    floor: order.floor || "N/A",
    house: order.house || "N/A",
    houseNumber: order.houseNumber || "N/A",
  }));

  return (
    <div className="lg:w-[84%] z-50 w-full absolute right-0 h-[100vh] bg-slate-200 p-6">
      <div className="p-4">
        <AdminBreadCrumbs links={[{ label: "Admin", href: "/admin" }]} name="Manage Order" />
      </div>
      <InvoiceDetails allInvoices={invoiceData} />
    </div>
  );
};

export default RightManageOrder;
