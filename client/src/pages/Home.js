import React, { useEffect } from 'react';

import { Button, Container, ImageBlock, IntroText} from '../styles/GenericStyles';

import HeroImage from '../components/HeroImage';

const randColors = ['#DF3B57', '#0F7173', '#895B1E', '#994636', '#A06B9A', '#2A2B2A']

let randColor = randColors[Math.floor(Math.random()*randColors.length)]

function itemSearch() {
    window.location.replace("/search");
}

const Home = () => {

    useEffect(() => {
        document.body.style = `background: ${randColor}`;
    }, [])

    return (
        <>
        <Container>
              <IntroText>
              <ImageBlock>
            <HeroImage />
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