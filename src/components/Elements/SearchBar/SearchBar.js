import React, { Component }from 'react'
import './SearchBar.css'


class SearchBar extends Component{
    state = {
        value : ""
    }

    // timeout - helps us to wait for some time before function fire.
    timeout = null

    doSearch = (event) => {
        this.setState({ value: event.target.value });
        clearTimeout(this.timeout)


        this.timeout = setTimeout(() => {
            this.props.callback(this.state.value);
        },1000);
    }


    render() {
        return (
            <div className="index-searchbar">
                <div className="index-searchbar-content">
                    <div className="fa fa-search index-fa-search" name="Search" size="2x" />
                    <input
                        type="text"
                        className="index-searchbar-input" 
                        placeholder="Search"
                        onChange = {this.doSearch}
                        value={this.state.value}
                    />
                </div>
            </div>
        )
    }
}
 
export default SearchBar