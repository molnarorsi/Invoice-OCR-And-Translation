import { makeStyles } from "@mui/styles";
export const useStyles = makeStyles({
    table: {
        width: "100%",
        marginBottom: 20, // Increased bottom margin for better spacing
        overflowX: "auto", // Ensures the table is scrollable horizontally if it overflows
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Adds a subtle shadow for depth
        borderRadius: "8px", // Rounds the corners for a softer look
        '& thead': {
            backgroundColor: "#f5f5f5", // Light grey background for the table header for distinction
            '& th': {
                fontWeight: "600", // Makes header text bolder
                fontSize: "0.95rem", // Slightly larger font size for headers
                color: "#333", // Darker text for better contrast and readability
                padding: "12px 15px", // Adjusts padding for a more spacious layout
            }
        },
        '& tbody': {
            '& tr': {
                '&:hover': {
                    backgroundColor: "#fafafa", // Adds a hover effect with a very light grey background
                },
                '& td': {
                    fontSize: "0.9rem", // Slightly larger font size for body
                    color: "#666", // Soft black for readability
                    padding: "10px 15px", // Adjusts padding for a more spacious layout
                }
            }
        },
        '& tfoot': {
            backgroundColor: "#f5f5f5", // Light grey background for the table footer for distinction
            '& td': {
                fontWeight: "600", // Makes footer text bolder
                fontSize: "0.95rem", // Slightly larger font size for footers
                color: "#333", // Darker text for better contrast and readability
                padding: "12px 15px", // Adjusts padding for a more spacious layout
            }
        }
    }
});