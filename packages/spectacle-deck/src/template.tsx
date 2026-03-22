import { Box, FullScreen } from "spectacle";

export const template = ({
  slideNumber,
  numberOfSlides,
}: {
  slideNumber: number;
  numberOfSlides: number;
}) => {
  const percentage = (slideNumber / numberOfSlides) * 100;
  return (
    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
      <Box padding="0 0 0.5em 0.7em">
        <FullScreen />
      </Box>

      <div style={{ width: "100%", height: "4px", background: "#ffffff11" }}>
        <div
          style={{
            width: `${percentage}%`,
            height: "2px",
            background: "#ffffff77",
            transition: "width 0.3s ease",
          }}
        />
      </div>
    </div>
  );
};
