import { createEvent, createStore } from 'effector'

const userAdded = createEvent()

export const $users = createStore([])
  .on(userAdded, (users, user) => users.concat(user))
  .on(userAdded, (users, user) => [...users, user])
