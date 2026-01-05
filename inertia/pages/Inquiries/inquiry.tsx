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
import MoreHoriz from "@mui/icons-material/MoreHoriz";
import ThumbUpAltOutlined from "@mui/icons-material/ThumbUpAltOutlined";
import ChatBubbleOutline from "@mui/icons-material/ChatBubbleOutline";
import ShareOutlined from "@mui/icons-material/ShareOutlined";
import { Head, Link, useForm } from '@inertiajs/react';


interface Inquiry {
  id?: number;
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
  role?: "buyer" | "vendor";
  avatar?: string | null;
}

const InquiryPost: React.FC<{ inquiry: Inquiry; user?: User | null }> = ({
  inquiry,
  user,
}) => {
  const attachments = inquiry.attachments || [];

  // Decide how many to show like FB
  const displayAttachments = attachments.slice(0, 4);
  const extraCount = attachments.length - displayAttachments.length;

  return (
    <Card
      sx={{
        maxWidth: 600,
        margin: "20px auto",
        borderRadius: 3,
        boxShadow: 2,
      }}
    >
      {/* Post Header */}
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "primary.main" }}>
            {user?.name ? user.name[0] : "U"}
          </Avatar>
        }
        action={
          <IconButton>
            <MoreHoriz />
          </IconButton>
        }
        title={
          <Typography variant="subtitle1" fontWeight={600}>
            {user?.name || "User Name"}
          </Typography>
        }
        subheader={user?.email || "3h ago"}
      />

      {/* Post Text */}
      <CardContent sx={{ pb: 1 }}>
        <Typography variant="body1">
          🚗 Vehicle Inquiry: {inquiry.partDescription}
        </Typography>
        <Typography variant="body2" color="text.secondary" mt={1}>
          Make: {inquiry.vehicleMake} | Model: {inquiry.vehicleModel} | Year:{" "}
          {inquiry.year}
        </Typography>
      </CardContent>

      {/* Facebook-style Photo Grid */}
      {attachments.length > 0 && (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns:
              displayAttachments.length === 1
                ? "1fr"
                : displayAttachments.length === 2
                ? "1fr 1fr"
                : "1fr 1fr",
            gridTemplateRows:
              displayAttachments.length > 2 ? "1fr 1fr" : "1fr",
            gap: 0.5,
            px: 2,
            pb: 1,
          }}
        >
          {displayAttachments.map((attachment, index) => {
            const isImage = attachment.name.match(/\.(jpg|jpeg|png|gif|webp)$/i);
            const isVideo = attachment.name.match(/\.(mp4|mov|avi|webm)$/i);
            const showUrl = `/inquiries/${inquiry.id}`;
            return (
              <Box
                key={index}
                sx={{
                  position: "relative",
                  width: "100%",
                  height: index === 0 && displayAttachments.length === 3 ? 250 : 150,
                  borderRadius: 1,
                  overflow: "hidden",
                }}
              >
                {isImage ? (
                  <Link href={showUrl} style={{ display: 'block', width: '100%', height: '100%' }}>
                    <img
                      src={attachment.url}
                      alt={attachment.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </Link>
                ) : isVideo ? (
                  <video
                    src={attachment.url}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    controls
                    muted
                  />
                ) : null}
                {/* Overlay if extra images exist */}
                {index === displayAttachments.length - 1 && extraCount > 0 && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      bgcolor: "rgba(0,0,0,0.5)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      fontSize: "1.5rem",
                      fontWeight: "bold",
                    }}
                  >
                    +{extraCount}
                  </Box>
                )}
              </Box>
            );
          })}
        </Box>
      )}

      {/* Like / Comment / Share */}
      <CardActions
        sx={{ display: "flex", justifyContent: "space-around", pt: 1 }}
      >
        <IconButton>
          <ThumbUpAltOutlined />
          <Typography variant="body2" ml={1}>
            Like
          </Typography>
        </IconButton>
        <IconButton>
          <ChatBubbleOutline />
          <Typography variant="body2" ml={1}>
            Comment
          </Typography>
        </IconButton>
        <IconButton>
          <ShareOutlined />
          <Typography variant="body2" ml={1}>
            Share
          </Typography>
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default InquiryPost;
