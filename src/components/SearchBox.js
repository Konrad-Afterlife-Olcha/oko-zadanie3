import React from "react";

class SearchBox extends React.Component {
    state = {
        term: '',
        previousTerm: '',
        termTooShort: true,
    };
    onInputChange = (event) => {
        this.setState({ term: event.target.value })
    };
    onFormSubmit = event => {
        event.preventDefault();
        this.setState({ previousTerm: this.state.term })
        if (this.state.term === this.state.previousTerm) {
            return
        }
        if (this.state.term.length >= 3) {
            if (this.state.previousTerm !== '') this.props.resetSearchingData()
            this.setState({ termTooShort: false })
            this.props.onFormSubmit(this.state.term)
        } else {
            this.setState({ termTooShort: true })
        }
    };
    render() {
        return (
            <div>
                <form onSubmit={this.onFormSubmit} className="ui form">
                    <div className="field">
                        <input value={this.state.term} onChange={this.onInputChange} type="text" />
                    </div>
                </form>
            </div>
        )
    }
}
export default SearchBox;