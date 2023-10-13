import gql from "graphql-tag";

const SHOE_DELETE = gql`
    mutation DeleteShoe(
        $key: ID!
    ) {
        deleteShoe (
            key: $key
        ) {
            key
        }
    }
`;


export default SHOE_DELETE;