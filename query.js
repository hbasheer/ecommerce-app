import gql from "graphql-tag";

const CategoriesQuery = gql`{
    categories {
      id
      slug
      arName
      kuName
    }
  }`

export { CategoriesQuery };