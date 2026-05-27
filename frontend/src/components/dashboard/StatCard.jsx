import { Card, CardContent, Typography, Box } from "@mui/material";

const StatCard = ({ title, value, color, icon }) => {
  return (
    <Card
      sx={{
        borderLeft: `6px solid ${color}`,
        borderRadius: 4,
        boxShadow: 3,
        height: "100%",
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="body2" color="text.secondary">
              {title}
            </Typography>

            <Typography variant="h4" fontWeight="bold" mt={2}>
              {value}
            </Typography>
          </Box>

          <Box fontSize="2.5rem" color={color}>
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default StatCard;