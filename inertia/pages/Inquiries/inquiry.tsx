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
  attachments?: File[];
}

const InquiryPost: React.FC<{ inquiry: Inquiry }> = ({ inquiry }) => {
  return (
    <Card sx={{ maxWidth: 600, margin: "20px auto", borderRadius: 3, boxShadow: 2 }}>
      {/* Post Header */}
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: "primary.main" }}>U</Avatar>}
        action={
          <IconButton>
            <MoreHoriz />
          </IconButton>
        }
        title={<Typography variant="subtitle1" fontWeight={600}>User Name</Typography>}
        subheader="3h ago"
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
      {inquiry.attachments && inquiry.attachments.length > 0 && (
        <Box
          component="img"
          src={URL.createObjectURL(inquiry.attachments[0])}
          alt="attachment"
          sx={{ width: "100%", maxHeight: 400, objectFit: "cover" }}
        />
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
