import { Card, CardContent, CardHeader, Typography, Box } from "@mui/material";
import { UserAvatar } from "./UserAvatar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
export default function UserPanel(){
    const { user, role  } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            alert("User not logged in. Redirecting to login page...");
          navigate("/login");
        }
      }, [user, navigate]);
  
        
    const { FirstName, LastName, Picture_URL} = user;

    return(
        <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'transparent', padding: 0
        }}>
                <CardHeader
                 avatar= {role === 3 ? <UserAvatar image={Picture_URL} size="small" />: null}
                  title={
                  <Typography variant="h6">
                    {FirstName} {LastName}
                    </Typography>}>
                    </CardHeader>
            <CardContent sx={{  backgroundColor: 'transparent', padding: 0}}>

            
                <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent:'space-evenly'
            }}>{ role === 3 ? (
                <>
                <Typography variant="body2">
                <strong>School:</strong> Ruppin Academic Center
            </Typography>
            <Typography variant="body2">
                <strong>Major:</strong> Software Engineering
            </Typography>
            </>
            ) : (
                <Typography variant="body2">
                    <strong>Admin</strong> [School Name]
                </Typography>
            )}
                          
                            </Box>

            </CardContent>
            </Card>
    )
}