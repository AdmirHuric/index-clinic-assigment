import React from 'react';
import PropsTypes from 'prop-types';
import { withUserSession } from "../../actions/user";
import Title from '../../components/Title';
import { Row } from 'react-bootstrap';
import { Table } from 'antd';
import Logout from "../../components/Logout";
import 'antd/dist/antd.css';
import Router from "next/router";

function Users({data}) {

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
  ];

  const toUserPage = (id) => {
    Router.push(`/users/${id}`);
  };

  return (
    <>
    <Logout/>
    <Title title="Users"/>
    <Row className="px-5">
    <Table
      style={{width: '100%'}}
      dataSource={data}
      columns={columns}
      onRow={(record, rowIndex) => {
        return {
          onClick: event => {toUserPage(record.id)}, // click row
        };
      }}
    />
    </Row>
    </>
  )
}

Users.propTypes = {
  data: PropsTypes.array.isRequired
};

export const getServerSideProps = withUserSession(async function () {
  const request = await fetch('https://jsonplaceholder.typicode.com/users');
  const data = await request.json();
  return data.map((item) => {
    return {
      ...item,
      key: item.id
    }
  });
});

export default Users;
