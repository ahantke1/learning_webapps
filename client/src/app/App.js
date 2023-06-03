import React, { Component } from 'react';
import logo from '../static/logo.svg';
import '../static/App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Container, Card, Row } from 'react-bootstrap'

function App() {
  // Define Main Applicaiton State using react hook
  // https://stackoverflow.com/questions/8102674/what-is-application-state
  // https://react.dev/reference/react - info about react hooks
  // https://legacy.reactjs.org/docs/hooks-intro.html - info about react hooks
  const [appState, setAppState] = useState({
        setBookName: '',
        setReview: '',
        fetchData: [],
        reviewUpdate: ''
  })

  // When this componet mounts to the dom, fetch the state data from the server
  // learn more about the dom
  // https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction
  // learn more about mounting
  // https://www.freecodecamp.org/news/how-to-understand-a-components-lifecycle-methods-in-reactjs-e1a609840630
  useEffect(() => {
    axios.get("/api/get")
    .then((response) => {
      setAppState({
            setBookName: '',
            setReview: '',
            fetchData: response.data,
            reviewUpdate: ''
        })
    }).catch((e) => {})
  }, []);

  /**********************************************
    Event Handlers Start
    https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events

    Note, we want to maintain the entire state excpet for the specific thing we are changing
  **********************************************/
  const handleName = (event) => {
    setAppState({
      setBookName: event.target.value,
      setReview: appState.setReview,
      fetchData: appState.fetchData,
      reviewUpdate: appState.reviewUpdate
    })
  }

  const setReview = (event) => {
    setAppState({
      setReview: event.target.value,
      setBookName: appState.setBookName,
      fetchData: appState.fetchData,
      reviewUpdate: appState.reviewUpdate
    })
  }

  const updateReview = (event) => {
    setAppState({
      setReview: appState.setReview,
      setBookName: appState.setBookName,
      fetchData: appState.fetchData,
      reviewUpdate: event.target.value
    })
  }

  /********************************************** 
      Event Handlers End
  **********************************************/



  /********************************************** 
      API Handlers Start
  **********************************************/
  const submit = () => {
    axios.post('/api/insert', appState)
        .then(() => { alert('success post') })
    console.log(appState)
    document.location.reload();
  }
  
  const remove = (id) => {
      axios.delete(`/api/delete/${id}`)
      document.location.reload()
  }
  
  const edit = (id) => {
    axios.put(`/api/update/${id}`, appState)
    document.location.reload();
  }

  /********************************************** 
      API Handlers End
  **********************************************/


  // Card Component
  let card = appState.fetchData.map((val, key) => {
    console.log(val)
    console.log(key)
    return (
      <React.Fragment key={val.id}>
          <Card style={{ width: '18rem' }} className='m-2'>
              <Card.Body>
                  <Card.Title>{val.book_name}</Card.Title>
                  <Card.Text>
                      {val.book_review}
                  </Card.Text>
                  <input name='updateReview' onChange={updateReview} placeholder='Update Review' />
                  <Button className='m-2' onClick={() => { edit(val.id) }}>Update</Button>
                  <Button onClick={() => { remove(val.id) }}>Delete</Button>
              </Card.Body>
          </Card>
      </React.Fragment>
    )
  })

  // App Component
  return (
    <div className='App'>
    <h1>The Reviewer</h1>
    <div className='form'>
        <input name='setBookName' data-testid="name_input" placeholder='Enter Name' onChange={handleName} />
        <input name='setReview' data-testid="review_input" placeholder='Enter Review' onChange={setReview} />
    </div>
    <Button className='my-2' data-testid="submit" variant="primary" onClick={submit}>Submit</Button> <br /><br />
    <Container>
        <Row>
            {card}
        </Row>
    </Container>
  </div>
  );
}

export default App;
