import dontAllowPets from "../../../public/svg-dont-allow-pets.svg"
import allowPets from "../../../public/svg-allow-pets.svg"
import dontAllowEvents from "../../../public/svg-dont-allow-events.svg"
import allowEvents from "../../../public/svg-allow-vents.svg"
import dontAllowChildren from "../../../public/svg-dont-allow-children.svg"
import allowChildren from "../../../public/svg-allow-children.svg"
import dontAllowSmoking from "../../../public/svg-dont-allow-smoking.svg"
import allowSmoking from "../../../public/svg-allow-smoking.svg"


export default {
    "childrentrue":<img className="svg-icons-lg " src={allowChildren.src}  alt="Dishwasher"  />,   
    "childrenfalse": <img className="svg-icons-lg " src={dontAllowChildren.src}  alt="Dishwasher"  />, 
    "eventstrue": <img className="svg-icons-lg " src={allowEvents.src}  alt="Dishwasher"  />, 
    "eventsfalse": <img className="svg-icons-lg " src={dontAllowEvents.src}  alt="Dishwasher"  />, 
    "petstrue": <img className="svg-icons-lg " src={allowPets.src}  alt="Dishwasher"  />, 
    "petsfalse": <img className="svg-icons-lg " src={dontAllowPets.src}  alt="Dishwasher"  />, 
    "smokingtrue": <img  className="svg-icons-lg "src={allowSmoking.src}  alt="Dishwasher"  />, 
    "smokingfalse": <img className="svg-icons-lg " src={dontAllowSmoking.src}  alt="Dishwasher"  />, 
     
};
 