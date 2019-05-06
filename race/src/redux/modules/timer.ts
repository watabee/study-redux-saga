import { Reducer } from "redux";
import { delay, put, take, race, call } from "redux-saga/effects";

const TICK = "race/timer/TICK";
const START_TIMER = "race/timer/START_TIMER";
const STOP_TIMER = "race/timer/STOP_TIMER";
const RESET = "race/timer/RESET";

interface TickParams {
  addTime: number;
}

export const timerActions = {
  tick: (params: TickParams) => ({
    type: TICK as typeof TICK,
    payload: { params }
  }),

  start: () => ({
    type: START_TIMER as typeof START_TIMER
  }),

  stop: () => ({
    type: STOP_TIMER as typeof STOP_TIMER
  }),

  reset: () => ({
    type: RESET as typeof RESET
  })
};

type TimerAction =
  | ReturnType<typeof timerActions.tick>
  | ReturnType<typeof timerActions.start>
  | ReturnType<typeof timerActions.stop>
  | ReturnType<typeof timerActions.reset>;

export interface TimerState {
  isStarted: boolean;
  totalTime: number;
}

const initialState: TimerState = {
  isStarted: false,
  totalTime: 0
};

export const reducer: Reducer<TimerState, TimerAction> = (
  state: TimerState = initialState,
  action: TimerAction
): TimerState => {
  switch (action.type) {
    case TICK:
      return {
        ...state,
        totalTime: state.totalTime + action.payload.params.addTime
      };

    case START_TIMER:
      return {
        ...state,
        isStarted: true
      };

    case STOP_TIMER:
      return {
        ...state,
        isStarted: false
      };

    case RESET:
      return {
        ...state,
        totalTime: 0
      };

    default:
      return state;
  }
};

function* tick() {
  while (true) {
    yield delay(33);
    yield put(timerActions.tick({ addTime: 33 }));
  }
}

export function* timerTask() {
  while (true) {
    yield take(START_TIMER);
    yield race({
      task: call(tick),
      stop: take(STOP_TIMER)
    });
  }
}
