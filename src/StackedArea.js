import {StackedArea as type} from "d3plus-plot";
import Shell from "./Viz";

/**
    @class StackedArea
    @extends Viz
*/
class StackedArea extends Shell {}
StackedArea.defaultProps = Object.assign({}, Shell.defaultProps, {type});
export default StackedArea;
