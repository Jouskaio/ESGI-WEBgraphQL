import gql from "graphql-tag";

const SHOES_EDIT = gql`
    mutation {
        editShoe (
            pricePurchase: $pricePurchase
            priceSold: $priceSold
            datePurchase: $datePurchase
            dateSold: $dateSold
            locationPurchaseKey: $locationPurchaseKey
            locationSoldKey: $locationSoldKey
            sizeKey: $sizeKey
            code: $code
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