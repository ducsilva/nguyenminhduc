import React from 'react';

interface Props {
    name: string,
    onChange: (val?: number | any) => void,
    onBlur?: any,
    value: number,
    errors?: any,
}

export const AmountInput: React.FC<Props> = ({ name, onChange, onBlur, value, errors }: Props) => (
    <div>
        <input
            type="number"
            name={name}
            onChange={(e) => onChange(e?.target?.value)}
            onBlur={onBlur}
            value={value}
            placeholder="Amount"
            className="w-full p-2 border rounded-md"
        />
        {name && errors?.[name] && <div className="text-red-500 text-sm mt-1">{errors?.[name]?.message}</div>}
    </div>
);
