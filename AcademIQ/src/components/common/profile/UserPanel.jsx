import { Card, CardContent, CardHeader, Typography, Box } from "@mui/material";
import { UserAvatar } from "./UserAvatar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
export default function UserPanel(){
    const { user  } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            return(<div>Loading...</div>)
        }
      }, [user, navigate]);
  
        
    const { Name, Picture_URL, Major, role} = user;

    return(
        <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'transparent', padding: 0
        }}>
                <CardHeader
                 avatar= {role === 'Student' ? <UserAvatar image={Picture_URL} size="small" />: null}
                  title={
                  <Typography variant="h6">
                    {Name}
                    </Typography>}>
                    </CardHeader>
            <CardContent sx={{  backgroundColor: 'transparent', padding: 0}}>

            
                <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent:'space-evenly'
            }}>{ role === 'Student' ? (
                <>
                <Typography variant="body2">
                <strong>School:</strong> Ruppin Academic Center
            </Typography>
            <Typography variant="body2">
                <strong>Major:</strong> {Major}
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