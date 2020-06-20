import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { Container, Card, Form as BootstrapForm, Button, Row, Col } from 'react-bootstrap';

import { Formik, Form, Field, ErrorMessage } from "formik"

export default class ContactPage extends React.Component {

    render() {
        return (
            <Container>
                <Formik
                    initialValues={{
                        title: '',
                        fullName: '',
                        email: '',
                        text: '',
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                            alert(JSON.stringify(values, null, 2));
                            setSubmitting(false);
                        }, 400);
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <Container>
                                <Row className="justify-content-center"  >
                                    <Col lg="5" md="6" sm="12" xs="12" >
                                        <Card>
                                            <Card.Body>
                                                <Card.Title>
                                                    <FontAwesomeIcon icon={faPhone} /> Contact details
                                    </Card.Title>

                                                <BootstrapForm.Group>
                                                    <BootstrapForm.Label>Title</BootstrapForm.Label>
                                                    <Field type="text" className="form-control" name="title" />
                                                </BootstrapForm.Group>
                                                <BootstrapForm.Group>
                                                    <BootstrapForm.Label>Full Name</BootstrapForm.Label>
                                                    <Field type="text" className="form-control" name="fullName" />
                                                </BootstrapForm.Group>
                                                <BootstrapForm.Group>
                                                    <BootstrapForm.Label>Email</BootstrapForm.Label>
                                                    <Field type="text" className="form-control" name="email" />
                                                </BootstrapForm.Group>
                                                <BootstrapForm.Group>
                                                    <BootstrapForm.Label>Text</BootstrapForm.Label>
                                                    <Field type="text" as="textarea" className="form-control" rows="3" name="text" />
                                                </BootstrapForm.Group>
                                                <Button variant="primary" disabled={isSubmitting} type="submit">Submit</Button>
                                            </Card.Body>
                                        </Card>
                                    </Col>

                                </Row>
                            </Container>
                        </Form>
                    )}
                </Formik>


            </Container>
        );
    }


}