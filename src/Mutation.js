import gql from "graphql-tag";

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

const UpdateAccountMutation = gql`
  mutation UpdateAccount($email: String!, $fullname: String!, $address: String!, $mobile: Int! ) {
    updateAccount(attributes: {email: $email, fullname: $fullname , mobile: $mobile, address: $address}){
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

const CartRemoveProductMutation =gql`
	mutation cartRemoveProduct($productId: ID! ) { 
	  cartRemoveProduct(productId: $productId){
	    cart{
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
	  }
	}
`

const CartAddProductMutation =gql`
	mutation cartAddProduct($productId: ID! ) { 
	  cartAddProduct(productId: $productId){
	    cart{
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
	  }
	}
`

const CartDeleteProductMutation =gql`
	mutation cartDeleteProduct($productId: ID! ) { 
	  cartDeleteProduct(productId: $productId){
	    cart{
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
	  }
	}
`

const CreateOrderMutation =gql`
	mutation createOrder($lat: Float!, $lng: Float!, $address: String!, $mobile: Int!, $detail: String!) {
	  createOrder(attributes: {lat: $lat, lng: $lng, address: $address, mobile: $mobile, detail: $detail} ){
		order{
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
		}
	  }
	}
`

export { 
	SingInMutation, 
	ResetPasswordMutation, 
	SignUpMutation,
	UpdateAccountMutation,
	CartAddProductMutation,
	CartRemoveProductMutation,
	CartDeleteProductMutation,
	CreateOrderMutation
};