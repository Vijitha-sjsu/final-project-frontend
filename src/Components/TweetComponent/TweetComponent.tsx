import React, { memo, ReactElement } from "react";
import format from "date-fns/format";
import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CustomAvatar from "../AvatarComponent/AvatarComponent.tsx";

export interface TweetComponentProps {
    id: number;
    user: {
        id: number;
        username: string;
    }
    time: string;
    textContent: string;
} 

const TweetComponent: React.FC<TweetComponentProps> = memo(({ id, user, time, textContent}): ReactElement => {
    const userId = "fakeUserID" 

    return (
        <Card sx={{ borderRadius: '16px' }}>
            <CardHeader
                avatar={ <CustomAvatar name={user.username} />}
                action={
                <IconButton aria-label="settings">
                    <MoreVertIcon />
                </IconButton>
                }
                title= {user.username}
                subheader= {format(new Date(time), "MMM d")}
            />

            <CardContent>
                <Typography variant="body2" color="text.secondary">
                {textContent}
                </Typography>
            </CardContent>
        </Card>
    
    )});

export default TweetComponent;
