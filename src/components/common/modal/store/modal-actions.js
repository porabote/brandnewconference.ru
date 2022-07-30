const openModal = (content, title) => {
  return {
    type: 'OPEN_MODAL',
    payload: {title, content}
  }
}

const closeModal = (tabKey) => {
  return {
    type: 'CLOSE_MODAL'
  }
}

export {
  openModal,
  closeModal,
}