import {OffsetPageable} from "../index";

export function calculateParts(totalPages: number, pageSize: number): OffsetPageable[] {
    return Array.from({length: totalPages}, (_, i) => {
        let lastFrom = (i === 0) ? 0 : i * pageSize;
        let lastTo = lastFrom + pageSize;
        return {from: lastFrom, to: lastTo} as OffsetPageable
    });
}
