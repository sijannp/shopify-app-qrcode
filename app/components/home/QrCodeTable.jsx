import { Badge, Button, DataTable, InlineStack, TextField } from '@shopify/polaris'
import { ViewIcon } from '@shopify/polaris-icons'
import React from 'react'

const QrCodeTable = ({ qrCodes }) => {
    return (
        <DataTable columnContentTypes={['text', 'text', 'text', 'text', 'text', 'text']} headings={['S.N.', 'Title', 'Type', 'Scans', 'Last Scanned', 'Actions']} rows={qrCodes.map((qrCode, index) => [
            index + 1,
            truncate(qrCode.title),
            <Badge tone='success'>{qrCode.type}</Badge>,
            qrCode.scans,
            qrCode.lastScannedAt,
            <InlineStack>
                <TextField name='id' value={qrCode.id} type='hidden' readOnly />
                <Button submit variant='tertiary' icon={ViewIcon} url={`/app/qrcode/${qrCode.id}`} > View </Button>
            </InlineStack>
        ])} />
    )
}

function truncate(str, { length = 30 } = {}) {
    if (!str) return "";
    if (str.length <= length) return str;
    return str.slice(0, length) + "…";
}

export default QrCodeTable
