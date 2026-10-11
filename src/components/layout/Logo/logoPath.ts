export const LOGO_VIEWBOX = "4 52 160 68";

export const LOGO_SEGMENTS = [
  {
    length: 92.4,
    d: `
      M 10 119
      V 82
      C 10 68
        20 59
        32 59
      C 40 59
        46 62
        50 66
    `,
  },
  {
    length: 276.1,
    d: `
      M 53 119
      V 82
      C 53 68
        64 59
        77 59
      C 90 59
        101 68
        101 82
      V 86
      C 101 102
        114 115.5
        129 115.5
      C 145 115.5
        157.5 102
        157.5 86.5
      C 157.5 70
        145 57.5
        129 57.5
      C 119 57.5
        112 61.5
        107 68
    `,
  },
] as const;

export const LOGO_PATH = LOGO_SEGMENTS.map((segment) => segment.d).join(" ");
