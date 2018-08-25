import React, { Component } from 'react';
import AppContext from './AppContext';

class AppProvider extends Component {
    constructor(props){
        super(props);
        this.state = {
            user:{},
        };
    }
    
    
    render() {
        const self = this;
        const handlers = {
            signin:(data)=> {
                self.setState({
                    user: {
                        username: data.username,
                        email: data.password,
                    }
                });
            },
        };

        return <AppContext.Provider value={{...this.state, handlers}}>
            {this.props.children}
        </AppContext.Provider>;
    }
}
export default AppProvider;