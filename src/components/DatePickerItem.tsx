import { DatePicker } from "antd-mobile";
import React from "react";
import moment from "moment";

type DatePickerItemProps = {
    visible: boolean,
    setVisible: (v: boolean) => any,
    defaultValue?: Date,
    value?: string,
    onChange?: (value?: string) => any
}

/**
 * 选择器表单项，对 antd-mobile 的 Picker 简单封装
 */
export const DatePickerItem = React.memo(({ visible, setVisible, defaultValue, value, onChange }: DatePickerItemProps) => {
    return <DatePicker
        precision='second'
        value={value ? new Date(value) : undefined}
        defaultValue={defaultValue}
        onConfirm={v => { onChange?.(moment(v).format("yyyy-MM-DD HH:mm:ss")); setVisible(false); }}
        onClose={() => setVisible(false)}
        visible={visible}
    >
        {value => moment(value).format("yyyy-MM-DD HH:mm:ss")}
    </DatePicker>
});