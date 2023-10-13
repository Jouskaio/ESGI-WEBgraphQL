import gql from "graphql-tag";

const SHOES_ADD = gql`
    mutation AddShoe(
        $pricePurchase: Float!
        $priceSold: Float!
        $datePurchase: String!
        $dateSold: String!
        $code: String!
        $sizeKey: ID!
        $locationPurchaseKey: ID!
        $locationSoldKey: ID!
        $brandKey: ID!
        $modelKey: ID!

    ) {
        addShoe(
            pricePurchase: $pricePurchase
            priceSold: $priceSold
            datePurchase: $datePurchase
            dateSold: $dateSold
            code: $code
            size_key: $sizeKey
            locationPurchase_key: $locationPurchaseKey
            locationSold_key: $locationSoldKey
            brand_key: $brandKey
            model_key: $modelKey
            color_key: 1
        ) {
            key
            pricePurchase
            priceSold
            datePurchase
            dateSold
            code
            size {
                name
            }
            locationPurchase {
                name
            }
            locationSold {
                name
            }
        }
    }
`;


export default SHOES_ADD;