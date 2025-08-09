import React, { ReactNode } from "react";
import { useWakeLock } from "react-screen-wake-lock";
import {
  Drawer,
  Container,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useTheme,
  Stack,
  Card,
  CardContent,
  IconButton,
  Tooltip,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Config from "./Config";
import { allThemes } from "./themes";
import lotus from "./images/lotus.png";

type OptionsModalProps = {
  children: ReactNode;
  isOpen: boolean;
  updateCurrentThemeName: (theme: string) => void;
  onClose: () => void;
};

const OptionsModal = ({
  children,
  isOpen,
  onClose,
  updateCurrentThemeName,
}: OptionsModalProps) => {
  const { isSupported: wakeLockIsSupported } = useWakeLock();
  const currentTheme = useTheme();

  return (
    <>
      {children}
      <Drawer
        anchor="bottom"
        open={isOpen}
        onClose={onClose}
        PaperProps={{
          sx: {
            height: "auto",
            maxHeight: "clamp(420px, 75dvh, 800px)",
            width: "100%",
            top: "auto",
            bottom: 0,
            left: 0,
            right: 0,
            margin: 0,
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            backgroundColor: "#ffffff",
            backdropFilter: "blur(20px)",
            display: "flex",
            flexDirection: "column",
          },
        }}
      >
        <Container
          maxWidth="sm"
          disableGutters
          sx={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            py: 2,
            px: { xs: 2, sm: 3 },
            minHeight: 0,
          }}
        >
          {/* Header */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1.25,
              pb: 1.5,
            }}
          >
            <Box
              component="img"
              src={lotus}
              alt="Lotus logo"
              sx={{
                width: { xs: 44, sm: 54 },
                height: { xs: 44, sm: 54 },
                opacity: 0.92,
                filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.25))",
                animation: "fadeSlide 520ms ease-out both",
              }}
            />
            <Typography
              variant="h5"
              component="h2"
              sx={{
                textAlign: "center",
                fontWeight: 500,
                letterSpacing: 0.5,
                animation: "fadeSlide 520ms ease-out both",
                animationDelay: "40ms",
                m: 0,
              }}
            >
              Settings
            </Typography>
          </Box>

          {/* Scrollable content */}
          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
              pr: 0.5,
              WebkitOverflowScrolling: "touch",
              pb: { xs: 1, sm: 1.5 },
            }}
          >
            <Stack spacing={2.5}>
              {/* Appearance Card */}
              <Card
                variant="outlined"
                component="section"
                aria-labelledby="appearance-heading"
                sx={{
                  animation: "fadeSlide 520ms ease-out both",
                  borderRadius: 2,
                }}
              >
                <CardContent sx={{ pt: 2.5, pb: 2.25 }}>
                  <Typography
                    id="appearance-heading"
                    variant="overline"
                    sx={{
                      display: "block",
                      mb: 1,
                      letterSpacing: 1,
                      opacity: 0.8,
                    }}
                  >
                    Appearance
                  </Typography>
                  <FormControl fullWidth size="small">
                    <InputLabel id="theme-select-label">
                      Background Theme
                    </InputLabel>
                    <Select
                      labelId="theme-select-label"
                      id="theme-select"
                      value={currentTheme.name}
                      label="Background Theme"
                      onChange={(event) =>
                        updateCurrentThemeName(event.target.value)
                      }
                    >
                      {Object.values(allThemes)
                        .sort()
                        .map((theme) => (
                          <MenuItem key={theme.name} value={theme.name}>
                            {theme.name}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </CardContent>
              </Card>

              {/* System Info Card (row layout) */}
              <Card
                variant="outlined"
                component="section"
                aria-labelledby="system-info-heading"
                sx={{
                  animation: "fadeSlide 520ms ease-out both",
                  animationDelay: "60ms",
                  borderRadius: 2,
                }}
              >
                <CardContent sx={{ pt: 2.5, pb: 2.25 }}>
                  <Typography
                    id="system-info-heading"
                    variant="overline"
                    sx={{
                      display: "block",
                      mb: 1.5,
                      letterSpacing: 1,
                      opacity: 0.8,
                    }}
                  >
                    System Info
                  </Typography>
                  <Stack spacing={1}>
                    {/* Build Row */}
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{
                          fontWeight: 500,
                          width: { xs: 72, sm: 90 },
                          textAlign: "right",
                          pr: 1.5,
                        }}
                      >
                        Build
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 0.75,
                          minWidth: 0,
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{
                            fontFamily: "Roboto Mono, monospace",
                            lineHeight: 1.2,
                            wordBreak: "break-all",
                          }}
                        >
                          {Config.buildName}
                        </Typography>
                        <Tooltip
                          title="Copy build version"
                          enterDelay={300}
                          arrow
                        >
                          <IconButton
                            size="small"
                            aria-label="Copy build version"
                            onClick={() => {
                              navigator?.clipboard
                                ?.writeText?.(Config.buildName)
                                .catch(() => {});
                            }}
                            sx={{ ml: 0.25 }}
                          >
                            <ContentCopyIcon fontSize="inherit" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Box>
                    {/* Wake Lock Row */}
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{
                          fontWeight: 500,
                          width: { xs: 72, sm: 90 },
                          textAlign: "right",
                          pr: 1.5,
                        }}
                      >
                        Wake lock
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 0.75,
                        }}
                      >
                        {wakeLockIsSupported ? (
                          <CheckCircleOutlineIcon
                            fontSize="small"
                            color="success"
                            role="img"
                            aria-label="Supported"
                          />
                        ) : (
                          <CancelOutlinedIcon
                            fontSize="small"
                            color="error"
                            role="img"
                            aria-label="Not supported"
                          />
                        )}
                      </Box>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Stack>
          </Box>
        </Container>
      </Drawer>
    </>
  );
};

export default OptionsModal;
