import * as React from "react";
import { Button, SelectWithLabel } from "../factory";
import { ClipValidity, CLIP_VALIDITY } from "../../types";
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  defaultDataIdFromObject,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { relayStylePagination } from "@apollo/client/utilities";
import { ClipService } from "../../services/clip-service";

const cache = new InMemoryCache({
  dataIdFromObject(responseObject) {
    if ("nodeId" in responseObject) {
      return `${responseObject.nodeId}`;
    }

    return defaultDataIdFromObject(responseObject);
  },
  possibleTypes: { Node: ["Pastes"] }, // optional, but useful to specify supertype-subtype relationships
  typePolicies: {
    Query: {
      fields: {
        todosCollection: relayStylePagination(), // example of paginating a collection
        node: {
          read(_, { args, toReference }) {
            const ref = toReference({
              nodeId: args?.nodeId,
            });

            return ref;
          },
        },
      },
    },
  },
});

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_SUPABASE_URL,
});

const authLink = setContext(async (_, { headers }) => ({
  headers: {
    ...headers,
    apiKey: import.meta.env.VITE_SUPABASE_API_KEY,
    // Authorization: token ? `Bearer ${token}` : "",
  },
}));

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
});

const clipService = new ClipService({ apolloClient });

export const NewClipForm: React.FC = () => {
  const validityRef = React.useRef<ClipValidity>("10m");

  const onSubmit = React.useCallback(async () => {
    clipService.getClipById("1").then(clip => console.log(clip));
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <OptionsPanel validityRef={validityRef} />
      <ContentEditor />
      <ButtonsPanel onSubmit={onSubmit} onClear={() => console.log("Clear!")} />
    </div>
  );
};

type OptionsPanelProps = {
  validityRef: React.MutableRefObject<ClipValidity>;
};

const OptionsPanel: React.FC<OptionsPanelProps> = ({ validityRef }) => {
  const onValiditySelected = React.useCallback(
    (validity: ClipValidity) => {
      validityRef.current = validity;
    },
    [validityRef]
  );

  return (
    <div className="flex flex-row flex-wrap gap-4">
      <SelectWithLabel
        label="Validity"
        items={CLIP_VALIDITY}
        onItemSelect={onValiditySelected}
        initialValue={validityRef.current}
      />
      {/* <SelectWithLabel label="Privacy" /> */}
    </div>
  );
};

const ContentEditor: React.FC = () => (
  <div className="flex flex-col gap-2">
    <span className="text-secondary-text">Content</span>
    <textarea className="w-full h-[300px] p-2 tracking-wide rounded bg-secondary-bg text-primary-text focus:outline-accent focus:outline-1" />
  </div>
);

type ButtonsPanelProps = {
  onSubmit: () => void;
  onClear: () => void;
};

const ButtonsPanel: React.FC<ButtonsPanelProps> = ({ onSubmit, onClear }) => (
  <div className="flex flex-row flex-wrap justify-start gap-4">
    <Button variant="primary" onClick={onSubmit}>
      Save
    </Button>
    <Button variant="secondary" onClick={onClear}>
      Clear
    </Button>
  </div>
);
