import { centerDotStyles } from '../../../constants/center-dot-styles';
import CustomPopover from '../../PopoverWithIcons';

const CenterDotStyle = () => {
    return (
        <CustomPopover types={centerDotStyles} title='Center Dot Style' inputName='marker_in' />

    )
}

export default CenterDotStyle
