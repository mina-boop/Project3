import React, { Component } from 'react';
import FormSignin from "../components/Forms/FormSignin";
import { withUser } from '../components/Auth/withUser';


export class Landing extends Component {
    render() {

        return (
            <div className="card">
            <div className="cardContent">
                <FormSignin/>
            </div>
                
            </div>
        )
    }
}

export default Landing;
