import gql from "graphql-tag";

const LOCATIONS_QUERY = gql`
    query Locations {
        locations {
            key
            name
        }
    }
`;

export default LOCATIONS_QUERY;