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
        <Container sx={{ py: 3, height: "100%" }}>
          <Typography
            variant="h5"
            component="h2"
            sx={{
              mb: 3,
              textAlign: "center",
              fontWeight: 500,
            }}
          >
            Settings
          </Typography>

          <Box sx={{ height: "100%", overflow: "auto" }}>
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
                <ListItemText
                  primary="Build Version"
                  secondary={Config.buildName}
                  primaryTypographyProps={{
                    fontWeight: 500,
                    color: "text.primary",
                  }}
                  secondaryTypographyProps={{
                    color: "text.secondary",
                    fontSize: "0.875rem",
                  }}
                />
              </ListItem>

              <Divider variant="inset" component="li" />

              <ListItem>
                <ListItemText
                  primary="Wake Lock"
                  secondary={
                    wakeLockIsSupported ? "Supported" : "Not supported"
                  }
                  primaryTypographyProps={{
                    fontWeight: 500,
                    color: "text.primary",
                  }}
                  secondaryTypographyProps={{
                    color: wakeLockIsSupported ? "success.main" : "error.main",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                  }}
                />
              </ListItem>
            </List>
          </Box>
        </Container>
      </Drawer>
    </>
  );
};

export default OptionsModal;
