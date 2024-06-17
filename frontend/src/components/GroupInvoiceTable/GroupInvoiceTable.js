import * as React from 'react';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination} from '@mui/material';

const columns = [
    {id: 'InvoiceNumber', label: 'Invoice Number', minWidth: 170},
    {id: 'Date', label: 'Invoice Date', minWidth: 100},
    {id: 'Total', label: 'Invoice Amount', minWidth: 170},
    {id: 'DueDate', label: 'Due Date', minWidth: 100},
    {id: 'BuyerCIF', label: 'Buyer CIF', minWidth: 170},
    {id: 'SupplierCIF', label: 'Supplier CIF', minWidth: 170},
];

const GroupInvoiceTable = ({invoiceData, openSummary}) => {
    console.log("Invoice Data(Groups): ", invoiceData);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const rows = [];
    invoiceData.forEach((invoice) => {
    rows.push({
        InvoiceNumber: invoice.invoice_number,
        Date: invoice.date_of_issue,
        Total: invoice.total_price,
        DueDate: invoice.due_date,
        BuyerCIF: invoice.buyer_CIF,
        SupplierCIF: invoice.supplier_CIF,
    });
});

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const openInvoiceSummary = (invoiceRow) => {
        const invoiceDataSelected = invoiceData.filter((invoice) => invoice.invoiceNumber === invoiceRow.invoiceNumber);
        openSummary(invoiceDataSelected[0]);
    };

    return (
        <Paper sx={{width: "100%", overflow: "hidden", mt: 5}}>
            <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell key={column.id} align={column.align} style={{minWidth: column.minWidth}}>
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                        return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={index} onClick={() => openInvoiceSummary(row)}>
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                {column.format && typeof value === 'number' ? column.format(value) : value}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
};

export default GroupInvoiceTable;