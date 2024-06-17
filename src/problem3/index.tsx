/*
    List out the computational inefficiencies and anti-patterns found in the code block below:
    - Missing import hooks: useWalletBalances, usePrices, useMemo, component: WalletRow and CSS module: classes
    - The getPriority function takes a string type string instead of any
    - Filter and sort of the sortedBalances function incorrect
    - The FormattedBalances returns in the format: Balance.amount.toFixed() but is missing parameters in the toFixed() function
    - rows must map from the formattedBalances array
*/

// Adjust code
import React, { useMemo } from 'react';
import { BoxProps } from '@mui/material/Box';
import useWalletBalances from './useWalletBalances'; // Assuming these hooks are defined elsewhere
import usePrices from './usePrices'; // Assuming these hooks are defined elsewhere
import WalletRow from './WalletRow'; // Assuming this component is defined elsewhere
import classes from './WalletPage.module.css'; // Assuming the CSS module is defined elsewhere

interface WalletBalance {
    currency: string;
    amount: number;
    blockchain: string;
}

interface FormattedWalletBalance extends WalletBalance {
    formatted: string;
}

interface Props extends BoxProps { }

const WalletPage: React.FC<Props> = (props: Props) => {
    const { children, ...rest } = props;
    const balances = useWalletBalances();
    const prices = usePrices();

    const getPriority = (blockchain: string): number => {
        switch (blockchain) {
            case 'Osmosis':
                return 100;
            case 'Ethereum':
                return 50;
            case 'Arbitrum':
                return 30;
            case 'Zilliqa':
                return 20;
            case 'Neo':
                return 20;
            default:
                return -99;
        }
    };

    const sortedBalances = useMemo(() => {
        return balances
            .filter((balance: WalletBalance) => {
                const balancePriority = getPriority(balance.blockchain);
                return balancePriority > -99 && balance.amount > 0;
            })
            .sort((lhs: WalletBalance, rhs: WalletBalance) => {
                const leftPriority = getPriority(lhs.blockchain);
                const rightPriority = getPriority(rhs.blockchain);
                return rightPriority - leftPriority;
            });
    }, [balances]);

    const formattedBalances = sortedBalances.map((balance: WalletBalance) => ({
        ...balance,
        formatted: balance.amount.toFixed(2)
    }));

    const rows = formattedBalances.map((balance: FormattedWalletBalance, index: number) => {
        const usdValue = prices[balance.currency] * balance.amount;
        return (
            <WalletRow
                className={classes.row}
                key={index}
                amount={balance.amount}
                usdValue={usdValue}
                formattedAmount={balance.formatted}
            />
        );
    });

    return (
        <div {...rest}>
            {rows}
        </div>
    );
};

export default WalletPage;
