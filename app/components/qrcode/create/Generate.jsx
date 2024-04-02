import { useActionData, useNavigation } from '@remix-run/react';
import { Button, Card, InlineStack } from '@shopify/polaris'
import React from 'react'

const Generate = () => {
    const nav = useNavigation();
    const isSaving =
        nav.state === "submitting";

    const errors = useActionData()?.errors || {};

    return (
        <InlineStack blockAlign='right' align='right'>
            <Button variant='primary' tone='success' size='large' submit={true} >
                {isSaving ? 'Generating...' : 'Generate'}</Button>
        </InlineStack>
    )
}

export default Generate
