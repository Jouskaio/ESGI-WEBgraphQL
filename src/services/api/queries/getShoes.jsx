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
        }
    }
`;

export default SHOES_QUERY;