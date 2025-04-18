# Open Source Fridays Website

This website showcases episodes from GitHub's "Open Source Fridays" YouTube show. It's built with [Astro](https://astro.build/) and designed according to the [GitHub Brand Toolkit](https://brand.github.com/).

## 🚀 Features

- Responsive design based on GitHub's brand guidelines
- Automatic YouTube episode fetching and content generation
- GitHub Actions for continuous deployment to GitHub Pages
- Daily checks for new episodes with automated pull requests

## 🚀 Project Structure

The website is organized as follows:

```text
├── .github/workflows/          # GitHub Actions workflows
│   ├── check-for-new-episodes.yml  # Daily checks for new episodes
│   └── deploy.yml              # GitHub Pages deployment
├── public/                     # Static assets
├── scripts/                    # Utility scripts
│   └── fetch-youtube.js        # YouTube API data fetcher
├── src/
│   ├── components/             # UI components
│   ├── content/
│   │   ├── config.ts           # Content collection config
│   │   ├── blog/               # Original blog content
│   │   └── episodes/           # Episode markdown files
│   ├── layouts/                # Page layouts
│   │   ├── BlogPost.astro      # Blog post layout
│   │   └── Episode.astro       # Episode layout
│   ├── pages/                  # Website pages
│   │   ├── episodes/           # Episode routes
│   │   └── index.astro         # Homepage
│   └── styles/                 # CSS styles
│       └── global.css          # Global styles with GitHub branding
├── astro.config.mjs            # Astro configuration
├── package.json                # Dependencies and scripts
└── tsconfig.json               # TypeScript configuration
```

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 📺 How It Works

The website automatically fetches videos from GitHub's "Open Source Fridays" YouTube playlist and generates content pages for each episode:

### YouTube Integration

1. The `fetch-youtube.js` script in the `scripts` directory connects to the YouTube API
2. It retrieves metadata for each video (title, description, thumbnail, publication date)
3. For each video, a markdown file is created in `src/content/episodes/`
4. The Astro build process converts these markdown files into pages

### Automated Updates

A GitHub Action runs daily to check for new episodes:

1. The workflow defined in `.github/workflows/check-for-new-episodes.yml` runs on a schedule
2. It executes the `fetch-youtube.js` script to look for new videos
3. If new episodes are found, a pull request is automatically created
4. After merging, the site is rebuilt with the new content

## 🚀 Deployment Steps

To deploy this website to GitHub Pages:

1. **Push the code to a GitHub repository**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Set up your YouTube API key**
   - Create an API key in the [Google Developer Console](https://console.developers.google.com/)
   - Enable the YouTube Data API v3
   - Add the API key as a repository secret:
     - Go to your GitHub repository → Settings → Secrets and variables → Actions
     - Create a new repository secret named `YOUTUBE_API_KEY` with your API key

3. **Configure GitHub Pages**
   - Go to your repository settings
   - Navigate to Pages → Build and deployment
   - Set Source to "GitHub Actions"

4. **Run the initial episode fetch**
   - Go to the Actions tab in your repository
   - Select the "Check for New Episodes" workflow
   - Click "Run workflow" to manually trigger it
   - Review and merge the resulting pull request

5. **Deploy the website**
   - The deployment workflow (`deploy.yml`) will automatically run when changes are pushed to the main branch
   - This workflow uses the `withastro/action` to build the site
   - Your site will be accessible at `https://{username}.github.io/{repository}/`

## 🔄 Customization

To customize the website:

- Update site information in `src/consts.ts`
- Modify branding colors in `src/styles/global.css`
- Edit page layouts in `src/layouts/` and components in `src/components/`
- Adjust content collection schemas in `src/content/config.ts`

## Troubleshooting Deployment

If you encounter issues with deployment:

1. **Check GitHub Actions logs** in the Actions tab of your repository
2. **Verify GitHub Pages settings** are correctly configured
3. **Ensure your YouTube API key** is properly set up as a repository secret
4. **Check the Astro configuration** in `astro.config.mjs` to ensure `site` and `base` are set correctly for GitHub Pages

## Credit

This project uses the [Astro](https://astro.build/) framework and is inspired by the GitHub Brand Toolkit.
