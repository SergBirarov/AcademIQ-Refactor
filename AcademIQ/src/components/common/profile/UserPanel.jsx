import { Card, CardContent, Typography, Box } from "@mui/material";
import { UserAvatar } from "./UserAvatar";
import { useUser } from "../../../context/UserContext";

export default function UserPanel(){
    const { user } = useUser();

    if(!user){
        return (
            <div>Loading...</div>
        )}

    return(
        <Card>
                <CardContent>

                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                mb: 2
                            }}>
                            <UserAvatar image={user.picture_URL} size="small"/>
                            <Typography
                             variant="h6"
                              align="center">
                                {user.firstName} {user.lastName}
                            </Typography>
                            </Box>
            
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'start',
                justifyContent:'space-evenly'
            }}>
                            <Typography variant="body2">
                                <strong>School:</strong> Ruppin Academic Center
                            </Typography>
                            <Typography variant="body2">
                                <strong>Major:</strong> Software Engineering
                            </Typography>
                            <Typography variant="body2">
                                <strong>Class:</strong> 33
                            </Typography>
                            </Box>
                </CardContent>
            </Card>
    )
}