import gql from "graphql-tag";

const SIZES_QUERY = gql`
    query Shoes {
        sizes {
            key
            name
        }
    }
`;

export default SIZES_QUERY;