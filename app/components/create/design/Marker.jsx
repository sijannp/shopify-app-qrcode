import { borderTypes } from '../../../constants/border-types'
import CustomPopover from '../../PopoverWithIcons'


const Marker = ({ designData, setDesignData }) => {

    const handleMarkerChange = (marker) => {

        setDesignData({ ...designData, marker })
    }
    const selectedMarker = borderTypes.find(marker => marker.value === designData.marker) || borderTypes[0]

    return (
        <CustomPopover types={borderTypes} title='Marker' inputName='marker' selectedType={selectedMarker} onChange={handleMarkerChange} />
    )
}

export default Marker
