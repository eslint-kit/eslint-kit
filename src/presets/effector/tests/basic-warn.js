import { createEvent, createStore, sample } from "effector";

sample({
  fn: value => value,
  target: createEvent(),
  clock: createEvent(),
  source: createStore(5)
})
