import React from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import {Container} from 'reactstrap';

import Login from '../views/Auth/Login';
import Register from '../views/Auth/Register';

const UnauthenticatedContainer = () => (
    <BrowserRouter>
        <Container className={'col-sm-3'}>
            <Switch>
                <Route exact path='/login' component={Login}/>
                <Route exact path='/register' component={Register}/>
                <Redirect from='*' to='/login'/>
            </Switch>
        </Container>
    </BrowserRouter>
);

export default UnauthenticatedContainer;
