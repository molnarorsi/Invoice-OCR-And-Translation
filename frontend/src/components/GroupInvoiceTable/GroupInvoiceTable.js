import * as React from 'react';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, TextField, TableSortLabel} from '@mui/material';

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
    const [search, setSearch] = React.useState("");
    const [order, setOrder] = React.useState("asc");
    const [orderBy, setOrderBy] = React.useState("");

    const rows = [];
    const invoiceToSearch = [];
    invoiceData.forEach((invoice) => {
    rows.push({
        InvoiceNumber: invoice.invoice_number,
        Date: invoice.date_of_issue,
        Total: invoice.total_price,
        DueDate: invoice.due_date,
        BuyerCIF: invoice.buyer_CIF,
        SupplierCIF: invoice.supplier_CIF,
    });
    invoiceToSearch.push({
        InvoiceNumber: invoice.invoice_number,
        Date: invoice.date_of_issue,
        Total: invoice.total_price,
        DueDate: invoice.due_date,
        BuyerName: invoice.buyer_name,
        BuyerCIF: invoice.buyer_CIF,
        SupplierName: invoice.supplier_name,
        SupplierCIF: invoice.supplier_CIF
    });
});

    const searchHandler = (event) => {
        setSearch(event.target.value);
        setPage(0);
    };

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

    const filterRows = invoiceToSearch.filter((row) => {
        return Object.values(row).some(
            (value) => typeof value === "string" && value.toLowerCase().includes(search.toLowerCase()),
        );
      }
    );

    const filterInvoiceData = filterRows.map((row) => {
        return {
            InvoiceNumber: row.InvoiceNumber,
            Date: row.Date,
            Total: row.Total,
            DueDate: row.DueDate,
            BuyerCIF: row.BuyerCIF,
            SupplierCIF: row.SupplierCIF,
        };
    });

    const handleSort = (property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const comparator = (a, b, orderBy) => {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    };

    const getComparator = (order, orderBy) => {
        return order === "desc"
            ? (a, b) => comparator(a, b, orderBy)
            : (a, b) => -comparator(a, b, orderBy);
    };

    const stableSort = (array, comparator) => {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    }

    return (
        <Paper sx={{width: "100%", overflow: "hidden", mt:5}}>
            <TextField label = "Search" variant="outlined" size="small" value={search} onChange={searchHandler} style={{margin: 10}}/>
            <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell key={column.id} align={column.align} style={{minWidth: column.minWidth}}>
                                    <TableSortLabel active={orderBy === column.id} direction={orderBy === column.id ? order : "asc"} onClick={()=>handleSort(column.id)}>
                                        {column.label}
                                    </TableSortLabel>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {stableSort(filterInvoiceData, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
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
                count={filterInvoiceData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
};

export default GroupInvoiceTable;