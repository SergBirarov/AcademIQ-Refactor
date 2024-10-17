import { Avatar, Box, Card, CardContent, Typography, styled, Grid2 } from "@mui/material";
import { useUser } from "../../../context/UserContext";

 const UserAvatat = ({image, size = "medium"}) => {

    const sizes = {
        small: { width: 50, height: 50 },
        medium: { width: 100, height: 100 },
        large: { width: 150, height: 150 },
    };

    
    return(
        <Box>
            <Avatar
                src={image } 
                sx={{
                    width: sizes[size].width,
                    height: sizes[size].height,
                }}
            />
        </Box>
    )
}

const CardStyled = styled(Card)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    display:'flex',
    flexDirection: 'column',
    flexGrow: 1,
    width: '100%',
    height: '100%',
}));



export default function UserPanel(){
    const { user } = useUser();

    return(
        <CardStyled>
                <CardContent>

                        <Grid2 item xs={12} sm={12} display="flex" flexDirection="column" justifyContent="space-between"  alignItems="center">
                            <UserAvatat image={user?.picture_URL} size="small"/>
                            <Typography
                             variant="h6"
                              align="center">
                                {user.firstName} {user.lastName}
                            </Typography>
                        </Grid2>
            
                        <Grid2 item xs={12} sm={12} display="flex" flexDirection="column" alignItems="start" gap={2}>
                            <Typography variant="body2">
                                <strong>School:</strong> Ruppin Academic Center
                            </Typography>
                            <Typography variant="body2">
                                <strong>Major:</strong> Software Engineering
                            </Typography>
                            <Typography variant="body2">
                                <strong>Class:</strong> 33
                            </Typography>
                        </Grid2>
                </CardContent>
            </CardStyled>
    )
}