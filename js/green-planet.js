import initialRender from "./initialRender";
import listener from "./listener";
import observer from "./observer";

class Planet{
    init(){
        observer()
        initialRender();
        listener();
    }
}

export default Planet;