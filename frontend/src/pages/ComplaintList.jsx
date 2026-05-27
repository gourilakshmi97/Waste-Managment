import { useEffect, useState } from "react";

import {
  Container,
  Typography,
  CircularProgress,
  Box,
  Paper,
  Grid,
} from "@mui/material";

import Navbar from "../components/Navbar";
import ComplaintCard from "../components/ComplaintCard";
import API from "../services/api";

function ComplaintList() {

  const [myComplaints, setMyComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchMyComplaints = async () => {

      try {

        const response = await API.get(
          "/complaints/my-complaints"
        );

        setMyComplaints(response.data);

      } catch (error) {

        console.error(
          "Error fetching my complaints:",
          error
        );

      } finally {

        setLoading(false);
      }
    };

    fetchMyComplaints();

  }, []);

  return (
    <>
      <Navbar />

      <Box
        sx={{
          minHeight: "100vh",
          background:
            "linear-gradient(to bottom,#f0fdf4,#dcfce7)",
          py: 5,
        }}
      >

        <Container maxWidth="xl">

          <Paper
            elevation={5}
            sx={{
              p: 4,
              mb: 5,
              borderRadius: 5,
              textAlign: "center",
              background:
                "linear-gradient(135deg,#166534,#22c55e)",
              color: "white",
            }}
          >

            <Typography
              variant="h3"
              fontWeight="bold"
            >
              My Reported Issues
            </Typography>

            <Typography sx={{ opacity: 0.9 }}>
              Track all complaints you reported
            </Typography>

          </Paper>

          {loading ? (

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mt: 10,
              }}
            >
              <CircularProgress color="success" />
            </Box>

          ) : (

            <Grid container spacing={4}>

              {myComplaints.length > 0 ? (

                myComplaints.map((complaint) => (

                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    key={complaint._id}
                  >
                    <ComplaintCard
                      complaint={complaint}
                    />
                  </Grid>

                ))

              ) : (

                <Grid item xs={12}>

                  <Paper
                    sx={{
                      p: 5,
                      borderRadius: 4,
                      textAlign: "center",
                    }}
                  >

                    <Typography variant="h6">
                      No complaints reported yet.
                    </Typography>

                  </Paper>

                </Grid>

              )}

            </Grid>

          )}

        </Container>

      </Box>
    </>
  );
}

export default ComplaintList;