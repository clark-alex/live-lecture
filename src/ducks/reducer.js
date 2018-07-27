import axios from 'axios'
const initialState = {
  user: {},
  userLectures: []
}
const _FULFILLED = '_FULFILLED'
const GET_USER = 'GET_USER'
const GET_USER_LECTURES = 'GET_USER_LECTURES'


export function getUser() {
  const user = axios.get('/api/getUser')
  return {
    type: GET_USER,
    payload: user
  }
}
export function getUserLectures(){
  const lectures = axios.get('/api/userLectures')
  return{
    type: GET_USER_LECTURES,
    payload: lectures
  }
}

export default (state = initialState, action) => {
  switch (action.type) {

    case GET_USER + _FULFILLED:
      return Object.assign({}, state, { user: action.payload.data[0] })
    case GET_USER_LECTURES + _FULFILLED:
    console.log(action.payload)
      return Object.assign({}, state, { userLectures: action.payload.data })

    default:
      return state
  }
};
