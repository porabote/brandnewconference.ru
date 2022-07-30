import React, { createContext } from 'react'

const FormContext = createContext(() => {})

const { Provider: FormProvider, Consumer: FormConsumer } = FormContext

export {
    FormProvider,
    FormConsumer
}