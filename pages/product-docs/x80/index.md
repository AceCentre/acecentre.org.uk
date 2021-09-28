---
title: "Product documentation"
subtitle: "How to use X80"
---

You can put whatever you want here

## Sub headings

```js
const temp = "You can even write code snippets!";
```

- Bullet lists
- Are possible
  - You can even have sub lists

[Links are possible as normal](/product-docs/x80/another-page)

{/\*
The content below WILL NOT be rendered to the users

It adds some meta data to the page and renders the content
in the template.

All you need to really worry about it filling in the
title and subtitle for any pages you create.
\*/}

export const meta = {
title: "Product documentation",
subtitle: "How to use X80",
};

import MarkdownLayout from "../../../components/markdown-layout";
import { withGlobalProps } from "../../../lib/global-props/inject";

export default ({ children }) => (
<MarkdownLayout {...meta}>{children}</MarkdownLayout>
);

export const getStaticProps = withGlobalProps(async () => {
return {
props: {
seo: {
title: meta.title,
description: meta.subtitle,
},
},
};
});
