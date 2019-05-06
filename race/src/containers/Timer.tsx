import React from "react";
import Timer from "../components/Timer";
import { TimerState, timerActions } from "../redux/modules/timer";
import { Dispatch, bindActionCreators } from "redux";
import { connect } from "react-redux";

interface StateProps {
  isStarted: boolean;
  totalTime: number;
}

interface DispatchProps {
  start: () => void;
  stop: () => void;
  reset: () => void;
}

type EnhancedProps = StateProps & DispatchProps;

const TimerContainer: React.FC<EnhancedProps> = ({
  isStarted,
  totalTime,
  start,
  stop,
  reset
}) => {
  return (
    <Timer
      isStarted={isStarted}
      totalTime={totalTime}
      startOrStop={isStarted ? stop : start}
      reset={reset}
    />
  );
};

const mapStateToProps = (state: TimerState): StateProps => ({
  isStarted: state.isStarted,
  totalTime: state.totalTime
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps =>
  bindActionCreators(
    {
      start: () => timerActions.start(),
      stop: () => timerActions.stop(),
      reset: () => timerActions.reset()
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimerContainer);
