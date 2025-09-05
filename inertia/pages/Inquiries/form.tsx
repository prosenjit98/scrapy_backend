import { useState } from "react";
import { router } from "@inertiajs/react";
import {
  TextField,
  Button,
  Stack,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
  Typography,
  Chip,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Divider,
  RadioGroup,
  FormControlLabel,
  Radio
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import MicIcon from "@mui/icons-material/Mic";

interface Inquiry {
  vehicleMake: number;
  vehicleModel: number;
  partDescription: string;
  year: string;
  attachments?: File[];
}

interface InquiryFormProps {
  vehicleMakes: { id: number; name: string }[];
  vehicleModels: { id: number; name: string }[];
  initialData?: Partial<Inquiry>;
  onSubmitSuccess?: () => void;
  onCancel?: () => void;
  submitButtonText?: string;
  showCancelButton?: boolean;
}

const steps = [
  "Fill out the form, tell us what you need.",
  "Get a verification call in minutes with a verified sellers list.",
  "Get the best quotes from genuine sellers straight to your inbox.",
  "Seal the Deal."
];

export default function InquiryForm({
  vehicleMakes,
  vehicleModels,
  initialData = {},
  onSubmitSuccess,
  onCancel,
  submitButtonText = "Create Inquiry",
  showCancelButton = true
}: InquiryFormProps) {
  const [form, setForm] = useState<Inquiry>({
    vehicleMake: initialData.vehicleMake || 0,
    vehicleModel: initialData.vehicleModel || 0,
    partDescription: initialData.partDescription || "",
    year: initialData.year || "",
    attachments: []
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    // Filter for photos and videos only
    const validFiles = files.filter(file => {
      const isImage = file.type.startsWith('image/');
      const isVideo = file.type.startsWith('video/');
      return isImage || isVideo;
    });

    if (validFiles.length !== files.length) {
      alert('Only image and video files are allowed');
    }

    setForm({ ...form, attachments: [...(form.attachments || []), ...validFiles] });
  };

  const removeFile = (index: number) => {
    const newAttachments =
      form.attachments?.filter((_, i) => i !== index) || [];
    setForm({ ...form, attachments: newAttachments });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("vehicleMake", form.vehicleMake.toString());
      formData.append("vehicleModel", form.vehicleModel.toString());
      formData.append("partDescription", form.partDescription);
      formData.append("year", form.year);

      if (form.attachments && form.attachments.length > 0) {
        form.attachments.forEach((file, index) => {
          formData.append(`attachments[${index}]`, file);
        });
      }

      router.post("/inquiries", formData, {
        preserveState: false,
        forceFormData: true,
        onSuccess: () => {
          setIsSubmitting(false);
          if (onSubmitSuccess) onSubmitSuccess();
        },
        onError: () => setIsSubmitting(false)
      });
    } catch (error) {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
    else router.visit("/inquiries");
  };

  return (
    
    <Paper
      sx={{
        display: "flex",
        width: "100%",
        maxWidth: "100%",
        flexDirection: "row",
      }}
    >
      <Box sx={{ backgroundColor: "#f8f9fa", p: 3, borderRadius: 2, mb: 3 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          One Request, Multiple Proposals
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          How it works?
        </Typography>

        <Stepper orientation="vertical" activeStep={-1}>
          {steps.map((label, index) => (
            <Step key={index}>
              <StepLabel>
                <Typography variant="body2">{label}</Typography>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      <Box sx={{ backgroundColor: "#fff", p: 3, borderRadius: 2 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Post Buy Requirement
        </Typography>
        <Typography variant="body2" gutterBottom>
          Tell us what you need, and we'll help you get quotes
        </Typography>

        <form onSubmit={handleSubmit}>
          <Stack spacing={3} mt={2}>
            <FormControl fullWidth>
              <InputLabel id="vehicle-make-label">Vehicle Make</InputLabel>
              <Select
                labelId="vehicle-make-label"
                name="vehicleMake"
                value={form.vehicleMake}
                onChange={(e) =>
                  setForm({ ...form, vehicleMake: Number(e.target.value) })
                }
                required
              >
                <MenuItem value={0} disabled>
                  Select a vehicle make
                </MenuItem>
                {(vehicleMakes || []).map((make) => (
                  <MenuItem key={make.id} value={make.id}>
                    {make.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="vehicle-model-label">Vehicle Model</InputLabel>
              <Select
                labelId="vehicle-model-label"
                name="vehicleModel"
                value={form.vehicleModel}
                onChange={(e) =>
                  setForm({ ...form, vehicleModel: Number(e.target.value) })
                }
                required
              >
                <MenuItem value={0} disabled>
                  Select a vehicle model
                </MenuItem>
                {(vehicleModels || []).map((model) => (
                  <MenuItem key={model.id} value={model.id}>
                    {model.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Part Description"
              name="partDescription"
              value={form.partDescription}
              onChange={handleChange}
              fullWidth
              multiline
              rows={3}
              required
              placeholder="Describe the part you're looking for..."
            />

            <TextField
              label="Year"
              name="year"
              type="number"
              value={form.year}
              onChange={handleChange}
              fullWidth
              required
              placeholder="e.g., 2020"
              inputProps={{
                min: 1900,
                max: new Date().getFullYear() + 1
              }}
            />

            {/* Recording Button */}
``            {/* <Box>
              <Typography variant="body2" fontWeight="500" gutterBottom>
                Personalise your inquiry
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Record your requirement to communicate clearly & faster with
                sellers.
              </Typography>
              <Paper
                sx={{
                  mt: 2,
                  p: 2,
                  display: "flex",
                  alignItems: "center",
                  border: "1px solid #ddd",
                  borderRadius: 2,
                  cursor: "pointer",
                  "&:hover": { backgroundColor: "#f5f5f5" }
                }}
              >
                <MicIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="body2">
                  Click here to record
                </Typography>
              </Paper>
            </Box> */}


            {/* File Upload Section */}
            <Box>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Photos & Videos (optional)
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Upload photos or videos of the required part. Max 10MB per file.
              </Typography>
              
              <Button
                component="label"
                variant="outlined"
                startIcon={<CloudUploadIcon />}
                sx={{ mb: 2 }}
              >
                Upload Photos/Videos
                <input
                  type="file"
                  hidden
                  multiple
                  accept="image/*,video/*"
                  onChange={handleFileChange}
                />
              </Button>
              
              {form.attachments && form.attachments.length > 0 && (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                  {form.attachments.map((file, index) => {
                    const isImage = file.type.startsWith('image/');
                    const isVideo = file.type.startsWith('video/');
                    const fileUrl = URL.createObjectURL(file);
                    
                    return (
                      <Paper
                        key={index}
                        sx={{
                          p: 1,
                          position: 'relative',
                          width: 120,
                          height: 120,
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        {isImage && (
                          <img
                            src={fileUrl}
                            alt={file.name}
                            style={{
                              width: '100%',
                              height: '80px',
                              objectFit: 'cover',
                              borderRadius: '4px'
                            }}
                          />
                        )}
                        {isVideo && (
                          <video
                            src={fileUrl}
                            style={{
                              width: '100%',
                              height: '80px',
                              objectFit: 'cover',
                              borderRadius: '4px'
                            }}
                            muted
                          />
                        )}
                        <Typography 
                          variant="caption" 
                          sx={{ 
                            textAlign: 'center',
                            wordBreak: 'break-all',
                            fontSize: '10px',
                            mt: 0.5
                          }}
                        >
                          {file.name.length > 15 ? file.name.substring(0, 15) + '...' : file.name}
                        </Typography>
                        <Chip
                          size="small"
                          label="×"
                          onClick={() => removeFile(index)}
                          sx={{
                            position: 'absolute',
                            top: -8,
                            right: -8,
                            minWidth: 20,
                            height: 20,
                            '& .MuiChip-label': { px: 0 }
                          }}
                        />
                      </Paper>
                    );
                  })}
                </Box>
              )}
            </Box>

            <Divider />

            {/* Buttons */}
            <Stack direction="row" spacing={2}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                disabled={isSubmitting}
                sx={{ borderRadius: 2 }}
              >
                {isSubmitting ? "Submitting..." : submitButtonText}
              </Button>
              {showCancelButton && (
                <Button
                  variant="outlined"
                  color="secondary"
                  size="large"
                  onClick={handleCancel}
                  disabled={isSubmitting}
                  sx={{ borderRadius: 2 }}
                >
                  Cancel
                </Button>
              )}
            </Stack>
          </Stack>
        </form>
      </Box>
    </Paper>
  );
}
