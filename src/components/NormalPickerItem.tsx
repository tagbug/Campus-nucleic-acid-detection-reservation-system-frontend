import {Picker} from "antd-mobile";
import React from "react";
import {PickerColumn} from "antd-mobile/es/components/picker";

type NormalPickerItemProps = {
    visible: boolean,
    setVisible: (v: boolean) => any,
    columns: PickerColumn[],
    value?: string,
    onChange?: (value?: string) => any
}

/**
 * 选择器表单项，对 antd-mobile 的 Picker 简单封装
 */
export const NormalPickerItem = React.memo(({visible, setVisible, columns, value, onChange}: NormalPickerItemProps) => {
    return <Picker
        columns={columns}
        value={[value || null]}
        onConfirm={v => {
            onChange?.(v[0] || undefined);
            setVisible(false);
        }}
        onClose={() => setVisible(false)}
        visible={visible}
    >
        {() => value}
    </Picker>;
});