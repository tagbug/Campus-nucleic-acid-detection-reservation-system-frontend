import { Input, Picker, Space } from "antd-mobile";
import {
    RightOutline
} from "antd-mobile-icons";
import { PickerColumn } from "antd-mobile/es/components/picker";
import React, { useState } from "react";
import styled from "styled-components";

type PickerItemProps = {
    name?: string,
    placeholder?: string,
    columns: PickerColumn[],
    value?: string,
    onChange?: (value?: string) => any
    handleChange?: (value?: string) => any
}

/**
 * 选择器表单项，对 antd-mobile 的 Picker 简单封装
 */
export const PickerItem = React.memo(({ value, onChange, handleChange, name, placeholder, columns }: PickerItemProps) => {

    const [pickerValue, setPickerValue] = useState<string>();

    const handleClick = () => {
        Picker.prompt({ columns }).then(v => {
            if (v?.[0]) {
                setPickerValue(v[0]);
                onChange?.(v[0]);
                handleChange?.(v[0]);
            }
        })
    }

    return <Container>
        <Space block align="center" justify="around" onClick={handleClick} className="pickerItem-container">
            <Input name={name} placeholder={placeholder} value={value === undefined ? pickerValue : value} disabled />
            <RightOutline color="rgb(204, 204, 204)" />
        </Space>
    </Container>
});

const Container = styled.div`
    .adm-input-disabled {
        opacity: 1 !important;
    }

    .pickerItem-container > *:first-child {
        flex: 1;
    }

    .pickerItem-container > *:last-child {
        flex: 0;
    }
`