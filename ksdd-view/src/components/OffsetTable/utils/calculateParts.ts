import {OffsetPageable} from "../index";

export function calculateParts(totalDataSize: number,
                               pageSize: number,
                               filter?: { key: string, value: string }[]
): OffsetPageable[] {
    return Array.from({length: totalDataSize}, (_, i) => {
        let lastFrom = (i === 0) ? 0 : i * pageSize;
        let lastTo = lastFrom + pageSize;
        return {from: lastFrom, to: lastTo, filter: filter} as OffsetPageable
    });
}
