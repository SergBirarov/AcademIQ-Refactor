import { Box, Button } from "@mui/material";

export const LogOutButton = () => {
    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
        <Button size="medium">
            Log Out
        </Button>
        </Box>

    );
}