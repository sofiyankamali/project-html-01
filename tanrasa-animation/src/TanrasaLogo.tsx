import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
} from "remotion";

const GOLD = "#C9A84C";
const GOLD_LIGHT = "#D4B96A";
const DARK_GREEN = "#0A2E1C";
const GREEN_LEAF = "#1A5C3A";

const Cup: React.FC<{ opacity: number; translateY: number }> = ({
  opacity,
  translateY,
}) => (
  <svg
    width="140"
    height="180"
    viewBox="0 0 140 180"
    style={{ opacity, translate: `0px ${translateY}px` }}
  >
    {/* Cup body */}
    <rect
      x="20"
      y="20"
      width="100"
      height="120"
      rx="10"
      fill={DARK_GREEN}
      stroke={GOLD}
      strokeWidth="3"
    />
    {/* Cup lid */}
    <rect
      x="10"
      y="10"
      width="120"
      height="20"
      rx="6"
      fill={DARK_GREEN}
      stroke={GOLD}
      strokeWidth="3"
    />
    {/* Lid top bump */}
    <rect
      x="40"
      y="2"
      width="60"
      height="12"
      rx="5"
      fill={DARK_GREEN}
      stroke={GOLD}
      strokeWidth="2"
    />
    {/* Straw */}
    <line
      x1="85"
      y1="0"
      x2="100"
      y2="-40"
      stroke={GOLD}
      strokeWidth="4"
      strokeLinecap="round"
    />
    {/* Cup bottom */}
    <rect
      x="30"
      y="140"
      width="80"
      height="10"
      rx="4"
      fill={DARK_GREEN}
      stroke={GOLD}
      strokeWidth="2"
    />
  </svg>
);

const Bowl: React.FC<{ opacity: number; translateY: number }> = ({
  opacity,
  translateY,
}) => (
  <svg
    width="120"
    height="80"
    viewBox="0 0 120 80"
    style={{ opacity, translate: `0px ${translateY}px` }}
  >
    {/* Bowl shape */}
    <ellipse
      cx="60"
      cy="45"
      rx="55"
      ry="30"
      fill={DARK_GREEN}
      stroke={GOLD}
      strokeWidth="3"
    />
    {/* Bowl rim */}
    <ellipse
      cx="60"
      cy="30"
      rx="55"
      ry="12"
      fill={DARK_GREEN}
      stroke={GOLD}
      strokeWidth="3"
    />
    {/* Snack balls */}
    {[
      [35, 28],
      [50, 25],
      [65, 27],
      [55, 35],
      [42, 33],
      [72, 32],
    ].map(([cx, cy], i) => (
      <circle
        key={i}
        cx={cx}
        cy={cy}
        r="7"
        fill={DARK_GREEN}
        stroke={GOLD}
        strokeWidth="2"
      />
    ))}
  </svg>
);

const Leaves: React.FC<{ opacity: number; scale: number }> = ({
  opacity,
  scale,
}) => (
  <svg
    width="100"
    height="120"
    viewBox="0 0 100 120"
    style={{ opacity, scale: `${scale}` }}
  >
    {/* Leaf 1 - top */}
    <path
      d="M50 10 Q30 30 50 60 Q70 30 50 10Z"
      fill={GREEN_LEAF}
      stroke={GOLD}
      strokeWidth="1.5"
    />
    <line
      x1="50"
      y1="15"
      x2="50"
      y2="55"
      stroke={GOLD}
      strokeWidth="1"
      opacity="0.6"
    />
    {/* Leaf 2 - left */}
    <path
      d="M20 50 Q10 70 30 90 Q40 65 20 50Z"
      fill={GREEN_LEAF}
      stroke={GOLD}
      strokeWidth="1.5"
    />
    <line
      x1="22"
      y1="55"
      x2="30"
      y2="85"
      stroke={GOLD}
      strokeWidth="1"
      opacity="0.6"
    />
    {/* Leaf 3 - right-lower */}
    <path
      d="M35 75 Q20 95 40 110 Q50 90 35 75Z"
      fill={GREEN_LEAF}
      stroke={GOLD}
      strokeWidth="1.5"
    />
  </svg>
);

const Crescent: React.FC<{ opacity: number; rotate: number }> = ({
  opacity,
  rotate,
}) => (
  <svg
    width="340"
    height="340"
    viewBox="0 0 340 340"
    style={{ opacity, rotate: `${rotate}deg` }}
  >
    <path
      d="M170 20
         A150 150 0 1 1 40 200
         A120 120 0 1 0 170 20Z"
      fill="none"
      stroke={GOLD}
      strokeWidth="3"
    />
  </svg>
);

export const TanrasaLogo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1: Background circle scales in (frames 0-30)
  const circleScale = interpolate(frame, [0, 30], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phase 1b: Gold ring draws in (frames 10-40)
  const ringOpacity = interpolate(frame, [10, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const ringScale = interpolate(frame, [10, 40], [0.8, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phase 2: Crescent appears (frames 25-50)
  const crescentOpacity = interpolate(frame, [25, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const crescentRotate = interpolate(frame, [25, 50], [-30, 0], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phase 3: Leaves grow in (frames 35-60)
  const leavesOpacity = interpolate(frame, [35, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const leavesScale = interpolate(frame, [35, 60], [0, 1], {
    easing: Easing.bezier(0.34, 1.56, 0.64, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phase 4: Cup slides up (frames 40-65)
  const cupOpacity = interpolate(frame, [40, 55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cupTranslateY = interpolate(frame, [40, 65], [40, 0], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phase 5: Bowl slides up (frames 50-75)
  const bowlOpacity = interpolate(frame, [50, 65], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const bowlTranslateY = interpolate(frame, [50, 75], [30, 0], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phase 6: "TANRASA" text (frames 65-90)
  const titleOpacity = interpolate(frame, [65, 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const titleTranslateY = interpolate(frame, [65, 90], [20, 0], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const titleLetterSpacing = interpolate(frame, [65, 95], [30, 12], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phase 7: Decorative lines and subtitle (frames 80-110)
  const lineWidth = interpolate(frame, [80, 105], [0, 100], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const subtitleOpacity = interpolate(frame, [90, 110], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const subtitleTranslateY = interpolate(frame, [90, 110], [10, 0], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phase 8: Small leaf ornament (frames 95-115)
  const ornamentOpacity = interpolate(frame, [95, 115], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const ornamentScale = interpolate(frame, [95, 115], [0, 1], {
    easing: Easing.bezier(0.34, 1.56, 0.64, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Final glow pulse (frames 110-150)
  const glowOpacity = interpolate(frame, [110, 130, 140, 150], [0, 0.3, 0.1, 0.2], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#000000",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Main circle container */}
      <div
        style={{
          width: 700,
          height: 700,
          borderRadius: "50%",
          backgroundColor: DARK_GREEN,
          scale: `${circleScale}`,
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: `0 0 ${60 * glowOpacity}px ${30 * glowOpacity}px ${GOLD}40`,
        }}
      >
        {/* Gold ring border */}
        <div
          style={{
            position: "absolute",
            inset: -8,
            borderRadius: "50%",
            border: `3px solid ${GOLD}`,
            opacity: ringOpacity,
            scale: `${ringScale}`,
          }}
        />

        {/* Crescent arc */}
        <div
          style={{
            position: "absolute",
            top: 60,
            left: 170,
          }}
        >
          <Crescent opacity={crescentOpacity} rotate={crescentRotate} />
        </div>

        {/* Leaves - left side */}
        <div
          style={{
            position: "absolute",
            top: 200,
            left: 120,
          }}
        >
          <Leaves opacity={leavesOpacity} scale={leavesScale} />
        </div>

        {/* Cup - center */}
        <div
          style={{
            position: "absolute",
            top: 185,
            left: 265,
          }}
        >
          <Cup opacity={cupOpacity} translateY={cupTranslateY} />
        </div>

        {/* Bowl - right side */}
        <div
          style={{
            position: "absolute",
            top: 305,
            left: 390,
          }}
        >
          <Bowl opacity={bowlOpacity} translateY={bowlTranslateY} />
        </div>

        {/* TANRASA title */}
        <div
          style={{
            position: "absolute",
            bottom: 160,
            width: "100%",
            textAlign: "center",
            opacity: titleOpacity,
            translate: `0px ${titleTranslateY}px`,
          }}
        >
          <div
            style={{
              fontFamily:
                "'Times New Roman', 'Georgia', serif",
              fontSize: 62,
              fontWeight: 400,
              color: GOLD,
              letterSpacing: titleLetterSpacing,
              textTransform: "uppercase",
            }}
          >
            TANRASA
          </div>
        </div>

        {/* Decorative lines */}
        <div
          style={{
            position: "absolute",
            bottom: 140,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 0,
          }}
        >
          <div
            style={{
              width: `${lineWidth * 1.5}px`,
              height: 1.5,
              backgroundColor: GOLD,
            }}
          />
          {/* Small leaf ornament */}
          <div
            style={{
              opacity: ornamentOpacity,
              scale: `${ornamentScale}`,
              margin: "0 8px",
            }}
          >
            <svg width="24" height="20" viewBox="0 0 24 20">
              <path
                d="M12 2 Q6 8 8 16 Q12 10 12 2Z"
                fill={GREEN_LEAF}
                stroke={GOLD}
                strokeWidth="1"
              />
              <path
                d="M12 2 Q18 8 16 16 Q12 10 12 2Z"
                fill={GREEN_LEAF}
                stroke={GOLD}
                strokeWidth="1"
              />
            </svg>
          </div>
          <div
            style={{
              width: `${lineWidth * 1.5}px`,
              height: 1.5,
              backgroundColor: GOLD,
            }}
          />
        </div>

        {/* Subtitle */}
        <div
          style={{
            position: "absolute",
            bottom: 105,
            width: "100%",
            textAlign: "center",
            opacity: subtitleOpacity,
            translate: `0px ${subtitleTranslateY}px`,
          }}
        >
          <div
            style={{
              fontFamily:
                "'Times New Roman', 'Georgia', serif",
              fontSize: 22,
              color: GOLD_LIGHT,
              letterSpacing: 6,
              textTransform: "uppercase",
            }}
          >
            Minuman & Cemilan
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
