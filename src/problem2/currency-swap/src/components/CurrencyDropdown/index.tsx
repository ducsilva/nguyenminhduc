import React from 'react';
import { IToken } from 'types';

interface Props {
    name: string;
    onChange: (val?: string | any) => void;
    onBlur?: any;
    value: string;
    tokens: IToken[];
    errors?: any;
}

export const CurrencyDropdown: React.FC<Props> = ({ name, onChange, onBlur, value, tokens, errors }) => (
    <div>
        <select
            name={name}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            className="w-full p-2 border rounded-md"
        >
            <option value="" label="Select currency" />
            {tokens.map(token => (
                <option key={token?.currency} value={token?.currency}>
                    {token?.currency?.toUpperCase()}
                </option>
            ))}
        </select>
        {errors && errors[name] && <div className="text-red-500 text-sm mt-1">{errors[name].message}</div>}
    </div>
);
