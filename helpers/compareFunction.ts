export const compare = (
    a: { text: string; niceClass: number; importance: number },
    b: { text: string; niceClass: number; importance: number }
) => {
    if (a.importance > b.importance) {
        return 1;
    }
    if (a.importance < b.importance) {
        return -1;
    }
    return 0;
};
