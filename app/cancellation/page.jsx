"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';

const page = () => {
  const iconVariants = {
    hover: {
      scale: 1.2,
      rotate: 10,
      transition: { type: 'spring', stiffness: 300 },
    },
  };

  return (
    <div className="container mx-auto p-6 mt-20">
      <h1 className="text-3xl font-bold mb-4">Cancellation and Refund Policy</h1>
      <p className="mb-4">
        At NebulaNet, we are committed to delivering high-quality web development services that meet your expectations. This Cancellation and Refund Policy outlines the terms and conditions regarding project initiation, payments, cancellations, and refunds.
      </p>

      <h2 className="text-2xl font-semibold mb-2">1. Project Initiation and Payment Terms</h2>
      <p className="mb-4">
        To commence a project, a token payment of ₹1,000 is required. This token payment serves as a commitment to the project and allows our team to begin preliminary work. The token payment is non-refundable except under the conditions outlined in Section 3. Upon satisfactory completion of the project, the remaining balance is due. You are entitled to review the completed work, and full payment is required only if you are satisfied with the deliverables.
      </p>

      <h2 className="text-2xl font-semibold mb-2">2. Cancellation Policy</h2>
      <p className="mb-4">
        <strong>Cancellation by Client:</strong> You may cancel the project at any stage by providing written notice to NebulaNet. If the cancellation occurs:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>
          <strong>Before project commencement:</strong> If you decide to cancel the project before any work has begun, the token payment of ₹1,000 will be refunded in full.
        </li>
        <li>
          <strong>After project commencement but before completion:</strong> If you cancel the project after work has begun but before completion, the token payment of ₹1,000 will be retained to cover the work completed up to that point. No additional payments will be required.
        </li>
        <li>
          <strong>After project completion:</strong> If you cancel the project after completion and are dissatisfied with the work, you may request a refund of the token payment. Refund requests must be made within 14 days of project completion and will be reviewed on a case-by-case basis.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mb-2">3. Refund Policy</h2>
      <p className="mb-4">
        We strive to ensure your satisfaction with our services. If you are not satisfied with the completed project, you may request a refund of the token payment of ₹1,000. Refund requests must be submitted in writing within 14 days of project completion. Upon receipt of a refund request, we will assess the situation and, if deemed appropriate, process the refund within 14 business days.
      </p>

      <h2 className="text-2xl font-semibold mb-2">4. Contact Us</h2>
      <p className="mb-4">
        If you have any questions or concerns regarding this Cancellation and Refund Policy, please contact us at:
      </p>
      <div className="flex items-center mb-2">
        <motion.div
          className="text-primary mr-2"
          variants={iconVariants}
          whileHover="hover"
        >
          <FaPhoneAlt size={20} />
        </motion.div>
        <span className="text-lg">8123573669</span>
      </div>
      <div className="flex items-center">
        <motion.div
          className="text-primary mr-2"
          variants={iconVariants}
          whileHover="hover"
        >
          <FaMapMarkerAlt size={20} />
        </motion.div>
        <span className="text-lg">127, Mahadeshwara Nagar, Stage 2, BTM Layout, Bengaluru, Karnataka 560076</span>
      </div>
    </div>
  );
};

export default page;
