import { patterns } from '../../../constants/patterns'
import CustomPopover from '../../PopoverWithIcons'
const Pattern = () => {
    return (
        <CustomPopover types={patterns} title='Pattern' inputName='pattern' />
    )
}

export default Pattern
