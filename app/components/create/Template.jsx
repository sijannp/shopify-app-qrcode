import React, { useContext } from 'react'
import { templates } from '../../constants/templates'
import CustomPopover from '../PopoverWithIcons'
import { QrCodeContext } from '../../context/qrCodeContext'

const TemplateComponent = () => {

    const { designData, setDesignData, colorsData, setColorsData, frameData, setFrameData, initialData } = useContext(QrCodeContext)




    const handleTemplateChange = (templatevalue) => {
        const template = templates.find(template => template.value === templatevalue)

        // Reset Data
        setColorsData({ ...initialData.colors })
        setDesignData({ ...initialData.design })
        setFrameData({ ...initialData.frame })


        //Update Data
        const newDesignData = {
            ...designData,
            ...template.settings.design,
            template: template.value
        }

        const newColorsData = {
            ...colorsData,
            ...template.settings.colors
        }


        console.log(newColorsData, '---newColorsData---')
        console.log(colorsData, '---colorsData---')
        const newFrameData = {
            ...frameData,
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
