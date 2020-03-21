export default {
  name: "AmbitionBox - Staging",
  environments: [
    {
      name: "Staging 1",
      domain: "staging1.ambitionbox.infoedge.com",
      projects: [
        {
          name: "server",
          path: "/Users/abhisheksoni/github/server",
          build: "yarn build",
          repo: "https://github.com/subramanya92/server"
        },
        {
          name: "ambox_server",
          path: "/Users/abhisheksoni/github/ambox_server",
          repo: "https://github.com/subramanya92/ambox_server"
        },
        {
          name: "ambox_client",
          path: "/Users/abhisheksoni/github/ambox_client",
          repo: "https://github.com/subramanya92/ambox_client",
          build: "yarn build"
        }
      ]
    },
    {
      name: "Staging 2",
      domain: "staging1.ambitionbox.infoedge.com",
      projects: [
        {
          name: "server",
          path: "/Users/abhisheksoni/github/server",
          build: "yarn build"
        },
        {
          name: "ambox_server",
          path: "/Users/abhisheksoni/github/ambox_server"
        }
      ]
    }
  ]
};
