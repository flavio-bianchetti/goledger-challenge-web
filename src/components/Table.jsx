import React from 'react';
import {
  Box, Typography, Table, TableBody, TableHead, TableRow, styled,
  IconButton, Stack,
} from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PropTypes from 'prop-types';

function TableElement({
  title,
  header,
  data,
  handleClickEdit,
  handleClickDelete,
  isIconsDisabled,
}) {

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: 'green',
      color: theme.palette.common.white,
      fontSize: 14,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 6,
    },
  }));

  const StyledTableRow = styled(TableRow)(() => ({
    '&:nth-of-type(odd)': {
      backgroundColor: '#e1e1e1',
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  return (
    <Box
      padding={ 2 }
    >
      <Typography
        color="green"
        variant="h4"
        component="div"
        align="center"
        padding={ 1 }
        borderRadius={ 2 }
      >
        { title }
      </Typography>
      <Table
        sx={ { minWidth: 700 } }
        aria-label="customized table"
      >
        <TableHead>
          <TableRow>
            {
              header.map((head) => (
                <StyledTableCell
                  align="center"
                  key={ Math.random() }
                >
                  {head}
                </StyledTableCell>
              ))
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {
            data.map((elem, index) => {
              const values = Object.values(elem);
              return (
                <StyledTableRow key={ index }>
                  {
                    values.map((value, key) => 
                      <TableCell
                        style={ { fontSize: '12px' } }
                        key={ key }
                        align="center"
                      >
                        { value }
                      </TableCell>
                    )
                  }
                  <TableCell
                    align="center"
                  >
                    <Stack
                      direction="row"
                      spacing={ 1 }
                    >
                      <IconButton
                        color="warning"
                        aria-label="edit"
                        name={ elem['$id'] }
                        onClick={ (e) => handleClickEdit(e) }
                        disabled={ isIconsDisabled }
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        aria-label="delete"
                        name={ elem['$id'] }
                        onClick={ (e) => handleClickDelete(e) }
                        disabled={ isIconsDisabled }
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </StyledTableRow>
              );
            })
          }
        </TableBody>
      </Table>
    </Box>
  );
}

TableElement.propTypes = {
  title: PropTypes.string.isRequired,
  header: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.arrayOf(PropTypes.any).isRequired,
  handleClickEdit: PropTypes.func.isRequired,
  handleClickDelete: PropTypes.func.isRequired,
  isIconsDisabled: PropTypes.string.isRequired,
}

export default TableElement;