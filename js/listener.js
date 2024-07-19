import { productCardGroupHandler, productCardSlideGroupHandler } from "./productCard";
import { receiveGroupHandler } from "./receiveForm"
import { productCardGroup, productCardSlideGroup, receiveGroup } from "./selectors"

const listener = () => {
    productCardGroup.addEventListener("click",productCardGroupHandler);
    productCardSlideGroup.addEventListener("click",productCardSlideGroupHandler);
    receiveGroup.addEventListener("click",receiveGroupHandler);
}

export default listener