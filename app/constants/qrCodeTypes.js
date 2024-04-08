import {
    HomeIcon, ProductIcon, CollectionIcon, LinkIcon, TextIcon, EmailIcon, LocationIcon, PhoneIcon, TextIcon as SmsIcon, ChatIcon, WifiIcon, PageIcon
} from '@shopify/polaris-icons';

export const qrCodeTypes = [
    {
        title: 'Shopify QR Codes',
        options: [
            { label: 'Homepage', value: 'homepage', icon: HomeIcon },
            { label: 'Product', value: 'product', icon: ProductIcon },
            { label: 'Collection', value: 'collection', icon: CollectionIcon },
            { label: 'Page', value: 'page', icon: PageIcon }

        ]
    },
    {
        title: 'Other QR Codes',
        options: [
            { label: 'Link', value: 'link', icon: LinkIcon },
            { label: 'Text', value: 'text', icon: TextIcon },
            { label: 'Email', value: 'email', icon: EmailIcon },
            { label: 'Location', value: 'location', icon: LocationIcon },
            { label: 'Phone', value: 'phone', icon: PhoneIcon },
            { label: 'SMS', value: 'sms', icon: SmsIcon },
            { label: 'Whatsapp', value: 'whatsapp', icon: ChatIcon },
            { label: 'Wifi', value: 'wifi', icon: WifiIcon },

        ]
    }
]
