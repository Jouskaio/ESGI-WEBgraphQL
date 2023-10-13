import gql from "graphql-tag";

const COLORS_QUERY = gql`
    query Locations {
        colors {
            key
            name
        }
    }
`;

export default COLORS_QUERY;