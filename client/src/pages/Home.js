import React from 'react';

import { Button, Container, ImageBlock, IntroText } from '../styles/GenericStyles';

import HeroImage from '../components/HeroImage';

function itemSearch() {
    window.location.replace("/search");
}

const Home = () => {

    return (
        <>
        <Container>
        
              <IntroText>
              <div>Worthly... </div>
              <ImageBlock>
            <HeroImage></HeroImage>
            </ImageBlock>
            <div style={{"textAlign": "center"}}> How much is your stuff worth?<br></br>
            <Button onClick={itemSearch}>Find Out</Button>
            </div>
            
            </IntroText>

            
        </Container>
        </>
    );
};

export default Home;