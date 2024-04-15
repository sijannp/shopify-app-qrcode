import { centerDotStyles } from '../../../constants/center-dot-styles';
import CustomPopover from '../../PopoverWithIcons';

const CenterDotStyle = ({ designData, setDesignData }) => {

    const handleCenterDotStyleChange = (centerDotStyle) => {
        setDesignData({ ...designData, marker_in: centerDotStyle })
    }

    const selectedCenterDotStyle = centerDotStyles.find(centerDotStyle => centerDotStyle.value === designData.marker_in) || centerDotStyles[0]
    return (
        <CustomPopover types={centerDotStyles} title='Center Dot Style' inputName='marker_in' selectedType={selectedCenterDotStyle} onChange={handleCenterDotStyleChange} />

    )
}

export default CenterDotStyle
