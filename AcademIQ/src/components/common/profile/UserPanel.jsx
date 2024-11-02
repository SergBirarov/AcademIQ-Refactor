import { Card, CardContent, Typography, Box } from "@mui/material";
import { UserAvatar } from "./UserAvatar";
import { AuthContext} from "../../../context/AuthContext";
import { useContext } from "react";
export default function UserPanel(){
    const { user, logout } = useContext (AuthContext);

    if(!user){
        return (
            <div>Loading...</div>
        )}

    return(
        <Card sx={{ height: '30%', width: '100%', borderRadius: '0', border: 'none', boxShadow: 'none',
            backgroundColor: 'transparent',
            backdropFilter: 'blur(5px)',
            
          }}>
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