const Pagination = ({currentPage, pages, setPage, callback}: {
    currentPage: number
    pages: string[]
    setPage: (page: number) => void
    callback: (query: string) => void
}) => {

    const paginationArray: number[] =
        Array.from({length: pages.length}, (_, i) => i + 1)

    return (
        <>
            <nav aria-label="Page navigation">
                <ul className="pagination">
                    {paginationArray.map((item) => (
                        <li className="page-item">
                            <a onClick={() => callback.call(this, pages[item])}
                               className="page-link">{item}</a>
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    );
};

export default Pagination;
