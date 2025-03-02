"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaExclamationTriangle, FaGavel, FaShieldAlt } from 'react-icons/fa';

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
      <h1 className="text-3xl font-bold mb-4">Terms and Conditions</h1>

      <section className="mb-6">
        <div className="flex items-center mb-2">
          <motion.div
            className="text-primary mr-2"
            variants={iconVariants}
            whileHover="hover"
          >
            {/* <FaCheckCircle size={20} /> */}
          </motion.div>
          <h2 className="text-2xl font-semibold">1. Acceptance of Terms</h2>
        </div>
        <p>
          By accessing and using the services of NebulaNet, you accept and agree to be bound by the terms and provision of this agreement. Any participation in this service will constitute acceptance of this agreement.
        </p>
      </section>

      <section className="mb-6">
        <div className="flex items-center mb-2">
          <motion.div
            className="text-primary mr-2"
            variants={iconVariants}
            whileHover="hover"
          >
            {/* <FaExclamationTriangle size={20} /> */}
          </motion.div>
          <h2 className="text-2xl font-semibold">2. Description of Service</h2>
        </div>
        <p>
          NebulaNet provides web development services, including but not limited to website design, development, and maintenance. The specifics of each service will be outlined in individual agreements with clients.
        </p>
      </section>

      <section className="mb-6">
        <div className="flex items-center mb-2">
          <motion.div
            className="text-primary mr-2"
            variants={iconVariants}
            whileHover="hover"
          >
            {/* <FaGavel size={20} /> */}
          </motion.div>
          <h2 className="text-2xl font-semibold">3. Intellectual Property</h2>
        </div>
        <p>
          All content provided by NebulaNet, including but not limited to text, graphics, logos, and software, is the property of NebulaNet and is protected by applicable intellectual property laws.
        </p>
      </section>

      <section className="mb-6">
        <div className="flex items-center mb-2">
          <motion.div
            className="text-primary mr-2"
            variants={iconVariants}
            whileHover="hover"
          >
            {/* <FaShieldAlt size={20} /> */}
          </motion.div>
          <h2 className="text-2xl font-semibold">4. Limitation of Liability</h2>
        </div>
        <p>
          NebulaNet shall not be liable for any damages arising out of or in connection with the use of our services. This includes, without limitation, direct loss, loss of business or profits, or any indirect, consequential, or special loss.
        </p>
      </section>

      <section className="mb-6">
        <div className="flex items-center mb-2">
          <motion.div
            className="text-primary mr-2"
            variants={iconVariants}
            whileHover="hover"
          >
            {/* <FaGavel size={20} /> */}
          </motion.div>
          <h2 className="text-2xl font-semibold">5. Governing Law</h2>
        </div>
        <p>
          These terms and conditions are governed by and construed in accordance with the laws of the State of Karnataka, and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
        </p>
      </section>

      <section className="mb-6">
        <div className="flex items-center mb-2">
          <motion.div
            className="text-primary mr-2"
            variants={iconVariants}
            whileHover="hover"
          >
            {/* <FaCheckCircle size={20} /> */}
          </motion.div>
          <h2 className="text-2xl font-semibold">6. Changes to Terms</h2>
        </div>
        <p>
          NebulaNet reserves the right to modify these terms at any time. We will notify clients of significant changes to our terms and conditions by sending a notice to the primary email address provided or by placing a prominent notice on our site.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">Contact Us</h2>
        <p>
          If you have any questions about these Terms, please contact us:
        </p>
        <div className="flex items-center mb-2">
          <motion.div
            className="text-primary mr-2"
            variants={iconVariants}
            whileHover="hover"
          >
            {/* <FaPhoneAlt size={20} /> */}
          </motion.div>
          <span className="text-lg">8123573669</span>
        </div>
        <div className="flex items-center">
          <motion.div
            className="text-primary mr-2"
            variants={iconVariants}
            whileHover="hover"
          >
            {/* <FaMapMarkerAlt size={20} /> */}
          </motion.div>
          <span className="text-lg">127, Mahadeshwara Nagar, Stage 2, BTM Layout, Bengaluru, Karnataka 560076</span>
        </div>
      </section>
    </div>
  );
};

export default page;
