import React, { useEffect, useState } from "react";

import { Container, Button } from "react-bootstrap";

function itemSearch() {
  window.location.replace("/search");
}

function WordAnimation() {
  let itemList = [
    "old toy",
    "playing card",
    "car",
    "boat",
    "vintage book",
    "furniture",
    "comic book",
    "painting",
  ];

  const [newWord, setNewWord] = useState(itemList[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setNewWord(itemList[Math.floor(Math.random() * itemList.length)]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return <span className="active">{newWord}</span>;
}

const Home = () => {
  return (
    <>
      <Container>
        <div className="main">
          <div className="flex-col">
            <h1 className="text-center">
              How much is my <WordAnimation /> worth?
            </h1>

            <p className="mx-auto col-xs-12 col-sm-8 col-md-6">
              Worthly is a tool you can use to get the real sale price of almost
              anything, click the find out button to start searching.{" "}
            </p>

            <div className="text-center">
              <Button
                className="btn form-btn col-xs-12 col-sm-6 col-md-4 col-lg-3 my-5 mx-auto"
                onClick={itemSearch}
              >
                Find Out
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Home;
