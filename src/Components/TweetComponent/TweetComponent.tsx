import React, { memo, useState, useEffect } from "react";
import format from "date-fns/format";
import { Card, CardContent, CardHeader, Typography, IconButton, Menu, MenuItem, useTheme } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CustomAvatar from "../AvatarComponent/AvatarComponent.tsx";
import { UserData, useUserData } from "../../Contexts/UserDataContext.tsx";
import axios from "axios";
import { FOLLOW_SERVICE_BASE_URL } from "../../constants.ts";

export interface TweetComponentProps {
    userId: string;
    authorId: string;
    postId: string;
    createdDate: string;
    lastModifiedDate: string;
    content: string;
    onEditPost?: any;
    onDeletePost?: any;
    unfollow?: boolean;
}

const TweetComponent: React.FC<TweetComponentProps> = memo(({ userId, authorId, postId, createdDate, lastModifiedDate, content, onEditPost, onDeletePost, unfollow }) => {
    const [user, setUser] = useState<UserData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const { userData, setUserData } = useUserData();
    const theme = useTheme();

    useEffect(() => {
        const fetchUser = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`${FOLLOW_SERVICE_BASE_URL}/api/users/getUser/${userId}`);
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

    const handleUnfollowUser = async () => {
        try {
        await axios.post(`${FOLLOW_SERVICE_BASE_URL}/api/users/${userData.userId}/unfollow/${authorId}`);
        const updatedUserData = {
            ...userData,
            following: userData.following.filter(userId => userId !== authorId)
        };
        setUserData(updatedUserData);
        } catch (error) {
        const message = error.response && error.response.data ? error.response.data.message : error.message;
        console.error(message)
        }
        handleMenuClose();
    };

    const fullName = `${user?.firstName} ${user?.lastName}`.trim();

    if (isLoading) {
        return <div>Loading user data...</div>;
    }

    return (
        <Card sx={{ 
            borderRadius: '16px', 
            boxShadow: theme.shadows[2], 
            border: `1px solid ${theme.palette.divider}`, 
            '&:hover': {
                boxShadow: `2px 2px 2px 2px ${theme.palette.primary.main}`, 
            },
            backgroundColor: theme.palette.background.paper 
        }}>
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
                            {onEditPost && (
                                <><MenuItem onClick={handleEditPost}>Edit Post</MenuItem><MenuItem onClick={handleDeletePost}>Delete Post</MenuItem></>
                            )}

                            {unfollow && (
                                <><MenuItem onClick={handleUnfollowUser}>Unfollow User</MenuItem></>
                            )}
                        </Menu>
                    </>
                }
                title={<Typography variant="subtitle1">{user?.username}</Typography>}
                subheader={format(new Date(lastModifiedDate), "MMM d, yyyy")}
                titleTypographyProps={{ fontWeight: 'bold' }} 
                subheaderTypographyProps={{ color: 'text.secondary' }}
                sx={{ pb: 0 }} 
            />
            <CardContent sx={{ pt: 1 }}> 
                <Typography variant="body2" color="text.primary" sx={{ 
                wordBreak: 'break-word', 
                overflowWrap: 'break-word', 
                }}>
                    {content}
                </Typography>
            </CardContent>
        </Card>
    );
});

export default TweetComponent;
