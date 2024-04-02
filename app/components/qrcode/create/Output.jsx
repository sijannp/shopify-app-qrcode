import { Avatar, Card, Icon } from '@shopify/polaris'
import React from 'react'
import QRCExample from '../../../assets/img/QRCExample.svg'
import {
    ShopcodesIcon
} from '@shopify/polaris-icons';
import { useActionData } from '@remix-run/react';
import QrCode from './QrCode';

const Output = () => {
    const qrCode = useActionData()?.qrCode || null;
    console.log(qrCode)
    return (
        <Card>
            {qrCode ? <Avatar size="large" source={qrCode.image} /> :
                <Avatar size="large" source={QRCExample} />
            }
        </Card>
    )
}

export default Output
