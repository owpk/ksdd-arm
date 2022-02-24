import {PageableQuery} from 'types/index'

export function getQueryParamsFromProps(query: PageableQuery): string {

    let parts: string[] = []

    if (query) {
        parts = [`limit=${query.to - query.from}`, `offset=${query.from}`]
        if (query.filter) {
            query.filter
                .map(x => `${x.key}=${x.value}`)
                .forEach(x => parts.push(x))
        }
    }

    return (parts.length === 0) ? '' : '?' + parts.join('&')
}
