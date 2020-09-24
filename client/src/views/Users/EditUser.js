import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { toast } from 'react-toastify';
import { Redirect } from 'react-router';

import api from '../../helpers/Api';

const EditUser = (props) => {
  const userId = props.location.pathname.split('/')[2];

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('');
  const [rank, setRank] = useState('');
  const [firstAid, setFirstAid] = useState('');
  const [active, setActive] = useState();
  const [loading, setLoading] = useState(true);
  const [updated, setUpdated] = useState(false);

  const fetchUser = async () => {
    try {
      const response = await api({
        method: 'get',
        url: `/users/${userId}`,
      });

      if (response.status === 200) {
        const data = response.data;
        setFirstName(data.first_name);
        setLastName(data.last_name);
        setEmail(data.email);
        setPhone(data.phone);
        setRole(data.app_role);
        setRank(data.rank);
        setFirstAid(data.first_aid);
        setActive(data.active);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateUser = async () => {
    try {
      const data = {
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
        app_role: role,
        rank,
        first_aid: firstAid,
        active: active === 'true' || active === true ? true : false,
      };

      const response = await api({
        method: 'put',
        url: `/users/${userId}`,
        data,
      });

      if (response.status === 202) {
        toast.success('User Successfully Updated');
        setLoading(false);
        setUpdated(true);
      }
    } catch (err) {
      setLoading(false);
      toast.error(err.message);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  if (updated) {
    return (
      <Redirect
        push
        to={{
          pathname: '/users',
        }}
      />
    );
  }

  return (
    <>
      <h1>Edit User</h1>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          handleUpdateUser();
        }}
      >
        <FormGroup>
          <Label>First Name</Label>
          <Input
            type='text'
            name='firstName'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <Label>Last Name</Label>
          <Input
            type='text'
            name='lastName'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Email</Label>
          <Input
            type='email'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Phone Number</Label>
          <Input
            type='text'
            name='phone'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Rank</Label>
          <Input
            type='select'
            name='rank'
            value={rank}
            onChange={(e) => setRank(e.target.value)}
          >
            <option value='Volunteer'>Volunteer</option>
            <option value='Assistant Section Leader'>Assistant Section Leader</option>
            <option value='Section Leader'>Section Leader</option>
            <option value='Third Officer'>Third Officer</option>
            <option value='Second Officer'>Second Officer</option>
            <option value='First Officer'>First Officer</option>
            <option value='Commander'>Commander</option>
            <option value='Assistant Civil Defence Officer'>Assistant Civil Defence Officer</option>
            <option value='Civil Defence Officer'>Civil Defence Officer</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label>First Aid Level</Label>
          <Input
            type='select'
            name='firstAid'
            value={firstAid}
            onChange={(e) => setFirstAid(e.target.value)}
          >
            <option value='CFR'>CFR</option>
            <option value='FAR'>FAR</option>
            <option value='EFR'>EFR</option>
            <option value='EMT'>EMT</option>
            <option value='Paramedic'>Paramedic</option>
            <option value='Doctor'>Doctor</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label>App Role</Label>
          <Input
            type='select'
            name='role'
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value='Read'>Read</option>
            <option value='Write'>Write</option>
            <option value='Admin'>Admin</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label>App Status</Label>
          <Input
            type='select'
            name='active'
            value={active}
            onChange={(e) => setActive(e.target.value)}
          >
            <option value='false'>In-Active</option>
            <option value='true'>Active</option>
          </Input>
        </FormGroup>
        <Button type='submit'>Update User</Button>
      </Form>
    </>
  );
};

export default EditUser;
