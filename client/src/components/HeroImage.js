
import '../app.css'

  //create random color
  function createRandomColor() {
    
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    return `rgba(${r},${g},${b})`;
  }

  function dollarSignGen() {
    <svg height="100" width="100" x="0" y="0">
    <circle cx="50" cy="50" r="40" stroke="green" stroke-width="3" fill='black'/>
    </svg>
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
  let object = ["book", "camera", "toy"];

  let randNumber = Math.floor(Math.random()*object.length);
  
  if (object[randNumber] === "book") {

      let bookWidth = Math.floor(Math.random() * (80 - 50 + 1) + 50);

      let coverVariables = Math.floor(Math.random() * (80 - 50 + 1) + 50);

      let coverPos = (50 - (coverVariables/2) + "%");

      let titleVariables = Math.floor(Math.random() * (70 - 50 + 1) + 50);

      let titlePos = (50 - (titleVariables/2) + "%");
        
    return (
      <>
      {/*Creates svg container of book size */}
      <svg width = {(bookWidth)+"%"} height = "80%" x={50- (bookWidth/2)+ "%"} y="0">
      <g>
      {/*book*/}
      <rect x="0" y= "0" width="100%" height= "100%" fill={createRandomColor()} />
        
      {/*cover svg container*/}
      <svg width="90%" height="100%" x="10%" y="0">
        <g>
          {/*cover */}
        <rect x="0" y= "0" width="100%" height= "100%" fill={createRandomColor()} />
        <g>
        {/*cover inset*/}
        <rect x= {coverPos} y= {coverPos} width= {(coverVariables) + "%"} height= {(coverVariables) + "%"} fill={createRandomColor()} />

        {/*Title box*/}
        <rect x= {titlePos} y= {titlePos} width= {(titleVariables) + "%"} height= {(titleVariables/2) + "%"} fill={createRandomColor()} />
        </g>
        </g>
      </svg>
        
      </g>
      </svg>
      </>
    )
    };

    if (object[randNumber] === "camera") {

      let cameraLense = createRandomColor();

      let viewfinderPosX = Math.floor(Math.random() * (45 - 15 + 1) + 15);
      let viewfinderPosY = Math.floor(Math.random() * (50 - 10 + 1) + 10);

      let lenseVariable = Math.floor(Math.random() * (70 - 40 + 1) + 40);
        
    return (
      <>
      <svg width = "80%" height = "50%" x="0%" y="0%">
      
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
      <svg width = {(lenseVariable)+"%"} height = {(lenseVariable)+"%"} x ={(lenseVariable/2)+"%"} y ={(lenseVariable/2)+"%"}>
            <g>
            {/*camera surround*/}
            <circle cx= "45%" cy="50%" r={(lenseVariable/2)+"%"} fill="black" />

            {/*lense 1*/}
            <circle cx="49%" cy="50%" r={(lenseVariable/2)+"%"} fill={createRandomColor()} />

            {/*lense 2*/}
            <circle cx="50%" cy="50%" r={(lenseVariable/3)+"%"} fill="black" />

            {/*lense 3*/}
            <circle cx="50%" cy="50%" r={(lenseVariable/4)+"%"} fill={cameraLense} />
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

      let lightHeight = (Math.floor(Math.random() * (50 - 10 + 1) + 10)) +"%";

      let cabColour = createRandomColor();
      let bedHeight = (Math.floor(Math.random() * (100 - 30 + 1) + 30));
      let bedPosX = 100 - (bedHeight) +"%";

      let radiatorPos = 50 - (randRadiatorWidth/2)
      let radiatorPosY = 50 - Math.floor(Math.random() * (randRadiatorHeight/2 - randRadiatorHeight/3 + 1) + randRadiatorHeight/3);

      let cabHeight = (Math.floor(Math.random() * (80 - 50 + 1) + 50)); 
      let cabPos = 100 - (cabHeight) +"%";

      let windowPos = (Math.floor(Math.random() * (20 - 5 + 1) + 5)) + "%";

      return (
        <>
        {/*truck toy*/}
        <svg width = "100%" height = "80%" x="0%" y="0%">
      
      {/*truck bed collection*/}
      <svg width = "65%" height = "100%" x="20%" y={bedPosX} >

      {/*truck bed*/}
      <svg width = "100%" height = {(bedHeight)  +"%"} x="0%" y="0%" >
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
                <rect x="0" y="20%" width="100%" height="100%" fill="black" />

                {/*tire sidewell*/}
                <circle cx="42%" cy="50%" r="50%" fill="black" />
          
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
      <svg width = "35%" height = "100%" x="0" y={cabPos}>

      {/*cab*/}
      <svg width= "100%" height= {(cabHeight) + "%"} x ="0" y= "0%">
      
      <g>
      <rect x="0" y= "0%" width="100%" height= "100%" fill={cabColour} />
            
      {/*side Window*/}
      <rect x="55%" y= {windowPos} width="25%" height={randRadiatorHeight+"%"} fill={windScreen}/>

      <svg width= "50%" height="100%" x ="0" y="0%">
          
      <g>
        {/*radiator area*/}
        <svg height="50%" width="100%" x ="0" y ="50%">
          <g>
      <rect  y={(randRadiatorWidth/2)+"%"} width={randRadiatorWidth+"%"} height={(radiatorPosY)+"%"} x={(radiatorPos)+"%"} fill="black"/>

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
      <rect x="0" y= {windowPos} width="100%" height={randRadiatorHeight+"%"} fill={windScreen}/>
      </g>
      </svg>

      </g>

      {/*front tire*/}
      <svg width = {(tireSize/2) +"%"} height = {(tireSize/2) +"%"} x ="60%" y = {rearTirePosY}>
              <g>

                {/*inner guard*/}
                <rect x="0" y="20%" width="100%" height="80%" fill="black" />

                {/*tire sidewell*/}
                <circle cx="49%" cy="50%" r="50%" fill="black" />
          
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
     <svg className='svg' width='500px' height='500px'  x ="0" y="0">
     <g>
     {objectToGen()}
     {dollarSignGen()}
     </g>
     </svg>
     </div>
     
    </>
  );

};

export default HeroImage;