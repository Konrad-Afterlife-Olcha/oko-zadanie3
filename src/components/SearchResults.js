import { useCallback, useRef } from "react";

const SearchResults = ({actualData, reposCount, term, hasMore,pageNumber, setPageNumber, setHasMore}) => {
    const observer = useRef();
    const lastElementRef = useCallback(node => {
        if(observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting && hasMore) {
                setPageNumber(pageNumber => pageNumber + 1)
            }
        })
        if(node) observer.current.observe(node)
    },[hasMore])
        return (
            <div className="repo-search__results">

                    <div className="repo-search__results-header">
                        <h4 className="ui header">Wyniki wyszukiwania dla frazy: {term}</h4>
                        <h5 className="ui header">Znaleziono {reposCount} wyników</h5>
                    </div>

                <div>

                    {actualData.map((element, index) => {
                        if(actualData.length === index + 1 ) {
                            return <div className="ui card repo-search__card" ref={lastElementRef} key={index}>
                            <div className="content">
                                <div className="header">{element.node.name}</div>
                            </div>
                            <div className="content">
                                <h4 className="ui sub header">{element.node.description}</h4>
                            </div>
                            <div className="extra content">
                                <button className="ui button"><a href={element.node.url} target="_blank" rel="noreferrer">Github link</a></button>
                            </div>
                        </div>
                            // <div ref={lastElementRef} key={index}>{index+1 + "." + element.node.name}<br/>
                            // {element.cursor}
                            // </div>
                            
                        } else {
                            return <div className="ui card repo-search__card" key={index}>
                                <div className="content">
                                    <div className="header">{element.node.name}</div>
                                </div>
                                <div className="content">
                                    <h4 className="ui sub header">{element.node.description}</h4>
                                </div>
                                <div className="extra content">
                                    <button className="ui button"><a href={element.node.url} target="_blank" rel="noreferrer">Github link</a></button>
                                </div>
                            </div>
                        }
                        
                    })}
                </div>
                {/* <button onClick={() => console.log(hasMore)}>No more items</button> */}
            </div>
        )
}
export default SearchResults