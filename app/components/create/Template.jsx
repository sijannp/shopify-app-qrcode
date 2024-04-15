import React, { useContext } from 'react'
import { templates } from '../../constants/templates'
import CustomPopover from '../PopoverWithIcons'
import { QrCodeContext } from '../../context/qrCodeContext'

const TemplateComponent = () => {

    const { designData, setDesignData, setColorsData, setFrameData, initialData } = useContext(QrCodeContext)




    const handleTemplateChange = (templatevalue) => {
        const template = templates.find(template => template.value === templatevalue)

        // Reset and Update Data
        const newDesignData = {
            ...initialData.design,
            ...template.settings.design,
            template: template.value
        }



        const newColorsData = {
            ...initialData.colors,
            ...template.settings.colors
        }


        const newFrameData = {
            ...initialData.frame,
            ...template.settings.frame
        }

        setDesignData(newDesignData)
        setColorsData(newColorsData)
        setFrameData(newFrameData)

    }

    const selectedTemplate = templates.find(template => template.value === designData.template) || templates[0]

    return (
        <CustomPopover types={templates} title='Template' inputName='template' selectedType={selectedTemplate} onChange={handleTemplateChange} />
    )
}

export default TemplateComponent
