import gql from 'graphql-tag';
export const GET_REPOSITORIES = gql`
query SearchByRepoName($term: String!) {
  search(query: $term, type: REPOSITORY, first: 50) {
    repositoryCount
    edges {
      node {
        ... on Repository {
            id
            name
            description
            url
        }
      }
      cursor
    }
  }
}
`
export const GET_NEXT_REPOSITORIES = gql`
query SearchByRepoName($term: String!, $cursor: String!) {
  search(query: $term, type: REPOSITORY, first: 50, after: $cursor) {
    repositoryCount
    edges {
      node {
        ... on Repository {
            id
            name
            description
            url
        }
      }
      cursor
    }
  }
}
`