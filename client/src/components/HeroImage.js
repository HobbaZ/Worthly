
  //create random color
  function createRandomColor() {
    
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    return `rgba(${r},${g},${b})`;
  }

  let chosenColour = createRandomColor()

  //parts of image change to time specific highlights
  function dayChange() {

    const date = new Date();
    let currentHour = date.getHours();
    let currentColour = '';

    console.log("Current hour is " + currentHour);
    
    if (currentHour >=5 && currentHour < 7) {
        return currentColour = 'rgb(165, 68, 3, 0.3)';

    } else if (currentHour >=7 && currentHour < 12) {
      return currentColour = 'rgb(165, 68, 3, 0.3)';

    } else if (currentHour >=12 && currentHour < 13) {
      //return currentColour = 'rgb(165, 68, 3, 0.3)';
      return currentColour = 'rgba(73, 74, 99, 0.3)';

    } else if (currentHour >= 13 && currentHour < 18 ) {
      //return currentColour = 'rgb(165, 68, 3, 0.3)';
      return currentColour = 'rgba(39, 40, 41, 0.377)';

    } else {
      return currentColour = 'rgba(73, 74, 99, 0.644)';
      //return currentColour = 'rgb(165, 68, 3, 0.3)';
    }
}

function randBookWidth() {

  let bookWidth = Math.floor(Math.random() * 300 - 250 + 1) + 250;
  let bookHeight = Math.floor(Math.random() * (300 - 200 + 1)) + 200;

  let coverHeight = Math.floor(Math.random() * bookHeight) + 1;
  let coverWidth = Math.floor(Math.random() * bookWidth) + 1;

  return [bookWidth, bookHeight, coverWidth, coverHeight]
}

function randToyWidth() {

  let toyWidth = Math.floor(Math.random() * 300 - 250 + 1) + 250;
  let toyHeight = Math.floor(Math.random() * (200 - 100 + 1)) + 100;

  let coverHeight = Math.floor(Math.random() * toyHeight) + 1;
  let coverWidth = Math.floor(Math.random() * toyWidth) + 1;

  return [toyWidth, toyHeight, coverWidth, coverHeight]
}

//Store generated values

function objectToGen() {
  let object = ["book"];

  let randNumber = Math.floor(Math.random()*object.length);
    
  if (object[randNumber] === "book") {

      randBookWidth()
      let genBookWidth = randBookWidth()[0]
      let genBookHeight = randBookWidth()[1]

      let genCoverWidth = randBookWidth()[2]
      let genCoverHeight = randBookWidth()[3]

      let spineWidth = genBookWidth/4;

      console.log("book ", genBookWidth, genBookHeight, spineWidth)
        
    return (
      <>
      <svg width = {genBookWidth} height = {genBookHeight}>
      
        {/*book*/}
      <rect x="0" y= "0" width="100%" height= "100%" fill={chosenColour} />
      
      
      <g>
      {/*spine*/}
      <rect x="0" y="0" width={spineWidth} height="100%" fill={dayChange()} />
      </g>

      <g>
      {/*light spine*/}
      <rect x={0 + (spineWidth/8)} y="0" width={spineWidth/4} height="100%" fill={chosenColour} />
      </g>

      <g>
      {/*pages*/}
      <rect x={0 + (spineWidth/3)} y="0" width={spineWidth/2} height="100%" fill="white" style={{stroke:"black", strokeWidth:"1"}}/>
      </g>

      <g>
      {/*cover*/}
      <rect x={0 + (spineWidth + spineWidth/4)} y={0 + (genCoverHeight/4)} width={genCoverWidth} height={genCoverHeight} fill={createRandomColor()} />
      </g>
      </svg>
      
      </>
    )
    }
}
  
const HeroImage = () => {

  //Create with svg

return (
    <>
      <svg width= "500px" height="500px" style={{
          /*clipPath: "circle(50% at 50% 50%)",*/
          margin:"auto",
        }}>

      
      <rect x="50%" y="50%" fill={createRandomColor()}/>

      <svg x="50%" y= "50%">
      {objectToGen()}
      </svg>

      <rect x="50%" y="50%" fill={dayChange()} />
      
      </svg>

    </>
  );

};

export default HeroImage;