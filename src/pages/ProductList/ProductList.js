import React, { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import NavBar from "../../components/NavBar/NavBar";
import SideBar from "../../components/SideBar/SideBar";
import { getProducts } from "../../services/ProductoService";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import { visuallyHidden } from "@mui/utils";
import "./ProductList.css";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "title",
    numeric: false,
    disablePadding: true,
    label: "Title",
  },
  {
    id: "price",
    numeric: true,
    disablePadding: false,
    label: "Price",
  },
  {
    id: "rate",
    numeric: true,
    disablePadding: false,
    label: "Rate",
  },
  {
    id: "count",
    numeric: true,
    disablePadding: false,
    label: "Count",
  },
  {
    id: "category",
    numeric: true,
    disablePadding: false,
    label: "Category",
  },
];

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox"></TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Products
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton></IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

function ProductList() {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("price");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [productsList, setProductsList] = useState([]);
  const [products, setProducts] = useState([]);
  const [rawProducts, setRawProducts] = useState([]);
  const [rows, setRows] = useState([]);


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.title);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const loadAllProducts = async() => {
    let res = await getProducts();
    res.data.sort((a, b) => b.rating.rate - a.rating.rate);
    const resSplice = res.data.splice(0, 4);
    setProducts(resSplice);
    // console.log(resSplice);
  };

  const loadLowCostProducts = async() => {
    let res = await getProducts();
    res.data.sort((a, b) => a.price - b.price);
    const resSplice = res.data.splice(0, 4);
    setProducts(resSplice);
    // console.log(resSplice);
  };

  const loadProductsList = async() => {
    let res = await getProducts();
    setProductsList(res.data);
    // console.log(productsList);
    setRawProducts(res.data);
  };

  function createData(title, category, price, rate, count) {
    return {
      title,
      category,
      price,
      rate,
      count,
    };
  }

  useEffect(() => {
    loadAllProducts();
    loadProductsList();
  }, []);

  useEffect(() => {
    setRows(
      productsList.map((product) => {
        return createData(
          product.title,
          product.category,
          product.price,
          product.rating.rate,
          product.rating.count
        );
      })
    );
  }, [productsList]);

  const handleRowsFilter = (e) => {
    let results = [];

    if (rows.length<=0) {
      loadProductsList();
    }

    if (e.target.value) {
      results = rawProducts.filter((row) => {
        return row.title.toLowerCase().includes(e.target.value.toLowerCase());
      });
      setRows(
        results.map((product) => {
          return createData(
            product.title,
            product.category,
            product.price,
            product.rating.rate,
            product.rating.count
          );
        })
      );
      setPage(results.length < rowsPerPage ? 0 : page);
    }
  };

  const handleRowsFilterClick = (e) => {
    let results = [];
    
    if (rows.length<=0) {
      loadProductsList();
    }

    if (e.target.innerText) {
      results = rawProducts.filter((row) => {
        return row.title
          .toLowerCase()
          .includes(e.target.innerText.toLowerCase());
      });
      setRows(
        results.map((product) => {
          return createData(
            product.title,
            product.category,
            product.price,
            product.rating.rate,
            product.rating.count
          );
        })
      );
      setPage(results.length < rowsPerPage ? 0 : page);
    }
  };

  return (
    <>
      <SideBar />
      <div className="productListContent">
        <NavBar
          handleRowsFilter={handleRowsFilter}
          handleRowsFilterClick={handleRowsFilterClick}
          products={rawProducts}
        />
        <div className="productListContent_main">
          <h1>Products</h1>
          <nav>
            <ul>
              <li onClick={loadAllProducts}>All</li>
              <li onClick={loadLowCostProducts}>Low Cost</li>
            </ul>
          </nav>

          <div className="productListContent_main_products">
            {products.length > 0 ? (
              products.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  description={product.description}
                  category={product.category}
                  price={product.price}
                  image={product.image}
                  rating={product.rating}
                />
              ))
            ) : (
              <div className="productListContent_main_products_loader">
                Cargando...
              </div>
            )}
          </div>

          <Box
            sx={{ width: "100%" }}
            className="productListContent_main_productsList"
          >
            <Paper sx={{ width: "100%", mb: 2 }}>
              <EnhancedTableToolbar numSelected={selected.length} />
              <TableContainer>
                <Table
                  sx={{ minWidth: 750 }}
                  aria-labelledby="tableTitle"
                  size={dense ? "small" : "medium"}
                >
                  <EnhancedTableHead
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={handleSelectAllClick}
                    onRequestSort={handleRequestSort}
                    rowCount={rows.length}
                  />
                  <TableBody>
                    {stableSort(rows, getComparator(order, orderBy))
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row, index) => {
                        const labelId = `enhanced-table-checkbox-${index}`;

                        return (
                          <TableRow hover tabIndex={-1} key={row.title}>
                            <TableCell padding="checkbox"></TableCell>
                            <TableCell
                              component="th"
                              id={labelId}
                              scope="row"
                              padding="none"
                            >
                              {row.title}
                            </TableCell>
                            <TableCell align="right">s/. {row.price}</TableCell>
                            <TableCell align="right">{row.rate}</TableCell>
                            <TableCell align="right">{row.count}</TableCell>
                            <TableCell align="right">{row.category}</TableCell>
                          </TableRow>
                        );
                      })}
                    {emptyRows > 0 && (
                      <TableRow
                        style={{
                          height: (dense ? 33 : 53) * emptyRows,
                        }}
                      >
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
            <FormControlLabel
              control={<Switch checked={dense} onChange={handleChangeDense} />}
              label="Dense padding"
            />
          </Box>
        </div>
      </div>
    </>
  );
}

export default ProductList;
