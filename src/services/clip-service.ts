import type { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { GET_CLIP_BY_ID } from "../graphql/queries";
import type { IClip } from "../types";

type ClipServiceProps = {
  apolloClient: ApolloClient<NormalizedCacheObject>;
};

export class ClipService {
  private apolloClient: ApolloClient<NormalizedCacheObject>;

  constructor(props: ClipServiceProps) {
    this.apolloClient = props.apolloClient;
  }

  public createClip() {}

  public updateClip() {}

  public async getClipById(id: string): Promise<IClip | null> {
    return this.apolloClient
      .query({
        query: GET_CLIP_BY_ID,
        variables: {
          id: {
            eq: id,
          },
        },
      })
      .then(result => apolloGetClipQueryResultAdapter(result.data));
  }

  public deleteClip() {}
}

type GetClipsQueryResult = {
  __typename: "Query";
  clipsCollection?: {
    __typename: "clipsConnection";
    edges: Array<{
      __typename: "clipsEdge";
      node: {
        __typename: "clips";
        id: string;
        content: string;
        created_at: string;
      };
    }>;
  } | null;
};

const apolloGetClipQueryResultAdapter = (
  data: GetClipsQueryResult
): IClip | null => {
  if (
    !data.clipsCollection ||
    !data.clipsCollection.edges ||
    data.clipsCollection.edges.length === 0
  ) {
    return null;
  }

  // Return the first element of the array since each entry in the DB has a unique ID (primary key).
  const clipData = data.clipsCollection.edges[0].node;

  return {
    content: clipData.content,
    id: clipData.id,
    createdAt: clipData.created_at,
    // validity: clipData.validity,
    // slug: clipData.slug
  };
};
