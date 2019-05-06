import React from "react";
import { Segment, Header, Grid, Button } from "semantic-ui-react";

export interface TimerProps {
  isStarted: boolean;
  totalTime: number;
  startOrStop?: () => void;
  reset?: () => void;
}

const zeroPadding = (num: number, length: number) =>
  (Array(length).join("0") + num).slice(-length);

const timeToString = (totalTime: number): string => {
  const millis = zeroPadding(totalTime % 1000, 3);
  const t1 = Math.floor(totalTime / 1000);
  const seconds = zeroPadding(t1 % 60, 2);
  const minutes = zeroPadding(Math.floor((t1 % 3600) / 60), 2);
  const hours = zeroPadding(Math.floor(t1 / 3600), 2);

  return `${hours}:${minutes}:${seconds}.${millis}`;
};

const Timer: React.FC<TimerProps> = ({
  isStarted = false,
  totalTime = 0,
  startOrStop = () => {},
  reset = () => {}
}) => {
  return (
    <div
      className="timer"
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Segment
        placeholder
        padded="very"
        textAlign="center"
        style={{
          maxWidth: "450px"
        }}
      >
        <Header as="h1">{timeToString(totalTime)}</Header>
        <Grid columns={2}>
          <Grid.Column>
            <Button color={isStarted ? "red" : "green"} onClick={startOrStop}>
              {isStarted ? "STOP" : "START"}
            </Button>
          </Grid.Column>
          <Grid.Column>
            <Button disabled={isStarted} onClick={reset}>
              RESET
            </Button>
          </Grid.Column>
        </Grid>
      </Segment>
    </div>
  );
};

export default Timer;
