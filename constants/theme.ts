import { Colors } from "./colors";
import { Spacing } from "./spacing";
import { Typography } from "./typography";
import { Radius } from "./radius";
import { fontSizes } from "./fontSizes";

export const Theme = {
  colors: Colors,
  spacing: Spacing,
  typography: Typography,
  radius: Radius,
  fontSizes: fontSizes,
} as const;