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

const MeQuery = gql`{
	me{
	  id
	  fullname
	  email
	  mobile
	  address
	  updatedAt
	  createdAt
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

export { 
	CategoriesQuery, 
	ProductsQuery,
	OrdersQuery,
	MeQuery 
};