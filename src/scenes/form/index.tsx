import { Box, Button, TextField } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { FormikProvider, useFormik } from "formik";
import * as yup from "yup";
import Header from "../../components/Header";

type formValues = {
  firstName: string;
  lastName: string;
  email: string;
  contact: string;
  address1: string;
  address2: string;
};

const initialValues: formValues = {
  firstName: "",
  lastName: "",
  email: "",
  contact: "",
  address1: "",
  address2: "",
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const userSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  contact: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  address1: yup.string().required("required"),
  address2: yup.string().required("required"),
});

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const formik = useFormik({
    initialValues,
    validationSchema: userSchema,
    onSubmit(values) {
      return Promise.resolve();
    },
  });
  const { getFieldProps, touched, errors, handleSubmit } = formik;

  return (
    <Box m="20px">
      <Header title="CREATE USER" subtitle="Create a New User Profile" />

      <FormikProvider value={formik}>
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "&>div": {
                gridColumn: isNonMobile ? undefined : "span 4",
              },
            }}
          >
            <TextField
              fullWidth
              variant="filled"
              label="First Name"
              type="text"
              error={!!!!touched.firstName && !!errors.firstName}
              helperText={touched.firstName && errors.firstName}
              {...getFieldProps("firstName")}
              sx={{
                gridColumn: "span 2",
              }}
            />
            <TextField
              fullWidth
              variant="filled"
              label="Last Name"
              type="text"
              {...getFieldProps("lastName")}
              error={!!touched.lastName && !!errors.lastName}
              helperText={touched.lastName && errors.lastName}
              sx={{
                gridColumn: "span 2",
              }}
            />
            <TextField
              fullWidth
              variant="filled"
              label="Email"
              type="text"
              error={!!touched.email && !!errors.email}
              helperText={touched.email && errors.email}
              {...getFieldProps("email")}
              sx={{
                gridColumn: "span 4",
              }}
            />
            <TextField
              fullWidth
              variant="filled"
              label="Contact Number"
              type="text"
              error={!!touched.contact && !!errors.contact}
              helperText={touched.contact && errors.contact}
              {...getFieldProps("contact")}
              sx={{
                gridColumn: "span 4",
              }}
            />
            <TextField
              fullWidth
              variant="filled"
              label="Address 1"
              type="text"
              error={!!touched.address1 && !!errors.address1}
              helperText={touched.address1 && errors.address1}
              {...getFieldProps("address1")}
              sx={{
                gridColumn: "span 4",
              }}
            />
            <TextField
              fullWidth
              variant="filled"
              label="Address 2"
              type="text"
              error={!!touched.address2 && !!errors.address2}
              helperText={touched.address2 && errors.address2}
              {...getFieldProps("address2")}
              sx={{
                gridColumn: "span 4",
              }}
            />
          </Box>
          <Box display="flex" justifyContent="end" mt="20px">
            <Button
              type="submit"
              color="secondary"
              variant="contained"
              disabled={formik.isSubmitting}
            >
              Create New User
            </Button>
          </Box>
        </form>
      </FormikProvider>
    </Box>
  );
};

export default Form;
