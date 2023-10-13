import gql from "graphql-tag";

const SHOES_QUERY = gql`
    query Shoes {
        shoes {
            locationSold {name}
            locationPurchase {name}
            code
            priceSold
            pricePurchase
            dateSold
            datePurchase
            size {name}
            key
            model {
                key
                name
            }
            brand {
                key
                name
            }
            color {
                key
                name
            }
        }
    }
`;

export default SHOES_QUERY;