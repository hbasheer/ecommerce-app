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

const SingInMutation = gql`
  mutation signin($email: String!, $password: String!) {
    signin(attributes: {email: $email , password: $password}){
	  user {
	    id
	    email
	    fullname
	    address
	    createdAt
	    token 
	  }
    }
  }
`

export { CategoriesQuery, ProductsQuery, SingInMutation };