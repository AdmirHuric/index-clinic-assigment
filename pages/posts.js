import React, {useState} from 'react';
import PropsTypes from 'prop-types';
import { withUserSession } from "../actions/user";
import Title from '../components/Title';
import { Row, Form } from 'react-bootstrap';
import { Table, Modal } from 'antd';
import Logout from "../components/Logout";
import Router from "next/router";
import 'antd/dist/antd.css';
import { toast } from "react-toastify";


function Posts({data}) {
  const [editablePost, setEditablePost] = useState(null);

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Content',
      dataIndex: 'body',
      key: 'body',
    },
  ];

  const onSubmit = async () => {
    const req = await fetch(`https://jsonplaceholder.typicode.com/posts/${editablePost.id}`, {
      method: 'PUT',
      body: JSON.stringify(editablePost),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    const data = await req.json();

    if (data) {
      setEditablePost(null);
      toast.success("Successfully edited post.");
      Router.push("/posts");
    } else {
      toast.error("Could not edit post.");
    }
  };

  const onEditablePostTitleChange = (e) => {
    setEditablePost({...editablePost, title: e.target.value});
  };

  const onEditablePostBodyChange = (e) => {
    setEditablePost({...editablePost, body: e.target.value});
  };

  return (
    <>
    <Logout/>
    <Title title="Posts"/>
    <Row className="px-5">
      <Table
        style={{width: '100%'}}
        dataSource={data}
        columns={columns}
        onRow={(record, rowIndex) => {
          return {
            onClick: event => {setEditablePost(record)}, // click row
          };
        }}
      />
    </Row>
    {
      editablePost &&
      <Modal
        centered
        bodyStyle={{height: '500px', padding: '10px'}}
        visible={true}
        onOk={onSubmit}
        okButtonProps={{ disabled:  editablePost.title.length === 0 || editablePost.body.length === 0 }}
        onCancel={() => {setEditablePost(null)}}>
        <h1 className="text-center">Edit Post </h1>
        <Form
          noValidate
          validated={true}
          onSubmit={onSubmit}
          className="py-5 px-5 mx-2 text-center">
          <Form.Group controlId="formBasicTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              as="textarea" rows={2}
              required
              type="title"
              value={editablePost.title}
              onChange={onEditablePostTitleChange}
              placeholder="Enter title" />
            <Form.Control.Feedback type="invalid">
              Please choose a title.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formBasicContent">
            <Form.Label>Content</Form.Label>
            <Form.Control
              as="textarea" rows={8}
              required
              type="content"
              value={editablePost.body}
              onChange={onEditablePostBodyChange}
              placeholder="Content" />
            <Form.Control.Feedback type="invalid">
              Please choose a content.
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal>
    }
    </>
  )
}

Posts.propTypes = {
  data: PropsTypes.array.isRequired
};

export const getServerSideProps = withUserSession(async function () {
  const request = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await request.json();
  return data.map((item) => {
    return {
      ...item,
      key: item.id
    }
  });
});

export default Posts;
