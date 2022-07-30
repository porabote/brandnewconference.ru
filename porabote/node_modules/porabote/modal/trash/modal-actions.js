const modalActions = {
    modalOpen: () => {
        this.setState({
            isOpen: ture
        })
    },
    closeModal: (callback) => {
        this.setState({
            isOpen: false
        })

        if (typeof callback === "function") callback();
    },
    setItem: ({content, title}) => {console.log(content)
        this.setState({
            items: [
                {
                    title,
                    content
                }
            ]
        })
    }
}

export default modalActions