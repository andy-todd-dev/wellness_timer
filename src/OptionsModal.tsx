import React, { ReactNode } from "react";
import { useWakeLock } from "react-screen-wake-lock";
import {
  Drawer,
  Container,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  useTheme,
} from "@mui/material";
import Config from "./Config";
import { allThemes } from "./themes";

type OptionsModalProps = {
  children: ReactNode;
  isOpen: boolean;
  updateCurrentThemeName: (theme: string) => void;
  onClose: () => void;
  currentThemeName?: string;
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
            height: "75vh",
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(20px)",
          },
        }}
        ModalProps={{
          BackdropProps: {
            sx: {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        }}
      >
        <Container
          sx={{
            py: 3,
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="h5"
            component="h2"
            sx={{
              mb: 3,
              textAlign: "center",
              fontWeight: 500,
              flexShrink: 0,
            }}
          >
            Settings
          </Typography>

          <Box sx={{ flex: 1, overflow: "auto" }}>
            <List>
              <ListItem>
                <Box sx={{ width: "100%" }}>
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
                </Box>
              </ListItem>

              <Divider variant="inset" component="li" />

              <ListItem>
                <Box sx={{ width: "100%" }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Build Version"
                    value={Config.buildName}
                    disabled
                    variant="outlined"
                    sx={{
                      "& .MuiInputBase-input.Mui-disabled": {
                        WebkitTextFillColor: "rgba(0, 0, 0, 0.87)",
                        color: "rgba(0, 0, 0, 0.87)",
                        opacity: 1,
                      },
                      "& .MuiInputLabel-root.Mui-disabled": {
                        color: "rgba(0, 0, 0, 0.6)",
                      },
                      "& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline":
                        {
                          borderColor: "rgba(0, 0, 0, 0.23)",
                        },
                    }}
                  />
                </Box>
              </ListItem>

              <Divider variant="inset" component="li" />

              <ListItem>
                <Box sx={{ width: "100%" }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Wake Lock Support"
                    value={wakeLockIsSupported ? "Supported" : "Not supported"}
                    disabled
                    variant="outlined"
                    sx={{
                      "& .MuiInputBase-input.Mui-disabled": {
                        WebkitTextFillColor: wakeLockIsSupported
                          ? "#2e7d32"
                          : "#d32f2f",
                        color: wakeLockIsSupported ? "#2e7d32" : "#d32f2f",
                        opacity: 1,
                        fontWeight: 500,
                      },
                      "& .MuiInputLabel-root.Mui-disabled": {
                        color: "rgba(0, 0, 0, 0.6)",
                      },
                      "& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline":
                        {
                          borderColor: "rgba(0, 0, 0, 0.23)",
                        },
                    }}
                  />
                </Box>
              </ListItem>
            </List>
          </Box>
        </Container>
      </Drawer>
    </>
  );
};

export default OptionsModal;
