
import '../app.css'

  //create random color
  function createRandomColor() {
    
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    return `rgba(${r},${g},${b})`;
  }

  //parts of image change to time specific highlights
  function dayChange() {

    const date = new Date();
    let currentHour = date.getHours();
    let currentColour = '';
    
    if (currentHour >=5 && currentHour < 7) {
        return currentColour = 'rgba(165, 68, 3, 0.2)';

    } else if (currentHour >=7 && currentHour < 12) {
      return currentColour = 'rgba(3, 133, 165, 0.2)';

    } else if (currentHour >=12 && currentHour < 13) {
      return currentColour = '125, 229, 255, 0.2)';

    } else if (currentHour >= 13 && currentHour < 15 ) {
      return currentColour = 'rgba(3, 133, 165, 0.2)';

    } else if (currentHour >= 15 && currentHour < 18 ) {
      return currentColour = 'rgba(165, 68, 3, 0.2)';

    } else {
      return currentColour = 'rgb(165, 68, 3, 0.2)';
    }
}

//Store generated values
function objectToGen() {
  let object = ["book", "collectable", "toy"];

  let randNumber = Math.floor(Math.random()*object.length);
  
  if (object[randNumber] === "book") {

      let svgWidth = Math.floor(Math.random() * (80 - 50 + 1) + 50);
      let spineWidth = svgWidth/4;

      let coverPosX = Math.floor(Math.random() * (90 - 30 + 1) + 30);
      let coverPosY = Math.floor(Math.random() * (90 - 30 + 1) + 30);
        
    return (
      <>
      <svg width = {(svgWidth)+"%"} height = "60%" x={50- (svgWidth/2)+ "%"} y="20%">
      
      <g>
        {/*book*/}
      <rect x="0" y= "0" width="100%" height= "100%" fill={createRandomColor()} />
      
      {/*spine*/}
      <svg width = {(spineWidth)+"%"} height = "100%" x="0" y="0">
      <g>
      
      <rect x="0" y="0" width="60%" height="100%" fill={dayChange()} />

      {/*pages*/}
      <rect x="10%" y="0" width="50%" height="100%" fill="white" style={{stroke:"black", strokeWidth:"1"}}/>
      </g>
      </svg>

      {/*cover*/}
      <rect x={coverPosX} y={coverPosY} width={coverPosX} height={coverPosY} fill={createRandomColor()} />
      </g>
      </svg>
      </>
    )
    };

    if (object[randNumber] === "collectable") {

      let cameraLense = createRandomColor();

      let viewfinderPosX = Math.floor(Math.random() * (45 - 15 + 1) + 15);
      let viewfinderPosY = Math.floor(Math.random() * (50 - 10 + 1) + 10);

      let lensePosX = Math.floor(Math.random() * (70 - 50 + 1) + 50);
        
    return (
      <>
      <svg width = "80%" height = "50%" x="10%" y="25%">
      
      <g>
        {/*old camera*/}
      <rect x="0" y= "0" width="100%" height= "100%" fill={createRandomColor()} />

      {/*stripes*/}
      <rect x= "7%" y="0" width= "3%" height="100%" fill={createRandomColor()}/>

      {/*strap*/}
      <rect x="0" y="50%" width="8%" height="10%" fill={createRandomColor()}/>

      {/*side*/}
      <rect x="0" y="0" width="12%" height="100%" fill={dayChange()} />

      {/*viewfinder*/}
      <rect x={(viewfinderPosX)+"%"} y={(viewfinderPosY)+"%"} width={(viewfinderPosX)+"%"} height={(viewfinderPosY)+"%"} fill={cameraLense}/>

      {/*parts for lense*/}
      <svg width = {(lensePosX)+"%"} height = {(lensePosX)+"%"} x ="50%" y ="40%">
            <g>
            {/*camera surround*/}
            <circle cx= "45%" cy="50%" r={(lensePosX/2)} fill="black" />

            {/*lense 1*/}
            <circle cx="49%" cy="50%" r={(lensePosX/2)} fill={createRandomColor()} />

            {/*lense 2*/}
            <circle cx="50%" cy="50%" r={(lensePosX/3)} fill="black" />

            {/*lense 3*/}
            <circle cx="50%" cy="50%" r={(lensePosX/4)} fill={cameraLense} />
            </g>
      </svg>
      </g>
      </svg>
      </>
    )
    }

    if (object[randNumber] === "toy") {

      let windScreen = createRandomColor();

      let tireSize = Math.floor(Math.random() * (45 - 40 + 1) + 40);

      let rearTirePosY = (100 - (tireSize/2)) + "%";
      let rearTirePosX = (40 + (tireSize/2)) + "%";

      let wheelColour= createRandomColor();

      let bedColour= createRandomColor();

      let randRadiatorHeight = Math.floor(Math.random() * (60 - 10 + 1) + 10);
      let randRadiatorWidth = Math.floor(Math.random() * (100 - 10 + 1) + 10);

      let lightHeight = (Math.floor(Math.random() * (30 - 10 + 1) + 10)) +"%";

      let cabColour = createRandomColor();

      return (
        <>
        {/*truck toy*/}
        <svg width = "90%" height = "50%" x="10%" y="25%">
      
      {/*truck bed collection*/}
      <svg width = "65%" height = "100%" x="20%" y="0%" >

      {/*truck bed*/}
      <svg width = "100%" height = "100%" x="0%" y="0%" >
      <g>
      <rect x="0" y= "0" width="100%" height= "100%" fill={bedColour}/>
      <rect x="0" y= "40%" width="100%" height= {Math.floor(Math.random() * (25 - 5 + 1) + 5)} fill={createRandomColor()}/>
      <rect x="0" y= "50%" width="100%" height= {Math.floor(Math.random() * (25 - 5 + 1) + 5)} fill={createRandomColor()}/>
      <rect x="0" y= "60%" width="100%" height= {Math.floor(Math.random() * (25 - 5 + 1) + 5)} fill={createRandomColor()}/>

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
        </g>
        </svg>
        
      </svg>

      {/*cab parts collection*/}
      <svg width = "35%" height = "100%" x="0" y="0%">

      {/*cab*/}
      <svg width= "100%" height="80%" x ="0" y="20%">
      
      <g>
      <rect x="0" y= "0%" width="100%" height= "100%" fill={cabColour} />
            
      {/*side Window*/}
      <rect x="55%" y="20%" width="25%" height={randRadiatorHeight} fill={windScreen}/>

      <svg width= "50%" height="100%" x ="0" y="0%">
          
      <g>
        {/*radiator area*/}
        <svg height="50%" width="100%" x ="0" y ="50%">
          <g>
      <rect  y={(randRadiatorWidth/2)+"%"} width={randRadiatorWidth+"%"} height={(Math.floor(Math.random() * (100 - 10 + 1) + 10))+"%"} x={0+randRadiatorWidth/2} fill="black"/>

      {/*bumper*/}
      <rect x="0" y= "80%" width="100%" height= "20%" fill="grey"/>

      {/*left light*/}
      <rect x="0" y= "20%" width="20%" height= {lightHeight} fill="white"/>

      {/*right light*/}
      <rect x="80%" y= "20%" width="20%" height= {lightHeight} fill="white"/>
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
                <rect x="0%" y="0%" width= "100%" height="30%" fill={cabColour} />
                </g>
            </svg>
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