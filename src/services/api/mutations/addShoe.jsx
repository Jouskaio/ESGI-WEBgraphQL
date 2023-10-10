import gql from "graphql-tag";

const SHOES_ADD = gql`
    mutation AddShoe(
        $pricePurchase: Float!
        $priceSold: Float!
        $datePurchase: String!
        $dateSold: String!
        $locationPurchaseKey: String!
        $locationSoldKey: String!
        $sizeKey: String!
        $code: String!
    ) {
        addShoe(
            pricePurchase: $pricePurchase
            priceSold: $priceSold
            datePurchase: $datePurchase
            dateSold: $dateSold
            locationPurchaseKey: $locationPurchaseKey
            locationSoldKey: $locationSoldKey
            sizeKey: $sizeKey
            code: $code
        ) {
            locationSold {
                name
            }
            locationPurchase {
                name
            }
            code
            priceSold
            pricePurchase
            dateSold
            datePurchase
            size {
                name
            }
            key
        }
    }
`;


export default SHOES_ADD;