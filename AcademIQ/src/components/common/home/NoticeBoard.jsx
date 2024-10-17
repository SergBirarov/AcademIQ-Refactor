import { Box, Grid2, Typography, Card, CardContent, Button } from "@mui/material";

const newsItems = [
    {
      title: "School Closes",
      date: "Today",
      preview: "The school will close on Friday, 15th of June.",
    },
    {
      title: "School Closes",
      date: "Today",
      preview: "The school will close on Friday, 15th of June.",
    },
    {
      title: "School Closes",
      date: "Today",
      preview: "The school will close on Friday, 15th of June.",
    },
]
export default function NoticeBoard() {
  return (
    <Box sx={{ padding: 4, width: '100%' }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Your School's Latest News
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 4 }}>
        Stay updated with the latest happenings at your school.
      </Typography>

      <Grid2 container spacing={4}>
        {newsItems.map((item, index) => (
          <Grid2 item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ minHeight: 200 }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {item.date}
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  {item.preview}
                </Typography>
                <Button size="small" variant="contained">
                  Read More
                </Button>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
}
