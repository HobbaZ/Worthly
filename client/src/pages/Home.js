import React, {useEffect, useState} from 'react';

import {Container, Button} from 'react-bootstrap';

function itemSearch() {
    window.location.replace("/search");
}

function WordAnimation() {

    let itemList = ['old toy', 'playing card', 'car', 'boat', 'vintage book', 'furniture', 'comic book', 'painting']

    const [newWord, setNewWord] = useState(itemList[0]);

    useEffect(() => {
        const interval = setInterval(() => {
          setNewWord(itemList[Math.floor(Math.random()*itemList.length)]);
        }, 5000);
    
        return () => clearInterval(interval);
      }, []);
    
      return (
        <span className='active'>{newWord}</span>
      )
    }

const Home = () => {

    return (
        <>
        <Container>
            <div className='text-center main'> 
            <h1 className="landingPageText">How much is my <WordAnimation/> worth?</h1>

            <p className="mx-auto col-lg-6">Worthly is a tool you can use to get the real sale price of almost anything, click the find out button to start searching. </p>

            <Button className='btn form-btn landingPageBtn col-sm-12 col-md-8 col-lg-4 my-5' onClick={itemSearch}>Find Out</Button>
            </div>

            
        </Container>
        </>
    );
};

export default Home;