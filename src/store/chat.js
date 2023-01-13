import { Subject } from "rxjs";

const subject = new Subject();

const initialState = {
  data: [],
  newDataCount: 0,
};

let state = initialState;

const chatStore = {
  init: () => {
    state = { ...state, newDataCount: 0 };
    subject.next(state);
  },
  subscribe: (setState) => subject.subscribe(setState),
  sendMessage: (message) => {
    state = {
      ...state,
      data: [...state.data, message],
      newDataCount: state.newDataCount + 1,
    };
    subject.next(state);
  },
  clearChat: () => {
    state = initialState;
    subject.next(state);
  },
  initialState,
};
/**
 * Subject.next() : feed a new value to the Subject
 * next() method with a value as its parameter, that value is multicasted to all Observers subscribed to the Subject
 */

export default chatStore;
