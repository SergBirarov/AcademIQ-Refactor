import { Card, CardContent, CardHeader, Typography, Box } from "@mui/material";
import { UserAvatar } from "./UserAvatar";
import { useSelector } from "react-redux";
export default function UserPanel(){
    const { user  } = useSelector((state) => state.auth);

    
    if(user === null){
        return (
            <div>Loading...</div>
        )}
        
    const { FirstName, LastName, Picture_URL} = user;
    return(
        <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'transparent', padding: 0
        }}>
            <CardHeader avatar={<UserAvatar image={Picture_URL} size="small" />} title={<Typography variant="h6">{FirstName} {LastName}</Typography>}>
            <UserAvatar image={Picture_URL} size="small" />
                <Typography variant="h6">
                    {FirstName} {LastName}
                </Typography>
            </CardHeader>
            <CardContent sx={{  backgroundColor: 'transparent', padding: 0}}>

            
                <Box sx={{
                display: 'flex',
                flexDirection: 'column',
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
                {/* <CardContent>

                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                mb: 2
                            }}>
                            <UserAvatar image={Picture_URL} size="small" />
                            <Typography
                             variant="h6"
                              align="center">
                                {FirstName} {LastName}
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
                </CardContent> */}
            </Card>
    )
}