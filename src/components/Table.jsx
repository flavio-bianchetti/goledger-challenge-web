import React, { useContext } from 'react';
import RacesContext from '../context/RacesContext';
import {
  Box, Table, TableBody, TableHead, TableRow, styled,
  Stack, Button,
} from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function TableElement() {
  const {
    editCarRegister,
    deleteCarRegister,
    isIconsDisabled,
    listCars,
  } = useContext(RacesContext);

  const header = [
    'CÓDIGO',
    'MODELO',
    'MOTORISTA',
    'TIME',
    'AÇÕES',
  ];

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: 'green',
      color: theme.palette.common.white,
      fontSize: 18,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
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

  const handleClickEdit = (event) => {
    const { id } = event.target;
    if (id.length) {
      editCarRegister(id);
    }
  };

  const handleClickDelete = (event) => {
    const { id } = event.target;
    if (id.length) {
      deleteCarRegister(id);
    }
  };

  return (
    <Box
      padding={ 2 }
    >
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
            listCars.map((elem, index) => {
              const { id } = elem;
              const values = Object.values(elem);
              return (
                <StyledTableRow key={ index }>
                  {
                    values.map((value, key) => 
                      <TableCell
                        style={ { fontSize: 16 } }
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
                      justifyContent={'center'}
                      spacing={ 1 }
                    >
                      <Button
                        color="warning"
                        aria-label="edit"
                        id={ id }
                        onClick={ (e) => handleClickEdit(e) }
                        disabled={ isIconsDisabled }
                      > 
                        Editar
                        <EditIcon 
                          id={ id }
                          fontSize="small"
                        />
                      </Button>
                      <Button
                        color="error"
                        aria-label="delete"
                        id={ id }
                        onClick={ (e) => handleClickDelete(e) }
                        disabled={ isIconsDisabled }
                      >
                        Excluir
                        <DeleteIcon
                          id={ id }
                          fontSize="small"
                        />
                      </Button>
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

export default TableElement;
