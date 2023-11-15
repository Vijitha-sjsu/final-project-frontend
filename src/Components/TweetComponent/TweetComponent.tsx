import React, { memo, useState, useEffect } from "react";
import format from "date-fns/format";
import { Card, CardContent, CardHeader, Typography, IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CustomAvatar from "../AvatarComponent/AvatarComponent.tsx";
import { UserData, useUserData } from "../../Contexts/UserDataContext.tsx";
import axios from "axios";

export interface TweetComponentProps {
    userId: string;
    authorId: string;
    postId: string;
    createdDate: string;
    lastModifiedDate: string;
    content: string;
    onEditPost: any;
    onDeletePost: any;
}

const TweetComponent: React.FC<TweetComponentProps> = memo(({ userId, authorId, postId, createdDate, lastModifiedDate, content, onEditPost, onDeletePost }) => {
    const [user, setUser] = useState<UserData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const { userData, setUserData } = useUserData();

    useEffect(() => {
        const fetchUser = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`http://localhost:8050/api/users/getUser/${userId}`);
                setUser(response.data);
            } catch (error) {
                console.error("Failed to fetch user details:", error);
            }
            setIsLoading(false);
        };

        fetchUser();
    }, [userId]);

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleEditPost = () => {
        onEditPost({ userId, authorId, postId, createdDate, lastModifiedDate, content});
        handleMenuClose();
    };

    const handleDeletePost = () => {
        onDeletePost(postId); 
        handleMenuClose();
    };

    const fullName = `${user?.firstName} ${user?.lastName}`.trim();

    if (isLoading) {
        return <div>Loading user data...</div>;
    }

    return (
        <Card sx={{ borderRadius: '16px' }}>
            <CardHeader
                avatar={ <CustomAvatar name={fullName} size={48}/>}
                action={
                    <>
                        <IconButton aria-label="settings" onClick={handleMenuClick}>
                            <MoreVertIcon />
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleMenuClose}
                        >
                            {userId === userData.userId && (
                                <><MenuItem onClick={handleEditPost}>Edit Post</MenuItem><MenuItem onClick={handleDeletePost}>Delete Post</MenuItem></>
                            )}
                        </Menu>
                    </>
                }
                title={user?.username}
                subheader={format(new Date(lastModifiedDate), "MMM d, yyyy")}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {content}
                </Typography>
            </CardContent>
        </Card>
    );
});

export default TweetComponent;
