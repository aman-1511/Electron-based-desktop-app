import React, { useState, useRef } from 'react';
import { Container, Paper, Button, Typography, Box } from '@mui/material';
import { Document, Page, pdfjs } from 'react-pdf';
import BillComponent from './components/BillComponent';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import './App.css';
import './components/PrintStyles.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url
).toString();

const ipcRenderer = window?.require ? window.require('electron').ipcRenderer : null;

function App() {
  const [pdfFile, setPdfFile] = useState(null);
  const [showBillComponent, setShowBillComponent] = useState(false);
  const billComponentRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setPdfFile(file);
    setShowBillComponent(false);
  };

  const handlePrintPDF = () => {
    if (pdfFile) {
      const fileURL = URL.createObjectURL(pdfFile);
      const printWindow = window.open(fileURL);
      printWindow.onload = () => {
        printWindow.print();
      };
    }
  };

  const handlePrintComponent = () => {
    const printContent = billComponentRef.current;
    if (printContent) {
      const printWindow = window.open('', '_blank');
      const printStyles = document.querySelector('link[href*="PrintStyles.css"]');
      const styles = printStyles ? `<link rel="stylesheet" href="${printStyles.href}">` : '';
      
      printWindow.document.write(`
        <html>
          <head>
            <title>Print Bill</title>
            ${styles}
          </head>
          <body class="print-content">
            ${printContent.innerHTML}
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 250);
    }
  };

  return (
    <Container maxWidth="md" className="app-container">
      <Paper className="main-paper">
        <Typography variant="h4" gutterBottom className="app-title">
          Bill Printing Application
        </Typography>

        <Box className="file-upload-section">
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="file-input"
          />
          <Button 
            variant="contained" 
            onClick={handlePrintPDF}
            disabled={!pdfFile}
            className="primary-button"
          >
            Print PDF
          </Button>
        </Box>

        {pdfFile && (
          <Box className="pdf-preview">
            <Document file={pdfFile}>
              <Page pageNumber={1} />
            </Document>
          </Box>
        )}

        <Box className="button-container">
          <Button
            variant="contained"
            onClick={() => setShowBillComponent(true)}
            className="success-button"
          >
            Show Bill Component
          </Button>
          <Button
            variant="contained"
            onClick={handlePrintComponent}
            disabled={!showBillComponent}
            className="primary-button"
          >
            Print Bill Component
          </Button>
        </Box>

        {showBillComponent && (
          <Box className="bill-component-container">
            <BillComponent ref={billComponentRef} />
          </Box>
        )}
      </Paper>
    </Container>
  );
}

export default App;