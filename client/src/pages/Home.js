import React from 'react';

import {Container, Button} from 'react-bootstrap';

//import HeroImage from '../components/HeroImage';

//const randColors = ['#DF3B57', '#0F7173', '#895B1E', '#994636', '#A06B9A', '#2A2B2A']

//let randColor = randColors[Math.floor(Math.random()*randColors.length)]

function itemSearch() {
    window.location.replace("/search");
}

const Home = () => {

    return (
        <>
        <Container>
            <div className='text-center'> How much is your stuff worth?<br></br>
            <Button onClick={itemSearch}>Find Out</Button>
            </div>
        </Container>
        </>
    );
};

export default Home;