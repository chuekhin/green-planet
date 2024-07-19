import { productCardObserver } from "./productCard";
import { receiveGroupObserver } from "./receiveForm";

const observer = () => {
    receiveGroupObserver();
    productCardObserver();
}

export default observer;