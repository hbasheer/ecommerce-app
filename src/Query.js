import gql from "graphql-tag";

const CategoriesQuery = gql`{
	categories {
	  id
	  slug
	  arName
	  kuName
	  imageUrl
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

const OrdersQuery = gql`{
	orders{
	  id
	  price
	  deliveryPrice
	  address
	  status
	  createdAt
	  user {
	  	fullname
	  }
	  items {
	    price
	    quantity
	    product {
          id
          arName
          kuName
          price
          arDescription
          imageUrl
	    }
	  }
	  user{
        fullname
      }
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

const SignUpMutation = gql`
  mutation signup($email: String!, $password: String!, $passwordConfirmation: String!  $fullname: String!, $address: String!, $terms: Boolean!, $mobile: Int! ) {
    signup(attributes: {email: $email, password: $password, passwordConfirmation: $passwordConfirmation, fullname: $fullname , mobile: $mobile, address: $address, terms: $terms}){
	  user {
	    id
	    email
	    fullname
	    address
	    mobile
	    createdAt
	    token 
	  }
    }
  }
`

const ResetPasswordMutation = gql`
  mutation resetPassword($email: String!) {
    resetPassword(email: $email){
      email
      info
    }
  }
`

const GET_CART_ITEMS = gql`
  query GetCartItems {
    cartItems @client
  }
`;

const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
    cartItems: [ID!]!
  }

  extend type Launch {
    isInCart: Boolean!
  }

  extend type Mutation {
    addOrRemoveFromCart(id: ID!): [Launch]
  }
`;

const resolvers = {};

export { 
	CategoriesQuery, 
	ProductsQuery,
	OrdersQuery, 
	SingInMutation, 
	GET_CART_ITEMS, 
	typeDefs, 
	ResetPasswordMutation, 
	SignUpMutation 
};