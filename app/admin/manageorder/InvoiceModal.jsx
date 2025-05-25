import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Grid,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Button,
} from '@mui/material';
import { Close, LocalShipping, Receipt, Person } from '@mui/icons-material';

const InvoiceModal = ({ open, onClose, invoice }) => {
  if (!invoice) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        Invoice Details
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          {/* Customer Information */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              <Person sx={{ verticalAlign: 'middle', mr: 1 }} />
              Customer Information
            </Typography>
            <Typography>Name: {invoice.memberName ?? 'N/A'}</Typography>
            <Typography>Email: {invoice.email ?? 'N/A'}</Typography>
            <Typography>Phone: {invoice.mobileNumber ?? 'N/A'}</Typography>
            <Typography>
              Address: {`${invoice.houseNumber}, ${invoice.streetAddress}, ${invoice.floor}, ${invoice.roomNumber}, ${invoice.state} - ${invoice.zipcode}` ?? 'N/A'}
            </Typography>
          </Grid>

          <Divider sx={{ my: 2, width: '100%' }} />

          {/* Product Details */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              <Receipt sx={{ verticalAlign: 'middle', mr: 1 }} />
              Product Details
            </Typography>
            <List>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={`Product Code: ${invoice.productDescription ?? 'N/A'}`}
                  secondary={
                    <>
                      <Typography component="span" variant="body2" color="text.primary">
                        Quantity: {invoice.quantity ?? 'N/A'}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
            </List>
          </Grid>

          <Divider sx={{ my: 2, width: '100%' }} />

          {/* Delivery Information */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              <LocalShipping sx={{ verticalAlign: 'middle', mr: 1 }} />
              Delivery Information
            </Typography>
            <Typography>Status: {invoice.status ?? 'N/A'}</Typography>
            <Typography>Delivery Partner: {invoice.deliveryPartner ?? 'N/A'}</Typography>
            <Typography>Reference Number: {invoice.referenceNumber ?? 'N/A'}</Typography>
            <Typography>Estimated Delivery Date: {invoice.estimatedDeliveryDate ?? 'N/A'}</Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InvoiceModal;
