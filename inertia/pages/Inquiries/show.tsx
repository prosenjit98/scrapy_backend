import React, { useState } from "react";
import { Box, IconButton } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

type Attachment = {
  file?: {
    url?: string;
    name?: string;
  };
};

type Inquiry = {
  attachments?: Attachment[];
  partDescription?: string;
  vehicleMake?: string;
  vehicleModel?: string;
  year?: string | number;
};

interface InquiryShowProps {
  inquiry: Inquiry;
}

const InquiryShow: React.FC<InquiryShowProps> = ({ inquiry }) => {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const images = (inquiry.attachments || [])
    .map(att => ({ url: att.file?.url, name: att.file?.name }))
    .filter(img => img.url);

  const prevImage = () => setCarouselIndex(i => (i === 0 ? images.length - 1 : i - 1));
  const nextImage = () => setCarouselIndex(i => (i === images.length - 1 ? 0 : i + 1));

  return (
    <Box sx={{ display: 'flex', maxWidth: 900, margin: '40px auto', border: '1px solid #eee', borderRadius: 3, boxShadow: 2 }}>
      {/* Left: Details and Carousel */}
      <Box sx={{ flex: 2, p: 3 }}>
        <h2>Inquiry Details</h2>
        <Box sx={{ mb: 2 }}>
          <p><strong>Description:</strong> {inquiry.partDescription}</p>
          <p><strong>Make:</strong> {inquiry.vehicleMake}</p>
          <p><strong>Model:</strong> {inquiry.vehicleModel}</p>
          <p><strong>Year:</strong> {inquiry.year}</p>
        </Box>
        {/* Carousel */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 320, bgcolor: '#fafafa', borderRadius: 2, boxShadow: 1 }}>
          {images.length > 0 ? (
            <>
              <IconButton onClick={prevImage} sx={{ mr: 2 }}>
                <ArrowBackIos />
              </IconButton>
              <Box sx={{ width: 320, height: 320, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img
                  src={images[carouselIndex].url}
                  alt={images[carouselIndex].name}
                  style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: 8, objectFit: 'contain' }}
                />
              </Box>
              <IconButton onClick={nextImage} sx={{ ml: 2 }}>
                <ArrowForwardIos />
              </IconButton>
            </>
          ) : (
            <Box sx={{ textAlign: 'center', width: '100%' }}>
              <p>No images available.</p>
            </Box>
          )}
        </Box>
      </Box>
      {/* Right: Comments */}
      <Box sx={{ flex: 1, p: 3, borderLeft: '1px solid #eee', bgcolor: '#f9f9f9', minWidth: 250 }}>
        <h3>Comments</h3>
        {/* Placeholder for comments section */}
        <Box sx={{ mt: 2 }}>
          <p style={{ color: '#888' }}>No comments yet.</p>
          {/* You can add a comment form and list here */}
        </Box>
      </Box>
    </Box>
  );
};

export default InquiryShow;