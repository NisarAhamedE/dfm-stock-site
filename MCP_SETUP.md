# MCP (Model Context Protocol) Setup Guide

This guide will help you set up MCP servers in Cursor for enhanced AI capabilities with your DFM Stock Site project.

## What is MCP?

Model Context Protocol (MCP) is a standard that allows AI assistants to interact with external tools and data sources. It enables Cursor to access GitHub, Git repositories, filesystems, and web search capabilities.

## Installed MCP Servers

### 1. GitHub MCP Server
- **Package**: `github-mcp-custom`
- **Purpose**: Interact with GitHub repositories, issues, pull requests, and more
- **Features**:
  - Repository management
  - Issue and PR creation/management
  - Code review assistance
  - Repository analytics

### 2. Git MCP Server
- **Package**: `@modelcontextprotocol/server-git`
- **Purpose**: Local Git repository operations
- **Features**:
  - Commit history analysis
  - Branch management
  - File diff analysis
  - Git workflow assistance

### 3. Filesystem MCP Server
- **Package**: `@modelcontextprotocol/server-filesystem`
- **Purpose**: File and directory operations
- **Features**:
  - File reading and writing
  - Directory traversal
  - File search and analysis
  - Project structure understanding

### 4. Brave Search MCP Server
- **Package**: `@modelcontextprotocol/server-brave-search`
- **Purpose**: Web search capabilities
- **Features**:
  - Real-time web search
  - Current information retrieval
  - Research assistance

## Setup Instructions

### Step 1: Environment Variables

Create a `.env` file in your project root (if not already present) and add the following variables:

```env
# GitHub Personal Access Token
GITHUB_TOKEN=your_github_personal_access_token_here

# Brave Search API Key (optional)
BRAVE_API_KEY=your_brave_search_api_key_here
```

### Step 2: GitHub Personal Access Token

1. Go to [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Select the following scopes:
   - `repo` (Full control of private repositories)
   - `workflow` (Update GitHub Action workflows)
   - `write:packages` (Upload packages to GitHub Package Registry)
   - `delete:packages` (Delete packages from GitHub Package Registry)
   - `admin:org` (Full control of organizations and teams)
   - `admin:public_key` (Full control of user public keys)
   - `admin:repo_hook` (Full control of repository hooks)
   - `admin:org_hook` (Full control of organization hooks)
   - `gist` (Create gists)
   - `notifications` (Access notifications)
   - `user` (Update all user data)
   - `delete_repo` (Delete repositories)
   - `write:discussion` (Create and edit discussions)
   - `admin:enterprise` (Full control of enterprises)
   - `admin:gpg_key` (Full control of GPG keys)
4. Copy the generated token and add it to your `.env` file

### Step 3: Brave Search API Key (Optional)

1. Go to [Brave Search API](https://api.search.brave.com/)
2. Sign up for an API key
3. Add the API key to your `.env` file

### Step 4: Restart Cursor

After setting up the environment variables, restart Cursor to load the MCP configuration.

## Usage Examples

### GitHub Operations

```typescript
// Create a new repository
// The AI can now help you create GitHub repositories directly

// Create issues and pull requests
// The AI can create and manage GitHub issues and PRs

// Repository analysis
// The AI can analyze your repository structure and suggest improvements
```

### Git Operations

```bash
# The AI can now help with Git operations
git status
git add .
git commit -m "feat: add new stock tracking feature"
git push origin main
```

### Filesystem Operations

```typescript
// The AI can read and analyze your project files
// It can understand your codebase structure
// It can suggest file organization improvements
```

### Web Search

```typescript
// The AI can search for current information
// Useful for getting latest stock market data
// Research on DFM regulations and updates
```

## Configuration File

The MCP configuration is stored in `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "github": {
      "command": "github-mcp-custom",
      "args": [],
      "env": {
        "GITHUB_TOKEN": "${env:GITHUB_TOKEN}"
      }
    },
    "git": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-git"],
      "env": {}
    },
    "filesystem": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-filesystem"],
      "env": {}
    },
    "brave-search": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-brave-search"],
      "env": {
        "BRAVE_API_KEY": "${env:BRAVE_API_KEY}"
      }
    }
  }
}
```

## Troubleshooting

### Common Issues

1. **MCP servers not loading**
   - Ensure all packages are installed globally
   - Check that environment variables are set correctly
   - Restart Cursor after configuration changes

2. **GitHub token issues**
   - Verify the token has the correct permissions
   - Check if the token is expired
   - Ensure the token is properly set in the `.env` file

3. **Permission errors**
   - Run Cursor as administrator if needed
   - Check file permissions for the `.cursor` directory

### Verification Commands

```bash
# Check if MCP servers are installed
npm list -g github-mcp-custom
npm list -g @modelcontextprotocol/sdk

# Test GitHub MCP server
github-mcp-custom --help

# Check environment variables
echo $GITHUB_TOKEN
```

## Benefits for DFM Stock Site Project

With MCP enabled, you can now:

1. **Automated GitHub Management**
   - Create repositories automatically
   - Manage issues and pull requests
   - Set up CI/CD workflows

2. **Enhanced Development Workflow**
   - AI-assisted Git operations
   - Automated code reviews
   - Intelligent commit messages

3. **Real-time Information**
   - Get current DFM stock data
   - Research market trends
   - Stay updated with financial news

4. **Project Analysis**
   - AI can analyze your entire codebase
   - Suggest improvements and optimizations
   - Help with architecture decisions

## Next Steps

1. Set up your GitHub Personal Access Token
2. Configure environment variables
3. Restart Cursor
4. Test MCP functionality with simple commands
5. Explore advanced features as needed

## Security Notes

- Keep your GitHub token secure and never commit it to version control
- Use environment variables for sensitive information
- Regularly rotate your tokens
- Use the minimum required permissions for your tokens

## Additional Resources

- [Model Context Protocol Documentation](https://modelcontextprotocol.io/)
- [GitHub MCP Server](https://github.com/github/github-mcp-server)
- [Cursor MCP Integration](https://cursor.sh/docs/mcp)
- [GitHub Personal Access Tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) 