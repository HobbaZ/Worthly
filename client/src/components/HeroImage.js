
import '../app.css'

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

function randValues() {

  let randWidth = Math.floor(Math.random() * (400 - 250 + 1)) + 250;
  let randHeight = Math.floor(Math.random() * (400 - 250 + 1)) + 250;

  let coverHeight = Math.floor(Math.random() * (randHeight - (randHeight/3) +1)) + (randHeight/3);
  let coverWidth = Math.floor(Math.random() * (randWidth - (randWidth/3) +1)) + (randWidth/3);

  return [randWidth, randHeight, coverWidth, coverHeight]
}

//Store generated values

function objectToGen() {
  let object = ["book", "collectable", "toy"];

  let randNumber = Math.floor(Math.random()*object.length);
  
  

  if (object[randNumber] === "book") {

      randValues()
      let genrandWidth = randValues()[0]
      let genrandHeight = randValues()[1]

      let genCoverWidth = randValues()[2]
      let genCoverHeight = randValues()[3]

      let spineWidth = genrandWidth/6;

      console.log("book ", genrandWidth, genrandHeight, spineWidth)
        
    return (
      <>
      <svg width = {genrandWidth} height = {genrandHeight} x ="0" y="0">
      
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
      <rect x={0 + (spineWidth + spineWidth/2)} y={0 + (genCoverHeight/2)} width={genCoverWidth} height={genCoverHeight} fill={createRandomColor()} />

      {/*shade overlay*/}
      <rect x="0" y= "0" width="100%" height= "100%" fill={dayChange()} />
      </g>

      </svg>
      </>
    )
    };

    if (object[randNumber] === "collectable") {
      randValues()
      let genrandWidth = randValues()[0]/2
      let genrandHeight = randValues()[1]

      let genCoverWidth = randValues()[2]
      let genCoverHeight = randValues()[3]

      let cameraLense = createRandomColor();

      let spineWidth = genrandWidth/4;

      console.log("camera ", genrandWidth, genrandHeight, spineWidth)
        
    return (
      <>
      <svg width = {genrandWidth+spineWidth} height = {genrandHeight/2}>
      
      <g>
        {/*old camera*/}
      <rect x="0" y= "0" width="100%" height= "100%" fill={chosenColour} />

      {/*stripes*/}
      <rect x= "1%" y="0" width= "3%" height="100%" fill={createRandomColor()}/>
      <rect x= "4%" y="0" width= "3%" height="100%" fill={createRandomColor()}/>
      <rect x= "8%" y="0" width= "3%" height="100%" fill={createRandomColor()}/>

      {/*strap*/}
      <rect x={0 - (spineWidth/2)} y="50%" width={spineWidth} height="10%" fill={createRandomColor()}/>

      {/*side*/}
      <rect x="0" y="0" width={spineWidth} height="100%" fill={dayChange()} />

      {/*viewfinder*/}
      <rect x={0 + (spineWidth + spineWidth/4)} y={0 + (genCoverHeight/4)} width={genCoverWidth/4} height={genCoverHeight/4} fill={cameraLense}/>

      {/*parts for lense*/}
      <svg width = {genrandWidth} height = {genrandHeight/2} x ="50%" y ="5%">
            <g>
            {/*camera surround*/}
            <circle cx= "45%" cy="50%" r={(genrandWidth/2)/3} fill="black" />

            {/*lense 1*/}
            <circle cx="49%" cy="50%" r={(genrandWidth/2)/3} fill={createRandomColor()} />

            {/*lense 2*/}
            <circle cx="50%" cy="50%" r={(genrandWidth/2)/4} fill="black" />

            {/*lense 3*/}
            <circle cx="50%" cy="50%" r={(genrandWidth/2)/6} fill={cameraLense} />
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

      randValues()

      let windScreen = createRandomColor();

      let tireSize = Math.floor(Math.random() * (45 - 40 + 1) + 40);

      let rearTirePosY = (100 - (tireSize/2)) + "%";
      let rearTirePosX = (40 + (tireSize/2)) + "%";

      let wheelColour= createRandomColor();

      let bedColour= createRandomColor();

      let randRadiatorHeight = Math.floor(Math.random() * (60 - 20 + 1) + 20);
      let randRadiatorWidth = Math.floor(Math.random() * (60 - 30 + 1) + 30);
      
      return (
        <>
        {/*truck toy*/}
      <svg width = "100%" height = "50%" x="5%" y="25%">
      
      {/*truck bed collection*/}
      <svg width = "65%" height = "100%" x="20%" y="0%" >

      {/*truck bed*/}
      <svg width = "100%" height = "100%" x="0%" y="0%" >
      <g>
      <rect x="0" y= "0" width="100%" height= "100%" fill={bedColour}/>
      <rect x="0" y= "40%" width="100%" height= "10%" fill={createRandomColor()}/>
      <rect x="0" y= "50%" width="100%" height= "10%" fill={createRandomColor()}/>
      <rect x="0" y= "60%" width="100%" height= "10%" fill={createRandomColor()}/>

      {/*front of bed*/}
      <rect x="0" y="0" width="40%" height="100%" fill={dayChange()} />

      {/*side of bed*/}
      <svg x = "40%" y="0" width="60%" height="100%">
        <g>
        {/*rear tire*/}
        <svg width = {(tireSize/2) +"%"} height = {(tireSize/2) +"%"} x ={rearTirePosX} y = {rearTirePosY}>
              <g>

                {/*inner guard*/}
                <rect x="0" y="20%" width="100%" height="80%" fill="black" />

                {/*tire sidewell*/}
                <circle cx="45%" cy="50%" r="50%" fill="black" />
          
                {/*rim*/}
                <circle cx="46%" cy="50%" r="40%" fill={wheelColour} />

                {/*inner rim*/}
                <circle cx="46%" cy="50%" r="30%" fill="black" />

                {/*hubcap*/}
                <circle cx="46%" cy="50%" r="15%" fill="grey" />
            
                {/*outer guard*/}
                <rect x="0%" y="0%" width= "100%" height="30%" fill={bedColour} />
                </g>
            </svg>
        </g>

      </svg>

        {/*shade overlay*/}
        <rect x="0" y= "0" width="100%" height= "100%" fill={dayChange()} />
        </g>
        </svg>
        
      </svg>

      {/*cab parts collection*/}
      <svg width = "35%" height = "100%" x="0" y="0%">

      {/*cab*/}
      <svg width= "100%" height="80%" x ="0" y="20%">
      
      <g>
      <rect x="0" y= "0%" width="100%" height= "100%" fill={chosenColour} />
            
      {/*side Window*/}
      <rect x="55%" y="20%" width="25%" height={randRadiatorHeight} fill={windScreen}/>

      <svg width= "50%" height="100%" x ="0" y="0%">
          
      <g>
        {/*radiator area*/}
        <svg height="50%" width="100%" x ="0" y ="50%">
          <g>
      <rect  y={20+randRadiatorHeight/2} width={randRadiatorWidth} height={randRadiatorHeight} x={0+randRadiatorWidth/2} fill={createRandomColor()}/>

      {/*bumper*/}
      <rect x="0" y= "80%" width="100%" height= "20%" fill="grey"/>

      {/*left light*/}
      <rect x="0" y= "20%" width="20%" height= "20%" fill="white"/>

      {/*right light*/}
      <rect x="80%" y= "20%" width="20%" height= "20%" fill="white"/>
      </g>
      
      </svg>

      {/*front*/}
      <rect x="0" y="0%" width="100%" height="100%" fill={dayChange()} />

      {/*windscreen*/}
      <rect x="0" y="20%" width="100%" height={randRadiatorHeight} fill={windScreen}/>
      </g>
      </svg>

      </g>

      {/*front tire*/}
      <svg width = {(tireSize/2) +"%"} height = {(tireSize/2) +"%"} x ="60%" y = {rearTirePosY}>
              <g>

                {/*inner guard*/}
                <rect x="0" y="20%" width="100%" height="80%" fill="black" />

                {/*tire sidewell*/}
                <circle cx="45%" cy="50%" r="50%" fill="black" />
          
                {/*rim*/}
                <circle cx="46%" cy="50%" r="40%" fill={wheelColour} />

                {/*inner rim*/}
                <circle cx="46%" cy="50%" r="30%" fill="black" />

                {/*hubcap*/}
                <circle cx="46%" cy="50%" r="15%" fill="grey" />
            
                {/*outer guard*/}
                <rect x="0%" y="0%" width= "100%" height="30%" fill={chosenColour} />
                </g>
            </svg>

                     {/*shade overlay*/}
          <rect x="0" y= "0%" width="100%" height= "100%" fill={dayChange()} /> 

      </svg>
      </svg>
</svg>
</>
      )
    }

    

}
  
const HeroImage = () => {

return (
    <>
      
     <div className='svgContainer'>
     <svg width = "400px" height = "400px" x ="0" y="0">
     <circle cx="50%" cy="50%" r="50%" fill={createRandomColor()}/>
     <g>
     {objectToGen()}
     </g>
     </svg>

     
     </div>
        
      
    </>
  );

};

export default HeroImage;