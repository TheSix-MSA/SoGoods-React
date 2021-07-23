export const BoardTypeConvert = (boardType) => {
    switch (boardType) {
        case 1:
            return "FREE";
        case 2:
            return "NOVELIST";
        case 3:
            return "NOTICE";
    }
}