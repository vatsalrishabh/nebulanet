"use client";
import AdminBreadCrumbs from '@/app/components/Admin/AdminBreadCrumbs';
import React, { useState, useEffect } from 'react';
import AllPayments from './AllPayments';
import axios from 'axios';

const RightPayment = () => {
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

  const sampleTransactions = allOrders.map(order => ({
    invoiceId: order.razorpayId || "N/A",
    date: order.createdAt ? new Date(order.createdAt).toISOString().split("T")[0] : "N/A",
    member: order.name || "N/A",
    product: order.productId || "N/A",
    amount: (order.quantity ?? 1) * (order.price ?? 0), // Ensuring valid amount calculation
    status: order.paymentStatus || "Pending",
    address: `${order.roomNumber}, ${order.floor}, ${order.houseNumber}, ${order.streetAddress}, ${order.city}, ${order.state}, ${order.zipcode}`,
    email: order.email || "N/A",
    mobile: order.mobileNumber || "N/A",
  }));

 

  const breadcrumbLinks = [{ label: "Admin", href: "/admin" }];

  return (
    <div className='lg:w-[84%] z-50 w-full absolute right-0 h-[100vh] bg-slate-200 p-6'>
      <div className="p-4">
        <AdminBreadCrumbs links={breadcrumbLinks} name="Payments" />
      </div>
      <AllPayments allTransactions={sampleTransactions} />
    </div>
  );
};

export default RightPayment;
