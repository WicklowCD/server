import React from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import styled from 'styled-components';
import {Container} from 'reactstrap';

import Header from '../components/Header';
import RecordsList from '../views/Search/RecordsList';
import CreateRecord from '../views/Search/CreateRecord';
import SearchRecord from '../views/Search/SearchRecord';
import UsersList from '../views/Users/UsersList';
import EditUser from '../views/Users/EditUser';

const Outer = styled.div`
  background-color: rgba(0, 0, 0, 0.50);
  padding: 50px;
  min-width: 100wh;
  min-height: 100vh;
  display: flex;
`;

const Inner = styled.div`
  background-color: #FFFFFF;
  padding: 25px;
`;

const AuthenticatedContainer = () => (
    <BrowserRouter>
        <Header/>
        <Outer>
            <Container>
                <Inner>
                    <Switch>
                        {/* Search Management */}
                        <Route exact path='/searches' component={RecordsList}/>
                        <Route exact path='/searches/new' component={CreateRecord}/>
                        <Route path='/searches/' component={SearchRecord}/>

                        {/* User Management */}
                        <Route exact path='/users' component={UsersList}/>
                        <Route path='/users/*/edit' component={EditUser}/>

                        {/* Redirects */}
                        <Redirect from='/' to='/searches'/>
                    </Switch>
                </Inner>
            </Container>
        </Outer>
    </BrowserRouter>
);

export default AuthenticatedContainer;
