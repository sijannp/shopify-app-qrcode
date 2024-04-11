import React from 'react'
import { templates } from '../../constants/templates'
import CustomPopover from '../PopoverWithIcons'

const TemplateComponent = () => {
    return (
        <CustomPopover types={templates} title='Template' inputName='template' />
    )
}

export default TemplateComponent
