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
        $modelKey: ID!,
        $brandKey: ID!,
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
            model_key: $modelKey,
            brand_key: $brandKey,
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
            brand {
                name
            }
            model {
                name
            }
        }
    }
`;


export default SHOES_ADD;