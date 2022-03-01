import React from 'react';

import { Button, Container, ImageBlock, IntroText } from '../styles/GenericStyles';

import HeroImage from '../components/HeroImage';

const Home = () => {

    return (
        <>
        <Container>
        
              <IntroText>
              <div>Worthly... </div>
              <ImageBlock>
            <HeroImage></HeroImage>
            </ImageBlock>
            <div> How much is your stuff worth?</div>
            </IntroText>
        </Container>
        </>
    );
};

export default Home;