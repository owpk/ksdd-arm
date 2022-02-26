const Pagination = ({totalPages, localPages, setLocalPage}: {
    totalPages: number
    localPages: number
    setLocalPage: (page: number) => void
}) => {

    const paginationArray: number[] =
        Array.from({length: localPages}, (_, i) => i)

    return (
        <>
            <nav aria-label="Page navigation">
                <ul className="pagination">
                    {paginationArray.map((item) => (
                        <li className="page-item">
                            <a onClick={() => setLocalPage(item)}
                               className="page-link">{item + 1}</a>
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    );
};

export default Pagination;
