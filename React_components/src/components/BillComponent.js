import React, { forwardRef } from 'react';
import { Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box, Divider } from '@mui/material';
import './BillComponent.css';

const BillComponent = forwardRef((props, ref) => {
  const items = [
    { id: 1, name: 'Item 1', quantity: 2, price: 10.99 },
    { id: 2, name: 'Item 2', quantity: 1, price: 24.99 },
    { id: 3, name: 'Item 3', quantity: 3, price: 5.99 },
  ];

  const total = items.reduce((sum, item) => sum + (item.quantity * item.price), 0);

  return (
    <Paper className="bill-paper" ref={ref}>
      <Box className="bill-header">
        <Typography variant="h4" gutterBottom className="bill-title">
          INVOICE
        </Typography>
        <Divider className="bill-divider" />
      </Box>

      <Box className="bill-info-container">
        <Box>
          <Typography variant="body1" className="bill-info-text">
            Invoice #: INV-2024-001
          </Typography>
          <Typography variant="body1" className="bill-info-text">
            Date: {new Date().toLocaleDateString()}
          </Typography>
        </Box>
        <Box className="bill-company-info">
          <Typography variant="body1" className="bill-info-text">
            Company Name
          </Typography>
          <Typography variant="body2" className="bill-info-text">
            123 Business Street
          </Typography>
          <Typography variant="body2" className="bill-info-text">
            City, State 12345
          </Typography>
        </Box>
      </Box>

      <TableContainer className="bill-table-container">
        <Table>
          <TableHead>
            <TableRow className="table-header">
              <TableCell className="table-header-cell">Item</TableCell>
              <TableCell align="right" className="table-header-cell">Quantity</TableCell>
              <TableCell align="right" className="table-header-cell">Price</TableCell>
              <TableCell align="right" className="table-header-cell">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id} className="table-row">
                <TableCell>{item.name}</TableCell>
                <TableCell align="right">{item.quantity}</TableCell>
                <TableCell align="right">${item.price.toFixed(2)}</TableCell>
                <TableCell align="right">
                  ${(item.quantity * item.price).toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={3} align="right" className="table-header-cell">Total:</TableCell>
              <TableCell align="right" className="total-cell">
                ${total.toFixed(2)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Box className="bill-footer">
        <Typography variant="body2" className="footer-text">
          Thank you for your business!
        </Typography>
      </Box>
    </Paper>
  );
});

export default BillComponent;