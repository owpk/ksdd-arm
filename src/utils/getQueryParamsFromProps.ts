import {OffsetPageableQuery} from 'types/index'

export function getQueryParamsFromProps(query: OffsetPageableQuery): string {

    let parts: string[] = []

    if (query) {
        parts = [`from=${query.from}`, `to=${query.to}`]
        if (query.filter) {
            query.filter
                .map(x => `${x.key}=${x.value}`)
                .forEach(x => parts.push(x))
        }
    }

    return (parts.length === 0) ? '' : '?' + parts.join('&')
}
