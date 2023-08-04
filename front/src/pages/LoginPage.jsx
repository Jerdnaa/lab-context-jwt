import { Box, Button, PasswordInput, Text, TextInput } from "@mantine/core";
import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/SessionContext";

const LoginPage = () => {
  // Add some states to control your inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { greet, authenticateUser } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(greet);
    // Send your login information to your backend
    try {
      const response = await axios.post("http://localhost:5005/auth/login", { email, password });
      // console.log(response.data);
      localStorage.setItem("authToken", response.data.token);
      await authenticateUser();
      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      sx={{
        margin: "0 auto",
        maxWidth: "400px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "calc(100vh - 100px)",
      }}
    >
      <Text align="center" size="xl" weight="bold">
        Login
      </Text>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column", gap: "20px", marginTop: "2rem" }}
        onSubmit={handleSubmit}
      >
        <TextInput
          label="Username"
          variant="filled"
          withAsterisk
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <PasswordInput
          label="Password"
          variant="filled"
          withAsterisk
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <Button
          type="submit"
          variant="filled"
          color="cyan"
          sx={{ marginTop: "1rem", alignSelf: "center" }}
        >
          Connect
        </Button>
      </Box>
    </Box>
  );
};

export default LoginPage;
