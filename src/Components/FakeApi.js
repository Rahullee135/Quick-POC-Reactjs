import axios from "axios";
import { useEffect, useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";


const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const FakeApi = () => {
  const classes = useStyles();
  const [product, setProduct] = useState([]);
  const [search] = useState("");
  

  const getProductData = async () => {
    try {
      const data = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      console.log(data.data);
      setProduct(data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getProductData();
  }, []);



  return (
   
    <div className="App">
      <h1>fake API</h1>

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Username</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Phone</StyledTableCell>
              <StyledTableCell>Website</StyledTableCell>
              <StyledTableCell align="right">Address</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {product
              .filter((item) => {
                if (search === "") {
                  return item;
                } else if (
                  item.title.toLowerCase().includes(search.toLowerCase())
                ) {
                  return item;
                }
              })
              .map((item) => {
                return (
                  <StyledTableRow key={item.id}>
                    <StyledTableCell component="th" scope="row">
                      {item.name}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {item.username}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {item.email}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {item.phone}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {item.website}
                    </StyledTableCell>
                    <StyledTableCell align="right" >
                      {item.address.city}
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default FakeApi;
