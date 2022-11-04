import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import ListGroup from "react-bootstrap/ListGroup";

const Dashboard = () => {
  let navigate = useNavigate();
  const [userdataCount, setuserdataCount] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [datalist, setdatalist] = useState([]);
  const [mainadmin, setmainadmin] = useState(0);
  const [subadmin, setsubadmin] = useState(0);
  useEffect(() => {
    if (!localStorage.tokenStore) {
      navigate("/login");
    }
  }, []);

  const fetchUsers = async () => {
    const res = await axios.get("/users/allusers");
    console.log(res.data, "test");
    let users = res.data ? res.data.filter((user) => user.role === "User") : [];
    let mainadmins = res.data
      ? res.data.filter((user) => user.role === "mainAdmin")
      : [];
    let subadmins = res.data
      ? res.data.filter((user) => user.role === "subAdmin")
      : [];

    setuserdataCount(users.length);
    setmainadmin(mainadmins.length);
    setsubadmin(subadmins.length);

    setdatalist(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        marginTop: "6rem",
      }}
    >
      <Card style={{ width: "18rem" }}>
        <Card.Img
          variant="top"
          src="https://img.freepik.com/free-photo/medium-shot-man-wearing-vr-glasses_23-2149126949.jpg?w=2000"
        />
        <Card.Body>
          <Card.Title>Number of Users</Card.Title>
          <Card.Text>{userdataCount}</Card.Text>
          <Button variant="primary" onClick={() => setModalShow(true)}>
            click here to see
          </Button>
          <MyVerticallyCenteredModal
            datalist={datalist}
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
        </Card.Body>
      </Card>

      <Card style={{ width: "17rem" }}>
        <Card.Img
          variant="top"
          src="https://i.insider.com/61eec3592b43ff00185e3c30?width=700"
        />
        <Card.Body>
          <Card.Title>Number of Admins</Card.Title>
          <Card.Text>{mainadmin + subadmin}</Card.Text>
          <Button variant="primary">click here to see</Button>
        </Card.Body>
      </Card>
    </div>
  );
};

function MyVerticallyCenteredModal(props) {
  console.log(props);
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          List of All Users
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.datalist
          .filter((user) => user.role === "User")
          .map((item) => {
            return (
              <>
                <ListGroup as="ol">
                  <ListGroup.Item as="li">{item.username}</ListGroup.Item>
                </ListGroup>
                <p></p>
              </>
            );
          })}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Dashboard;
