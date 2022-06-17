export const addJob = (payload) => {
  return{
    type: 'ADD',
    payload
  }
}
  
export const deleteJob =(payload) => {
  return{
    type: 'DELETE',
    payload
  }
}

export const updateJob =(payload) => {
  return{
    type: 'UPDATE',
    payload
  }
}

export const refreshJob =() => {
  return{
    type: 'REFRESH'
  }
}
 
export const addLiked = (payload) => {
  return{
    type: 'ADD_LIKED',
    payload
  }
}

export const toggleSelect = (payload) => {
  return{
    type: 'TOGGLE_SELECT',
    payload
  }
}

export const updateSelect = (payload) => {
  return{
    type: 'UPDATE_SELECT',
    payload
  }
}

export const refreshSelect = () => {
  return{
    type: 'REFRESH_SELECT',
  }
}

 