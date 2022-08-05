import React, { useContext } from 'react';
import RacesContext from '../context/RacesContext';
import {
  Box, Typography, Stack, Select, MenuItem, Grid, TextField,
  FormControl, InputLabel, Button, Snackbar,
} from '@mui/material';

function AdressForm() {
  const {
    carId,
    setCarId,
    carModel,
    setCarModel,
    carDriver,
    setCarDriver,
    listDrivers,
    isShowMessage,
    configMessage,
    isBtnDisabled,
    handleSubmitCar,
    isEditCar,
    handleChangeCar,
  } = useContext(RacesContext);

  const handleClick = (event) => {
    event.preventDefault();
    const { id } = event.target;
    setCarDriver(id);
  };

  const selectDriver = () => (
    <FormControl
      sx={ { width: '100%' } }
      >
      <InputLabel
        color="success"
        id="label-select-driver"
        inputProps={{ style: { fontSize: 14 }}}
        style={{ fontSize: 14 }}
      >
        MOTORISTA *
      </InputLabel>
      <Select
        color="success"
        style={{ fontSize: 14 }}
        labelId="label-select-driver"
        required
        label="MOTORISTA"
        value={ carDriver }
        onClick={ (e) => handleClick(e) }
        data-testid="select-driver"
      >
        {
          listDrivers.map(
            (driver) => (
              <MenuItem
                key={ driver['@key'] }
                id={ driver['id'] }
                value={ driver['id'] }
                style={{ fontSize: 14 }}
              >
                {driver['name']}
              </MenuItem>
            ),
          )
        }
      </Select>
    </FormControl>
  );

  const addressGrid = () => (
    <Box
      display="flex"
      component="form"
      autocomplete="on"
      textAlign={'center'}
      justifyContent={'center'}
      >
      <Stack
        sx={ { width: '100%' } }
        direction="row"
        padding={ 2 }
        spacing={ 2 }
        alignItems={'stretch'}
        justifyContent={'center'}
      >
        <Grid
          container
          spacing={ 2 }
        >
          <Grid
            item
            xs={ 3 }
          >
            <TextField
              color="success"
              inputProps={{ style: { fontSize: 14 }}}
              InputLabelProps={{style: { fontSize: 14 }}}
              variant="outlined"
              label="CÓDIGO"
              required
              placeholder="digite o Código"
              style={ { width: '100%' } }
              type="text"
              value={ carId }
              onChange={ (e) => setCarId(e.target.value.replace(/[^0-9]/g, '')) }
              disabled={ isEditCar }
              data-testid="input-id"
            />
          </Grid>
          <Grid
            item
            xs={ 3 }
          >
            <TextField
              color="success"
              inputProps={{ style: { fontSize: 14 }}}
              InputLabelProps={{style: { fontSize: 14 }}}
              variant="outlined"
              label="MODELO"
              required
              placeholder="digite o modelo"
              style={ { width: '100%' } }
              type="text"
              value={ carModel }
              onChange={ (e) => setCarModel(e.target.value) }
              data-testid="input-model"
            />
          </Grid>
          <Grid
            item
            xs={ 3 }
          >
            { selectDriver() }

          </Grid>
          <Grid
            item
            xs={ 3 }
          >
            <Button
              fullWidth
              style={ { height: '100%' } }
              color={ isEditCar ? 'warning' : 'success' }
              type="button"
              variant="contained"
              label={ isEditCar ? 'Editar' : 'Gravar' }
              onClick={ isEditCar ? handleChangeCar : handleSubmitCar }
              disabled={ isBtnDisabled }
            >
              { isEditCar ? 'Editar' : 'Gravar' }
            </Button>
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );

  return (
    <Box
      component="form"
      autocomplete="on"
      paddingLeft={ 1 }
      paddingRight={ 1 }
    >
      <Stack
        display="flex"
        direction="column"
      >
        <Typography
          color="green"
          variant="h4"
          component="div"
          align="center"
          spacing={ 2 }
        >
          Lista de Carros
        </Typography>
        { addressGrid() }
      </Stack>
      <Snackbar
        sx={ {
          width: 400,
          color: 'secondary',
          '& .MuiSnackbarContent-root': { backgroundColor: configMessage['backgroundColor'] },
        } }
        open={ isShowMessage }
        anchorOrigin={ { vertical: 'bottom', horizontal: 'center' } }
        autoHideDuration={ 1000 }
        transitionDuration={ { enter: 1000, exit: 1000 } }
        severity={ configMessage.severity }
        message={ configMessage.message }
      />
    </Box>
  );
}

export default AdressForm;
