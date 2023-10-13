import gql from "graphql-tag";
import {useQuery} from "@apollo/client";

const MODELS_PAGINATION_QUERY = gql`
    query Models($start: Int!, $offset: Int!) {
        models(start: $start, offset: $offset) {
            name
            brand {
                name
            }
        }
    }
`;
export default MODELS_PAGINATION_QUERY;

export function ModelsPaginationQuery ({ children=null, start = null, offset = null }) {
    const { loading, error, data } = useQuery(MODELS_PAGINATION_QUERY, {
        variables: { start, offset },
    });

    if (loading) return null;
    if (error) return `Error! ${error}`;
    return children({data})
}
