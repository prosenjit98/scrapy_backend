import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import { MoreHoriz, ThumbUpAltOutlined, ChatBubbleOutline, ShareOutlined } from "@mui/icons-material";

interface Inquiry {
  vehicleMake: number;
  vehicleModel: number;
  partDescription: string;
  year: string;
  attachments?: { url: string; name: string }[];
}

interface User {
  id?: number;
  name?: string;
  email?: string;
  address?: string;
  phoneNumber?: string;
  role?: 'buyer' | 'vendor';
  avatar?: string | null;
}

const InquiryPost: React.FC<{ inquiry: Inquiry; user?: User | null }> = ({ inquiry, user }) => {
  return (
    <Card sx={{ maxWidth: 600, margin: "20px auto", borderRadius: 3, boxShadow: 2 }}>
      {/* Post Header */}
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: "primary.main" }}>{user?.name ? user.name[0] : "U"}</Avatar>}
        action={
          <IconButton>
            <MoreHoriz />
          </IconButton>
        }
        title={<Typography variant="subtitle1" fontWeight={600}>{user?.name || "User Name"}</Typography>}
        subheader={user?.email || "3h ago"}
      />

      {/* Post Text */}
      <CardContent sx={{ pb: 1 }}>
        <Typography variant="body1">
          🚗 Vehicle Inquiry: {inquiry.partDescription}
        </Typography>
        <Typography variant="body2" color="text.secondary" mt={1}>
          Make: {inquiry.vehicleMake} | Model: {inquiry.vehicleModel} | Year: {inquiry.year}
        </Typography>
      </CardContent>

      {/* Post Attachments */}
            {/* Post Attachments */}
      {inquiry.attachments && inquiry.attachments.length > 0 && (
        <Box sx={{ px: 2, pb: 1 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Attachments:
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {inquiry.attachments.map((attachment, index) => {
              const isImage = attachment.name.match(/\.(jpg|jpeg|png|gif|webp)$/i);
              const isVideo = attachment.name.match(/\.(mp4|mov|avi|webm)$/i);
              
              return (
                <Box 
                  key={index}
                  sx={{ 
                    width: 80, 
                    height: 80, 
                    borderRadius: 1, 
                    overflow: 'hidden',
                    border: '1px solid #e0e0e0'
                  }}
                >
                  {isImage && (
                    <img
                      src={attachment.url}
                      alt={attachment.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  )}
                  {isVideo && (
                    <video
                      src={attachment.url}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                      controls
                      muted
                    />
                  )}
                  {!isImage && !isVideo && (
                    <Box 
                      sx={{ 
                        width: '100%', 
                        height: '100%', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        bgcolor: 'grey.100'
                      }}
                    >
                      <Typography variant="caption">File</Typography>
                    </Box>
                  )}
                </Box>
              );
            })}
          </Box>
        </Box>
      )}

      {/* Like / Comment / Share */}
      <CardActions sx={{ display: "flex", justifyContent: "space-around", pt: 1 }}>
        <IconButton>
          <ThumbUpAltOutlined />
          <Typography variant="body2" ml={1}>Like</Typography>
        </IconButton>
        <IconButton>
          <ChatBubbleOutline />
          <Typography variant="body2" ml={1}>Comment</Typography>
        </IconButton>
        <IconButton>
          <ShareOutlined />
          <Typography variant="body2" ml={1}>Share</Typography>
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default InquiryPost;
