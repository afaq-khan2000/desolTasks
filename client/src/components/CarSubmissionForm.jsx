"use client";

import React from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import axios from "../../utils/axiosConfig";
import { useFormik } from "formik";
import * as Yup from "yup";

const CarSubmissionForm = () => {
  const formik = useFormik({
    initialValues: {
      model: "",
      price: "",
      phone: "",
      city: "",
      images: null, // File input
    },
    validationSchema: Yup.object({
      model: Yup.string().required("Car model is required"),
      price: Yup.number()
        .typeError("Price must be a number")
        .required("Price is required"),
      phone: Yup.string()
        .matches(/^[0-9]+$/, "Phone number must contain only digits")
        .required("Phone number is required"),
      city: Yup.string().required("City is required"),
      images: Yup.mixed().required("Please upload at least one image"),
    }),
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      const token = localStorage.getItem("token");
      if (!token) {
        setErrors({ general: "Unauthorized. Please login." });
        return;
      }

      const formData = new FormData();
      formData.append("model", values.model);
      formData.append("price", values.price);
      formData.append("phone", values.phone);
      formData.append("city", values.city);

      // Handle multiple file uploads
      Array.from(values.images).forEach((file) =>
        formData.append("images", file)
      );

      try {
        await axios.post("/cars/submit", formData);
        resetForm();
        alert("Car submitted successfully!");
      } catch (err) {
        setErrors({
          general: err.response?.data?.message || "Submission failed!",
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Submit Your Car
        </Typography>

        {/* Display general errors */}
        {formik.errors.general && (
          <Typography color="error" sx={{ mb: 2 }}>
            {formik.errors.general}
          </Typography>
        )}

        <TextField
          fullWidth
          margin="normal"
          label="Car Model"
          name="model"
          value={formik.values.model}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.model && Boolean(formik.errors.model)}
          helperText={formik.touched.model && formik.errors.model}
          sx={{
            // backgroundColor: 'red',
            "& .MuiInputBase-root": {
              backgroundColor: "#f9f9f9",
            },
          }}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Price"
          name="price"
          type="number"
          value={formik.values.price}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.price && Boolean(formik.errors.price)}
          helperText={formik.touched.price && formik.errors.price}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Phone Number"
          name="phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.phone && Boolean(formik.errors.phone)}
          helperText={formik.touched.phone && formik.errors.phone}
        />

        <TextField
          fullWidth
          margin="normal"
          label="City"
          name="city"
          value={formik.values.city}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.city && Boolean(formik.errors.city)}
          helperText={formik.touched.city && formik.errors.city}
        />

        {/* File input */}
        <input
          type="file"
          multiple
          name="images"
          onChange={(event) =>
            formik.setFieldValue("images", event.currentTarget.files)
          }
          onBlur={formik.handleBlur}
          style={{ marginTop: "16px" }}
        />
        {formik.touched.images && formik.errors.images && (
          <Typography color="error" variant="caption">
            {formik.errors.images}
          </Typography>
        )}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={formik.isSubmitting}
          sx={{ mt: 2 }}
        >
          Submit Car
        </Button>
      </Box>
    </Container>
  );
};

export default CarSubmissionForm;
