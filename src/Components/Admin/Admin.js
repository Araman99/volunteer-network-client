import React, { useEffect, useState } from 'react';
import { Button, Card, Container, Nav } from 'react-bootstrap';
import logo from '../../Image/logos/Group 1329.png'

const Admin = () => {
    const [allEvents, setAllEvents] = useState([])
    
    
    useEffect(()=>{
        
            fetch('https://limitless-anchorage-18267.herokuapp.com/allRegisteredEvent')
            .then(res=>res.json())
            .then(result=>setAllEvents(result))
       
    },[])

    const eventDeleteHandler=(id)=>{
        fetch('https://limitless-anchorage-18267.herokuapp.com/deleteEvent',{
            method:'DELETE',
            headers:{
                'Content-Type':'application/json',
                id:id
            }
        })
        .then(res=>res.json())
        .then(result=>{
            const existingEvents = allEvents.filter(data=>data._id !== id)
            if(result){
                setAllEvents(existingEvents)
            }
        })

    }

    return (
        <div>
            <img className='w-25' src={logo} alt=""/>
            <Container>
            <Card>
                <Card.Header>
                    <Nav variant="pills" defaultActiveKey="#first">
                    <Nav.Item>
                        <Nav.Link href="#first">Active</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="#link">Link</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="#disabled" disabled>
                        Disabled
                        </Nav.Link>
                    </Nav.Item>
                    </Nav>
                </Card.Header>
                <Card.Body>
                    {
                        allEvents.map(e => {return(
                        <div className='row mb-2'>
                            <p className='col-2'>{e.name}</p>
                            <p className='col-3'>{e.email}</p>
                            <p className='col-2'>{e.date}</p>
                             <p className='col-3'>{e.title}</p>
                            <Button variant="danger" onClick={()=>eventDeleteHandler(e._id)} >Delete</Button>
                             
                        </div>
                            
                        )})
                    }
                </Card.Body>
                </Card>
            </Container>

            
        </div>
    );
};

export default Admin;