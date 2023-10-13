import gql from "graphql-tag";

const MODELS_FROM_BRAND_QUERY = gql`
    query ModelsFromBrand($value: ID!) {
        modelsByBrand(brandId: $value) {
            key
            name
            brand {
                key
                name
            }
        }
    }
`;

export default MODELS_FROM_BRAND_QUERY;