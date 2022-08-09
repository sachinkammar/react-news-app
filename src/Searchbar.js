import { useState } from "react";

function SearchBar({ searchArticles, defaultSearchText }) {
    const [searchText, setSearchText] = useState(defaultSearchText);
    const [showError, setShowError] = useState(false);

    const handleChange = event => {
        setSearchText(event.target.value);
        setShowError(false);
    };

    const handleSubmit = event => {
        event.preventDefault();
        if(searchText) {
            searchArticles(searchText);
        } else {
            setShowError(true);
        }
    };

    return (
        <>
            <div className="search-wrapper" style={{backgroundColor: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',margin: '5%'}}>
                <h2>News Lister</h2>
                <form onSubmit={handleSubmit} style={{ margin: "24px 0", width:'100%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <div>Enter search text</div>
                    <input className ="searchbar"
                        autoFocus
                        type="text"
                        name="searchText"
                        value={searchText}
                        onChange={handleChange}
                        style={{maxWidth:300, margin: "0 8px", border:'1px solid'}}
                    />
                    <button className="button" type="submit">Search</button>
                </form>
                {showError && <div style={{textAlifn:'center', color:'red'}}>You must enter a search text.</div>}
            </div>
        </>
    );
}

export default SearchBar;