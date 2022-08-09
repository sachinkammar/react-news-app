import { useState, useEffect } from "react";
import './App.css';
import { getArticles } from "./api";
import Articles from './Articles';
import Searchbar from './Searchbar';
import ReactPaginate from 'react-paginate';

function App()  {
  const [articles, setArticles] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setCurrentPage(0)
  }, [searchText])

  const searchArticles = async (query, page=1, size=10) => {
    try {
      setIsLoading(true);
      const res = await getArticles(query, page, size);
      const response = res.response;
      console.log("response", response);
      setArticles(response.results);
      setSearchText(query);
      setPageCount(response.pages > 3000 ? 3500 : response.pages); //guarding api limit
      setIsLoading(false);
    } catch (error) {
      setArticles([]);
      setIsLoading(false);
    }
  };

  const onPageChange = (e) => {
    searchArticles(searchText, e.selected+1, pageSize);
    setCurrentPage(e.selected)
  }
    
  return (
    <>
      <div>
        <Searchbar defaultSearchText={searchText} searchArticles={(searchQuery)=>searchArticles(searchQuery, 1, pageSize)} key={searchText} />
      </div>
      <div style={{padding:16}}>
        {isLoading && (
          <p style={{ textAlign: "center" }}>Searching for articles...</p>
        )}
      </div>
      {!isLoading && searchText && <div style={{padding:16}}>
        {<h2>Results for {searchText}</h2>}
        {articles.length > 0 ? <div style={{padding:16, backgroundColor:'whitesmoke'}}>    
          <Articles articles={articles} searchArticles={searchArticles} /> 
          <div style={{display: 'flex', justifyContent: 'flex-end'}}>
            <ReactPaginate
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakLabel="..."
              breakClassName="page-item"
              breakLinkClassName="page-link"
              containerClassName="pagination"
              activeClassName="active"
              nextLabel="next >"
              pageCount={pageCount}
              onPageChange={onPageChange}
              pageRangeDisplayed={5}
              forcePage={currentPage}
              marginPagesDisplayed={2}
              previousLabel="< previous"
              renderOnZeroPageCount={null}
            />
          </div>
        </div>:
        <div style={{textAlign:'center', padding:16}}>No article found..</div>}
      </div>}
    </>
  );
}

export default App;