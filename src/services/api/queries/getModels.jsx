import gql from "graphql-tag";

const MODELS_QUERY = gql`
    query Models {
        models {
            key
            name
        }
    }
`;

export default MODELS_QUERY;