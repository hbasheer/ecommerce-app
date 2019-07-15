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
	  kuDescription
	  imageUrl
	}
  	
  }`

const GetCartQuery = gql`{
	getCart{
	  id
	  price
	  totalPrice
	  deliveryPrice
	  lineItems {
	    quantity
	    price
	    totalPrice
		    product{
	        id
	        arName
	        kuName
	        price
	        arDescription
	        kuDescription
	        imageUrl
	      }
	  }
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
	  totalPrice
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

const getCartLocal = gql`
  query getCartLocal {
    cart @client {
	  id
	  price
	  totalPrice
	  deliveryPrice
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
    }
  }
`;

const getCartCountLocal = gql`
  query getCartCountLocal {
    cartCount @client
  }
`;

const getCartItemIds = gql`
  query getCartItemIds {
    cartItemIds @client
  }
`;

export { 
	CategoriesQuery, 
	ProductsQuery,
	OrdersQuery,
	MeQuery,
	GetCartQuery,
	getCartCountLocal,
	getCartItemIds,
	getCartLocal
};