import React, { createContext } from 'react'
import modalActions from './modal-actions'

const ModalContext = createContext(modalActions)

const { Provider: ModalProvider, Consumer: ModalConsumer } = ModalContext

export {
    ModalProvider,
    ModalConsumer
}