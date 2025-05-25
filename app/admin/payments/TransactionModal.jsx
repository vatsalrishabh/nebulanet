import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Grid, Avatar, Box } from "@mui/material";
import { Email, Phone, LocationOn, Person, CalendarToday, Payment, Verified } from "@mui/icons-material";

const TransactionModal = ({ open, onClose, transaction }) => {
  if (!transaction) return null; // Ensure transaction data exists

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ textAlign: "center", fontWeight: "bold" }}>Transaction Details</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" alignItems="center" gap={2} mb={2}>
          <Avatar
            sx={{ width: 80, height: 80, bgcolor: "primary.main" }}
            src={transaction.photo || ""}
            alt={transaction.name}
          >
            {transaction.name ? transaction.name.charAt(0) : "?"}
          </Avatar>
          <Typography variant="h6" fontWeight="bold">{transaction.name}</Typography>
        </Box>

        <Grid container spacing={2}>
          {/* Invoice & Date */}
          <Grid item xs={6}>
            <Typography variant="body1"><Payment sx={{ verticalAlign: "middle" }} /> <strong>Invoice ID:</strong> {transaction.invoiceId}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1"><CalendarToday sx={{ verticalAlign: "middle" }} /> <strong>Date:</strong> {transaction.date}</Typography>
          </Grid>

          {/* Member & Product */}
          <Grid item xs={6}>
            <Typography variant="body1"><Person sx={{ verticalAlign: "middle" }} /> <strong>Member:</strong> {transaction.member}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1"><Verified sx={{ verticalAlign: "middle" }} /> <strong>Product:</strong> {transaction.product}</Typography>
          </Grid>

          {/* Amount & Status */}
          <Grid item xs={6}>
            <Typography variant="body1"><Payment sx={{ verticalAlign: "middle" }} /> <strong>Amount:</strong> ₹{transaction.amount}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1"><Verified sx={{ verticalAlign: "middle" }} /> <strong>Status:</strong> {transaction.status}</Typography>
          </Grid>

          {/* Personal Details */}
          <Grid item xs={6}>
            <Typography variant="body1"><Person sx={{ verticalAlign: "middle" }} /> <strong>Age:</strong> {transaction.age}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1"><Person sx={{ verticalAlign: "middle" }} /> <strong>Gender:</strong> {transaction.gender}</Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="body1"><LocationOn sx={{ verticalAlign: "middle" }} /> <strong>Address:</strong> {transaction.address}</Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="body1"><Email sx={{ verticalAlign: "middle" }} /> <strong>Email:</strong> {transaction.email}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1"><Phone sx={{ verticalAlign: "middle" }} /> <strong>Mobile:</strong> {transaction.mobile}</Typography>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} variant="contained" color="primary">Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default TransactionModal;
