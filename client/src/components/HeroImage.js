
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
      //return currentColour = 'rgba(73, 74, 99, 0.3)';
      return currentColour = 'rgb(165, 68, 3, 0.3)';
    }
}

function randBookWidth() {

  let bookWidth = Math.floor(Math.random() * (300 - 250 + 1)) + 250;
  let bookHeight = Math.floor(Math.random() * (300 - 200 + 1)) + 200;

  let coverHeight = Math.floor(Math.random() * (bookHeight - (bookHeight/3) +1)) + (bookHeight/3);
  let coverWidth = Math.floor(Math.random() * (bookWidth - (bookWidth/3) +1)) + (bookWidth/3);

  return [bookWidth, bookHeight, coverWidth, coverHeight]
}

//Store generated values

function objectToGen() {
  let object = ["book", "collectable", "toy"];

  let randNumber = Math.floor(Math.random()*object.length);
    
  if (object[randNumber] === "book") {

      randBookWidth()
      let genBookWidth = randBookWidth()[0]
      let genBookHeight = randBookWidth()[1]

      let genCoverWidth = randBookWidth()[2]
      let genCoverHeight = randBookWidth()[3]

      let spineWidth = genBookWidth/6;

      console.log("book ", genBookWidth, genBookHeight, spineWidth)
        
    return (
      <>
      <svg width = {genBookWidth} height = {genBookHeight}>
      
      <g>
        {/*book*/}
      <rect x="0" y= "0" width="100%" height= "100%" fill={chosenColour} />
      
      {/*spine*/}
      <rect x="0" y="0" width={spineWidth} height="100%" fill={dayChange()} />

      {/*light spine*/}
      <rect x={0 + (spineWidth/8)} y="0" width={spineWidth/4} height="100%" fill={chosenColour} />

      {/*pages*/}
      <rect x={0 + (spineWidth/3)} y="0" width={spineWidth/2} height="100%" fill="white" style={{stroke:"black", strokeWidth:"1"}}/>

      {/*cover*/}
      <rect x={0 + (spineWidth + spineWidth/4)} y={0 + (genCoverHeight/4)} width={genCoverWidth} height={genCoverHeight} fill={createRandomColor()} />

      {/*shade overlay*/}
      <rect x="0" y= "0" width="100%" height= "100%" fill={dayChange()} />
      </g>

      </svg>
      </>
    )
    };

    if (object[randNumber] === "collectable") {
      randBookWidth()
      let genBookWidth = randBookWidth()[0]
      let genBookHeight = randBookWidth()[1]

      let genCoverWidth = randBookWidth()[2]
      let genCoverHeight = randBookWidth()[3]

      let cameraLense = createRandomColor();

      let spineWidth = genBookWidth/4;

      console.log("camera ", genBookWidth, genBookHeight, spineWidth)
        
    return (
      <>
      <svg width = {genBookWidth+spineWidth} height = {genBookHeight/2}>
      
      <g>
        {/*old camera*/}
      <rect x="0" y= "0" width="100%" height= "100%" fill={chosenColour} />

      {/*stripe*/}
      <rect x={0 + (spineWidth/3)} y="0" width={randBookWidth()[0]/10} height="100%" fill={createRandomColor()}/>

      {/*strap*/}
      <rect x={0 - (spineWidth/2)} y="50%" width={spineWidth} height="10%" fill={createRandomColor()}/>

      {/*side*/}
      <rect x="0" y="0" width={spineWidth} height="100%" fill={dayChange()} />

      {/*viewfinder*/}
      <rect x={0 + (spineWidth + spineWidth/4)} y={0 + (genCoverHeight/4)} width={genCoverWidth/4} height={genCoverHeight/4} fill={cameraLense}/>


      {/*parts for lense*/}
      <svg width = {genBookWidth} height = {genBookHeight/2} x ={spineWidth-10} y ="5%">
      <g>
      {/*camera surround*/}
      <circle cx= "45%" cy="50%" r={(genBookWidth/2)/3} fill="black" />

      {/*lense 1*/}
      <circle cx="49%" cy="50%" r={(genBookWidth/2)/3} fill={createRandomColor()} />

      {/*lense 2*/}
      <circle cx="50%" cy="50%" r={(genBookWidth/2)/4} fill="black" />

      {/*lense 3*/}
      <circle cx="50%" cy="50%" r={(genBookWidth/2)/6} fill={cameraLense} />
      </g>
      </svg>

      {/*shade overlay*/}
      <rect x="0" y= "0" width="100%" height= "100%" fill={dayChange()} />
      </g>
      </svg>
      </>
    )
    }

    if (object[randNumber] === "toy") {

      randBookWidth()
      let genBookWidth = randBookWidth()[0]
      let genBookHeight = randBookWidth()[1]

      let windScreen = createRandomColor();

      let spineWidth = genBookWidth/4;

      let tireSize = genBookHeight/6;

      let wheelColour= createRandomColor();

      console.log("truck ", genBookWidth, genBookHeight, spineWidth)

      return (
        <>
        {/*truck toy*/}
      <svg width = {genBookWidth+spineWidth} height = {genBookHeight/2} x="0" y="0">
      
      {/*truck bed collection*/}
      <svg width = "65%" height = "100%" x="15%" y="0%" >

      {/*truck bed*/}
      <svg width = "100%" height = "80%" x="0%" y="0%" >
      <g>
      <rect x="0" y= "0" width="100%" height= "100%" fill={createRandomColor()}/>

      {/*front of bed*/}
      <rect x="0" y="0" width={spineWidth+10} height="100%" fill={dayChange()} />
      </g>
      </svg>

        {/*tire 1*/}
        <svg width = {tireSize} height = {tireSize} x ="65%" y ="60%">
                <g>
                {/*tire sidewell*/}
                <circle cx="48%" cy="50%" r={(tireSize)/2} fill="black" />
          
                {/*rim*/}
                <circle cx="49%" cy="50%" r={(tireSize)/3} fill={wheelColour} />

                {/*inner rim*/}
                <circle cx="49%" cy="50%" r={(tireSize)/4} fill="black" />

                {/*hubcap*/}
                <circle cx="49%" cy="50%" r={(tireSize)/5} fill="grey" />
            
                {/*outer guard*/}
                <rect x="0%" y="0%" width= "100%" height="20%" fill={chosenColour} />
                </g>
            </svg>

      {/*shade overlay*/}
      <rect x="0" y= "0" width="100%" height= "80%" fill={dayChange()} />
      </svg>


      {/*cab parts collection*/}
      <svg width = "36%" height = "100%" x="0" y="0%">

      {/*cab*/}
      <svg width= "100%" height="80%" x ="0" y="10%">
      
      <g>
      <rect x="0" y= "0%" width="100%" height= "100%" fill={chosenColour} />
            
      {/*radiator*/}
      <rect x={0 + (spineWidth/3)} y="50%" width={randBookWidth()[0]/10} height="40%" fill={createRandomColor()}/>

      {/*windscreen*/}
      <rect x="0" y="20%" width={spineWidth} height="20%" fill={windScreen}/>

      {/*side Window*/}
      <rect x={0 + spineWidth} y="20%" width="30%" height="20%" fill={windScreen}/>

      {/*front*/}
      <rect x="0" y="0%" width={spineWidth} height="100%" fill={dayChange()} />
      </g>
      </svg>

          {/*tire 1*/}
          <svg width = "50%" height = {tireSize} x ="60%" y ="60%">
                <g>
                {/*tire sidewell*/}
                <circle cx="48%" cy="50%" r={(tireSize)/2} fill="black" />
          
                {/*rim*/}
                <circle cx="49%" cy="50%" r={(tireSize)/3} fill={wheelColour} />

                {/*inner rim*/}
                <circle cx="49%" cy="50%" r={(tireSize)/4} fill="black" />

                {/*hubcap*/}
                <circle cx="49%" cy="50%" r={(tireSize)/5} fill="grey" />
            
                {/*outer guard*/}
                <rect x="0%" y="0%" width= "100%" height="20%" fill={chosenColour} />
                </g>
            </svg>
                
          {/*shade overlay*/}
          <rect x="0" y= "10%" width="100%" height= "80%" fill={dayChange()} />
      </svg>

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