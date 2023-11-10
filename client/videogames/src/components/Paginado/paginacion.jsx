

export default function Paginacion ({cardPerPage,totalCards,paginate,currentPage}){

    const pageNumbers=[];

    for(let i = 1 ; i <= Math.ceil(totalCards / cardPerPage) ; i++){
        pageNumbers.push(i)
    }
    return(
        <div>
        <ul>
          {pageNumbers.length > 1 &&
            pageNumbers.map((p, i) =>
              p === currentPage ? (
                <li key={i}>
                  <button onClick={() => paginate(p)}>
                    {p}
                  </button>
                </li>
              ) : (
                <li key={i}>
                  <button  onClick={() => paginate(p)}>
                    {p}
                  </button>
                </li>
              )
            )}
        </ul>
      </div>

    )
}