import gql from "graphql-tag";

const CategoriesQuery = gql`{
	categories {
	  id
	  slug
	  arName
	  kuName
	}
}`

const ProductsQuery = gql`
  query products($id: ID!) {
	products(categoryId: $id){
	  id
	  arName
	  kuName
	  price
	  arDescription
	  imageUrl
	}
  	
  }`

export { CategoriesQuery, ProductsQuery };