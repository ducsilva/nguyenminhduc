import { calculateRate, swapFormSchema } from "utils";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTokens } from "hooks";
import { useCallback, useState } from "react";
import { CurrencyDropdown, AmountInput, LoadingIndicator } from "components";

export const SwapForm = () => {
    const { isLoading, tokens } = useTokens();
    const [swapData, setSwapData] = useState('')
    const {
        handleSubmit,
        control,
        watch,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(swapFormSchema),
    });

    const fromCurrency = watch("fromCurrency");
    const toCurrency = watch("toCurrency");
    const amount = watch("amount");

    const onSubmit = (data: any) => {
        setSwapData(`You can swap: ${amount} ${fromCurrency} to ${calculateEquivalent()} ${toCurrency}`)
    };

    const calculateEquivalent = useCallback(() => {
        if (fromCurrency && toCurrency && amount) {
            if (
                calculateRate(tokens, toCurrency) &&
                calculateRate(tokens, fromCurrency)
            ) {
                const toPrice = calculateRate(tokens, toCurrency);
                const fromPrice = calculateRate(tokens, fromCurrency);
                return (amount * (toPrice / fromPrice)).toFixed(6);
            }
        }
        return 0;
    }, [amount, fromCurrency, toCurrency, tokens]);

    return (
        <div className="min-w-96 mx-auto">
            {isLoading && <LoadingIndicator />}
            <div className="text-gray-700 text-3xl my-2 text-center">
                Swap Form
            </div>
            <div className="p-6 bg-white rounded-xl shadow-md space-y-4">
                {fromCurrency && toCurrency && amount && (
                    <div className="text-green-700">
                        {swapData}
                    </div>
                )}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <Controller
                        name="fromCurrency"
                        control={control}
                        render={({ field }) => (
                            <CurrencyDropdown {...field} tokens={tokens} errors={errors} />
                        )}
                    />
                    <Controller
                        name="toCurrency"
                        control={control}
                        render={({ field }) => (
                            <CurrencyDropdown {...field} tokens={tokens} errors={errors} />
                        )}
                    />
                    <Controller
                        name="amount"
                        control={control}
                        render={({ field }) => <AmountInput {...field} errors={errors} />}
                    />
                    {fromCurrency && toCurrency && amount && (
                        <div className="text-gray-700">
                            {`1 ${fromCurrency} = ${(
                                calculateRate(tokens, toCurrency) /
                                calculateRate(tokens, fromCurrency)
                            )?.toFixed(6)} ${toCurrency}`}
                        </div>
                    )}
                    <button
                        disabled={isSubmitting}
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-500 text-white rounded-md disabled:bg-gray-400"
                    >
                        Swap
                    </button>
                </form>

            </div>
        </div>
    );
};
