import { Badge, Button, DataTable, InlineStack, TextField } from '@shopify/polaris'
import React from 'react'

const QrCodeTable = ({ qrCodes }) => {
    return (
        <DataTable columnContentTypes={['text', 'text', 'text', 'text', 'text', 'text']} headings={['S.N.', 'Title', 'Type', 'Scans', 'Last Scanned', 'Actions']} rows={qrCodes.map((qrCode, index) => [
            index + 1,
            qrCode.title,
            <Badge tone='attention'>{qrCode.type}</Badge>,
            qrCode.scans,
            qrCode.lastScannedAt,
            <InlineStack>
                <TextField name='id' value={qrCode.id} type='hidden' readOnly />
                <Button submit plain destructive url={`/app/qrcode/${qrCode.id}`} > View </Button>
            </InlineStack>
        ])} />
    )
}

export default QrCodeTable
