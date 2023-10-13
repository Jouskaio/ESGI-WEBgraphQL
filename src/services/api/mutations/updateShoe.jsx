import gql from "graphql-tag";

const SHOES_EDIT = gql`
    mutation UpdateShoe(
        $key: ID!
        $pricePurchase: Float!
        $priceSold: Float!
        $datePurchase: String!
        $dateSold: String!
        $code: String!
        $sizeKey: ID!
        $locationPurchaseKey: ID!
        $locationSoldKey: ID!
    ) {
        updateShoe (
            key: $key
            pricePurchase: $pricePurchase
            priceSold: $priceSold
            datePurchase: $datePurchase
            dateSold: $dateSold
            code: $code
            size_key: $sizeKey
            locationPurchase_key: $locationPurchaseKey
            locationSold_key: $locationSoldKey
        ) {
            locationSold {name}
            locationPurchase {name}
            code
            priceSold
            pricePurchase
            dateSold
            datePurchase
            size {name}
            key
        }
    }
`;

export default SHOES_EDIT;