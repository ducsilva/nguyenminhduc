import { IToken } from "types";

export const calculateRate = (arr: IToken[], name: string) => {
  if (arr?.length && name) {
    const arrTmp = arr?.filter((item: IToken) => item?.currency === name);

    return arrTmp?.[0]?.price || 0;
  }

  return 0;
};
