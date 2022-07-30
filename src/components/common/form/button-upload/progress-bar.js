import React from 'react'

class ProgressBar extends React.Component {


    render() {

        const { files } = this.props;

        return(
            <div className="progress-bar">
                {Object.keys(files).map((key, index) => {
                    
                    return(
                        <div className="progress-bar__item" key={index}>
                            {files[key].name}
                            {files[key].size}
                            {files[key].type}
                        </div>
                    )
                })}

            </div>
        )
    }
}

export default ProgressBar