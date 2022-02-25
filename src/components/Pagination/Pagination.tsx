const Pagination = ({length, setPage}: {
    length : number
    setPage: (page: number) => void
}) => {

    const paginationArray: number[] =
        Array.from({length: length}, (_, i) => i)

    return (
        <>
            <nav aria-label="Page navigation">
                <ul className="pagination">
                    {paginationArray.map((item) => (
                        <li className="page-item">
                            <a onClick={() => setPage(item)}
                               className="page-link">{item + 1}</a>
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    );
};

export default Pagination;
