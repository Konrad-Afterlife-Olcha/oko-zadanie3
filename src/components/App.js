import React, { useState, useEffect } from 'react';
import { GraphQLClient, request } from 'graphql-request';
import SearchBox from './SearchBox'
import SearchResults from './SearchResults'
import { PersonalAccessToken } from './personalAccessToken';
import { GET_REPOSITORIES, GET_NEXT_REPOSITORIES } from '../queries/queries';
import './App.css'

const App = () => {
  const [term, setTerm] = useState("")
  const [cursor, setCursor] = useState(null)
  const [nextItems, setNextItems] = useState(false)
  const [actualData, setActualData] = useState([])
  const [reposCount, setReposCount] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const [pageNumber, setPageNumber] = useState(0)
  const variables = { term: `${term} in:name` }
  const nextVariables = { term: `${term} in:name`, cursor: `${cursor}` }

  const resetSearchingData = () => {
    setCursor(null)
    setNextItems(false)
    setActualData([])
    setReposCount(0)
    setPageNumber(0)
    setHasMore(true)
  }

  useEffect(() => {
    const getQuery = async () => {
      const endpoint = 'https://api.github.com/graphql'

      const graphQLClient = new GraphQLClient(endpoint, {
        headers: {
          authorization: `bearer ${PersonalAccessToken}`,
          'Content-Type': 'application/json',
        },
      })
      if (nextItems) {
        graphQLClient.request(GET_NEXT_REPOSITORIES, nextVariables).then((data) => {
          setActualData([...actualData, ...data.search.edges])
          setReposCount(data.search.repositoryCount)
          setHasMore(data.search.edges.length > 0)
          if (data.search.edges[data.search.edges.length - 1]) {
            setCursor(data.search.edges[data.search.edges.length - 1].cursor)
          }
        }
        )
      } else {
        graphQLClient.request(GET_REPOSITORIES, variables).then((data) => {
          setActualData(data.search.edges)
          setReposCount(data.search.repositoryCount)
          setHasMore(data.search.edges.length > 0)
          if (data.search.edges.length && data.search.edges[data.search.edges.length - 1]) {
            setNextItems(true)
            setCursor(data.search.edges[data.search.edges.length - 1].cursor)
          }
        })
      }
    }
    getQuery()
  }, [term, pageNumber]
  )

  const onFormSubmit = (searchTerm) => {
    setTerm(searchTerm)
  }

  return (
    <div className="repo-search">
      <h2 className="ui header">Wyszukiwanie repozytorium</h2>
      <SearchBox onFormSubmit={onFormSubmit} resetSearchingData={resetSearchingData} />
      <SearchResults
        actualData={actualData}
        term={term}
        reposCount={reposCount}
        hasMore={hasMore}
        setHasMore={setHasMore}
        setPageNumber={setPageNumber}
        pageNumber={pageNumber}
      />
    </div>
  )

};
export default App;