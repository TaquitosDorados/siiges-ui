import React, { useEffect, useContext, useState } from 'react';
import { Grid, TextField, Typography } from '@mui/material';
import { DefaultModal, ButtonStyled } from '@siiges-ui/shared';
import Input from '@siiges-ui/shared/src/components/Input';
import PropTypes from 'prop-types';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import BasicSelect from '@siiges-ui/shared/src/components/Select';
import errorDatosDocentes from '../../sections/errors/errorDatosDocentes';
import handleCreate from '../../submitNewDocentes';
import { TablesPlanEstudiosContext } from '../../Context/tablesPlanEstudiosProviderContext';
import getAsignaturas from '../../getAsignaturas';

export default function DocentesCreateModal({ open, hideModal, title }) {
  const {
    setDocentesList,
    formDocentes,
    setFormDocentes,
    setError,
    error,
    errors,
    setErrors,
    initialValues,
    setInitialValues,
    programaId,
    setNoti,
  } = useContext(TablesPlanEstudiosContext);

  const [currentSection, setCurrentSection] = useState(1);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormDocentes((prevData) => {
      if (name === 'asignaturasDocentes') {
        const newValue = Array.isArray(value) ? value : [value];
        return {
          ...prevData,
          asignaturasDocentes: newValue,
        };
      } if (
        name === 'nombre'
        || name === 'apellidoPaterno'
        || name === 'apellidoMaterno'
      ) {
        return {
          ...prevData,
          persona: {
            ...prevData.persona,
            [name]: value,
          },
        };
      }
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const errorsDocentes = errorDatosDocentes(formDocentes, setError);
  const asignaturas = getAsignaturas(programaId);

  const handleOnBlur = (e) => {
    const { name, value } = e.target;
    const initialValue = initialValues[name];

    if (value !== initialValue || value === '') {
      errorsDocentes[name]();
    }
  };

  const handleInputFocus = (e) => {
    const { name, value } = e.target;
    setInitialValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  useEffect(() => {
    if (errorsDocentes !== undefined) {
      setErrors(errorsDocentes);
    }
  }, [errors]);

  const handleOnSubmit = () => {
    handleCreate(
      formDocentes,
      setFormDocentes,
      setInitialValues,
      setDocentesList,
      hideModal,
      errors,
      setNoti,
      programaId,
      setCurrentSection,
      1,
    );
  };

  const handleNextSection = () => {
    setCurrentSection((prevSection) => prevSection + 1);
  };

  const handlePreviousSection = () => {
    setCurrentSection((prevSection) => prevSection - 1);
  };

  const handleModalClose = () => {
    hideModal();
    setCurrentSection(1);
  };

  const tiposDocentes = [
    { id: 1, nombre: 'Docente de asignatura' },
    { id: 2, nombre: 'Docente de tiempo completo' },
  ];

  const documentosPresentados = [
    { id: 1, nombre: 'Titulo' },
    { id: 2, nombre: 'Cédula' },
  ];

  const tipoContratacion = [
    { id: 1, nombre: 'Contratación' },
    { id: 2, nombre: 'Tiempo indefinido' },
    { id: 3, nombre: 'Otro' },
  ];

  const nivel = [
    { id: 1, nombre: 'Licenciatura' },
    { id: 2, nombre: 'Técnico Superior Universitario' },
    { id: 3, nombre: 'Especialidad' },
    { id: 4, nombre: 'Maestria' },
    { id: 5, nombre: 'Doctorado' },
    { id: 6, nombre: 'Profesional Asociado' },
  ];

  return (
    <DefaultModal open={open} setOpen={hideModal} title={title}>
      {currentSection === 1 && (
        <Grid container spacing={2} sx={{ width: '100%' }}>
          <Grid item xs={3}>
            <BasicSelect
              title="Tipo de docente"
              name="tipoDocente"
              value={formDocentes.tipoDocente ?? ''}
              options={tiposDocentes}
              onchange={handleOnChange}
              onblur={handleOnBlur}
              errorMessage={error.tipoDocente}
              required
            />
          </Grid>
          <Grid item xs={9}>
            <Input
              id="nombre"
              label="Nombre(s)"
              name="nombre"
              auto="nombre"
              value={formDocentes.persona?.nombre}
              onchange={handleOnChange}
              onblur={handleOnBlur}
              onfocus={handleInputFocus}
              required
              errorMessage={error.nombre}
            />
          </Grid>
          <Grid item xs={6}>
            <Input
              id="apellidoPaterno"
              label="Apellido paterno"
              name="apellidoPaterno"
              auto="apellidoPaterno"
              value={formDocentes.persona?.apellidoPaterno}
              onchange={handleOnChange}
              onblur={handleOnBlur}
              onfocus={handleInputFocus}
              required
              errorMessage={error.apellidoPaterno}
            />
          </Grid>
          <Grid item xs={6}>
            <Input
              id="apellidoMaterno"
              label="Apellido materno"
              name="apellidoMaterno"
              auto="apellidoMaterno"
              value={formDocentes.persona?.apellidoMaterno}
              onchange={handleOnChange}
              onblur={handleOnBlur}
              onfocus={handleInputFocus}
              required
              errorMessage={error.apellidoMaterno}
            />
          </Grid>
        </Grid>
      )}
      {currentSection === 2 && (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6">Ultimo grado</Typography>
          </Grid>
          <Grid item xs={3}>
            <BasicSelect
              title="Nivel"
              name="nivelUltimoGrado"
              value={formDocentes.nivelUltimoGrado ?? ''}
              options={nivel}
              onchange={handleOnChange}
              onblur={handleOnBlur}
              errorMessage={error.nivelUltimoGrado}
              textValue
              required
            />
          </Grid>
          <Grid item xs={9}>
            <Input
              id="nombreUltimoGrado"
              label="Nombre"
              name="nombreUltimoGrado"
              auto="nombreUltimoGrado"
              value={formDocentes.nombreUltimoGrado ?? ''}
              onchange={handleOnChange}
              onblur={handleOnBlur}
              onfocus={handleInputFocus}
              required
              errorMessage={error.nombreUltimoGrado}
            />
          </Grid>
          <Grid item xs={12}>
            <BasicSelect
              title="Documento presentado"
              name="documentoPresentadoUltimoGrado"
              value={formDocentes.documentoPresentadoUltimoGrado ?? ''}
              options={documentosPresentados}
              onchange={handleOnChange}
              onblur={handleOnBlur}
              errorMessage={error.documentoPresentadoUltimoGrado}
              textValue
              required
            />
          </Grid>
        </Grid>
      )}
      {currentSection === 3 && (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6">Penultimo grado</Typography>
          </Grid>
          <Grid item xs={3}>
            <BasicSelect
              title="Nivel"
              name="nivelPenultimoGrado"
              value={formDocentes.nivelPenultimoGrado ?? ''}
              options={nivel}
              onchange={handleOnChange}
              onblur={handleOnBlur}
              errorMessage={error.nivelPenultimoGrado}
              textValue
              required
            />
          </Grid>
          <Grid item xs={9}>
            <Input
              id="nombrePenultimoGrado"
              label="Nombre"
              name="nombrePenultimoGrado"
              auto="nombrePenultimoGrado"
              value={formDocentes.nombrePenultimoGrado}
              onchange={handleOnChange}
              onblur={handleOnBlur}
              onfocus={handleInputFocus}
              required
              errorMessage={error.nombrePenultimoGrado}
            />
          </Grid>
          <Grid item xs={12}>
            <BasicSelect
              title="Documento presentado"
              name="documentoPresentadoPenultimoGrado"
              value={formDocentes.documentoPresentadoPenultimoGrado ?? ''}
              options={documentosPresentados}
              onchange={handleOnChange}
              onblur={handleOnBlur}
              errorMessage={error.documentoPresentadoPenultimoGrado}
              textValue
              required
            />
          </Grid>
          <br />
          <Grid item xs={12}>
            <BasicSelect
              title="Asignaturas para las que se propone"
              name="asignaturasDocentes"
              multiple
              value={formDocentes.asignaturasDocentes ?? ''}
              options={asignaturas.asignaturas}
              onchange={handleOnChange}
              onblur={handleOnBlur}
              errorMessage={error.asignaturasDocentes}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <BasicSelect
              title="Tipo de contratación"
              name="tipoContratacion"
              value={formDocentes.tipoContratacion ?? ''}
              options={tipoContratacion}
              onchange={handleOnChange}
              onblur={handleOnBlur}
              errorMessage={error.tipoContratacion}
              required
            />
          </Grid>
          <Grid item xs={3}>
            <Input
              id="antiguedad"
              label="Antiguedad"
              name="antiguedad"
              auto="antiguedad"
              value={formDocentes.antiguedad}
              onchange={handleOnChange}
              onblur={handleOnBlur}
              onfocus={handleInputFocus}
              required
              errorMessage={error.antiguedad}
            />
          </Grid>
          <Grid item xs={3}>
            <Input
              id="totalHorasIndependiente"
              label="Total horas independiente"
              name="totalHorasIndependiente"
              auto="totalHorasIndependiente"
              value={formDocentes.totalHorasIndependiente}
              onchange={handleOnChange}
              onblur={handleOnBlur}
              onfocus={handleInputFocus}
              required
              errorMessage={error.totalHorasIndependiente}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="experienciaLaboral"
              name="experienciaLaboral"
              label="Experiencia laboral"
              rows={4}
              multiline
              sx={{ width: '100%' }}
              value={formDocentes.experienciaLaboral}
              onChange={handleOnChange}
              onBlur={handleOnBlur}
              onFocus={handleInputFocus}
              required
              error={error.experienciaLaboral}
            />
          </Grid>
        </Grid>
      )}
      <Grid container sx={{ mt: 2 }}>
        <Grid item xs={8}>
          <ButtonStyled
            text="Cancelar"
            alt="Cancelar"
            design="error"
            onclick={handleModalClose}
          />
        </Grid>
        {currentSection === 1 && (
          <>
            <Grid item xs={2} />
            <Grid item xs={2}>
              <ButtonStyled
                text={<ArrowForwardIosIcon sx={{ height: 14 }} />}
                alt={<ArrowForwardIosIcon sx={{ height: 14 }} />}
                onclick={handleNextSection}
              />
            </Grid>
          </>
        )}
        {currentSection === 2 && (
          <>
            <Grid item xs={2}>
              <ButtonStyled
                text={<ArrowBackIosNewIcon sx={{ height: 14 }} />}
                alt={<ArrowBackIosNewIcon sx={{ height: 14 }} />}
                onclick={handlePreviousSection}
              />
            </Grid>
            <Grid item xs={2}>
              <ButtonStyled
                text={<ArrowForwardIosIcon sx={{ height: 14 }} />}
                alt={<ArrowForwardIosIcon sx={{ height: 14 }} />}
                onclick={handleNextSection}
              />
            </Grid>
          </>
        )}
        {currentSection === 3 && (
          <>
            <Grid item xs={2}>
              <ButtonStyled
                text={<ArrowBackIosNewIcon sx={{ height: 14 }} />}
                alt={<ArrowBackIosNewIcon sx={{ height: 14 }} />}
                onclick={handlePreviousSection}
              />
            </Grid>
            <Grid item xs={2}>
              <ButtonStyled
                text="Confirmar"
                alt="Confirmar"
                onclick={handleOnSubmit}
              />
            </Grid>
          </>
        )}
      </Grid>
    </DefaultModal>
  );
}

DocentesCreateModal.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  hideModal: PropTypes.func.isRequired,
};
