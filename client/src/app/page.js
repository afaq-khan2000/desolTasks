"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { Box, Button, Container } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter();

  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <h1 className={styles.title}>Welcome to the Car App</h1>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            router.push("/login");
          }}
          sx={{ width: 200 }}
        >
          Login
        </Button>
      </Box>
    </Container>
  );
}
