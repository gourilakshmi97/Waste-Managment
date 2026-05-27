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

function ComplaintPage() {

  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchComplaints = async () => {

      try {

        const res = await API.get(
          "/complaints/my-complaints"
        );

        setComplaints(res.data);

      } catch (err) {

        console.error(err);

      } finally {

        setLoading(false);
      }
    };

    fetchComplaints();

  }, []);

  return (
    <>
      <Navbar />

      <Container maxWidth="xl" sx={{ mt: 5 }}>

        <Typography
          variant="h3"
          textAlign="center"
          fontWeight="bold"
          color="#166534"
          mb={5}
        >
          Complaint History
        </Typography>

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

            {complaints.length > 0 ? (

              complaints.map((complaint) => (

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
                    No complaints found
                  </Typography>

                </Paper>

              </Grid>

            )}

          </Grid>

        )}

      </Container>
    </>
  );
}

export default ComplaintPage;