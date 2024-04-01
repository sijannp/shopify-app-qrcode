import { BlockStack, Page, Text } from '@shopify/polaris';
import { qrCodeTypes } from '../../../constants/qrCodeTypes';
import Types from './Types';

const SelectType = ({ setType }) => {

    return (
        <Page>

            <BlockStack gap={800}>
                <Text alignment='center' as="h1" variant='headingLg'>Select the type of QR Code you want to create</Text>


                {qrCodeTypes.map((category) => (
                    <Types key={category.title} category={category} setType={setType} />
                ))}
            </BlockStack>

        </Page>
    );
};

export default SelectType;
