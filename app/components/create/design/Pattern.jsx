import { patterns } from '../../../constants/patterns'
import CustomPopover from '../../PopoverWithIcons'
const Pattern = ({ designData, setDesignData }) => {

    const handlePatternChange = (pattern) => {
        setDesignData({ ...designData, pattern })
    }
    const selectedPattern = patterns.find(pattern => pattern.value === designData.pattern) || patterns[0]


    return (
        <CustomPopover types={patterns} title='Pattern' inputName='pattern' selectedType={selectedPattern} onChange={handlePatternChange} />
    )
}

export default Pattern
