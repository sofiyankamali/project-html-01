import "./index.css";
import { Composition } from "remotion";
import { TanrasaLogo } from "./TanrasaLogo";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="TanrasaLogo"
        component={TanrasaLogo}
        durationInFrames={150}
        fps={30}
        width={1080}
        height={1080}
      />
    </>
  );
};
