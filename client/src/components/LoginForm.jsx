"use client";

import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import axios from "../../utils/axiosConfig";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";

const LoginForm = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        const res = await axios.post("/auth/login", values);
        localStorage.setItem("token", res.data.token);
        router.push("/add-car");
      } catch (err) {
        console.log(err);
        formik.setFieldError(
          "email",
          err.response?.data?.message || "Login failed!"
        );
      }
    },
  });

  return (
    <Container maxWidth="xl">
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
        <Typography variant="h4">Login</Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button type="submit" variant="contained">
            Login
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginForm;
