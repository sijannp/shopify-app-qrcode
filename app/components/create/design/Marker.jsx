import { borderTypes } from '../../../constants/border-types'
import CustomPopover from '../../PopoverWithIcons'


const Marker = () => {

    return (
        <CustomPopover types={borderTypes} title='Marker' inputName='marker' />
    )
}

export default Marker
