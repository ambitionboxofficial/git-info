export default {
  name: "iqra - Staging",
  environments: [
    {
      name: "Staging 1",
      domain: "staging1.iqra.com",
      projects: [
        {
          name: "server",
          path: "PATH",
          repo: "URL"
        },
        {
          name: "iqra_server",
          path: "PATH",
          repo: "URL"
        },
        {
          name: "iqra_client",
          path: "PATH",
          repo: "URL",
          build: "yarn build"
        }
      ]
    }
  ]
};
