import gql from "graphql-tag";

const SHOE_QUERY = gql`
    query Shoe ($value: ID!) {
        shoe(key: $value) {
            locationSold {
                name
            }
            locationPurchase {
                key
                name
            }
            code
            priceSold
            pricePurchase
            dateSold
            datePurchase
            size {
                key
                name
            }
            key
            model {
                key
                name
            }
            brand {
                key
                name
            }
        }
    }
`;

export default SHOE_QUERY;