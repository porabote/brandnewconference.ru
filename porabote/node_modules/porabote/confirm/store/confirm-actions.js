const openConfirm = (msg, approveCallback, callbackData) => {
  return {
    type: 'OPEN_CONFIRM',
    payload: { msg, approveCallback, callbackData }
  }
}

const closeConfirm = () => {
  return {
    type: 'CLOSE_CONFIRM',
  }
}

export {
  openConfirm,
  closeConfirm,
}