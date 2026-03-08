import { ALERT_ADD, ALERT_REMOVE, ALERT_CLEAR } from "./alertTypes";

export default function alertReducer(state, action) {
  switch (action.type) {
    case ALERT_ADD:
      return [...state, action.payload];

    case ALERT_REMOVE:
      return state.filter((a) => a.id !== action.payload);

    case ALERT_CLEAR:
      return [];

    default:
      return state;
  }
}
