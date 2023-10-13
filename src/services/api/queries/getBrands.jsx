import gql from "graphql-tag";

const BRANDS_QUERY = gql`
    query Models {
        brands {
            key
            name
        }
    }
`;

export default BRANDS_QUERY;