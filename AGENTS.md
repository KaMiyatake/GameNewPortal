# Repository Working Guide

## Scope and structure

- The primary application is `frontend`. Do not modify `backend` unless the task explicitly requires it.
- The site currently uses the Next.js Pages Router (`frontend/src/pages`) as its primary implementation. Treat `frontend/src/app` as non-authoritative unless the task specifically concerns it.
- Preserve unrelated work, including the separate novel-game branch. Do not merge, rebase, or bring its changes into `main` without explicit instruction.

## Frontend commands and verification

Run frontend commands from `frontend` using pnpm:

```bash
pnpm dev
pnpm build
```

- Run `pnpm build` before committing deployment-impacting code, article, or dependency changes.
- `dev` and `build` run the popular-article update. Review changes to `src/data/popularArticles.json`; commit them only when they are an intended result of the work.
- Do not automatically commit generated `.pnpm-store/` directories or `frontend/pnpm-workspace.yaml`. In particular, do not add arbitrary pnpm `allowBuilds` settings without an explicit reason and review.
- Keep `next` and `eslint-config-next` on compatible, aligned versions. For Next.js security updates, update both the manifest and `pnpm-lock.yaml`, then build successfully.

## Adding news articles

Follow the detailed guide in `docs/article-publishing.md`.

- Add the article module under `frontend/src/data/articles/<YYYY>/<MM>/` using a `YYMMDDNN-slug` ID.
- Add its image at `frontend/public/images/articles/<YYYY>/<MM>/<article-id>/main.jpg`.
- Register the article in the month `index.ts` and in `frontend/src/data/articles/index.ts`.
- Use only the existing category names defined by the site data.
- Do not use `frontend/scripts/create-article.js` without first updating it: it is not aligned with the current `categories` schema or article-index workflow.

## Sources and images

- Use official first-party announcements and press materials as the factual basis for news articles. Record the source URL in the article.
- Use images only when their use is explicitly permitted, such as official press assets. Do not download and reuse third-party news-site or image-search images.
- If permitted official art is unavailable, prefer an approved embed; an original generic illustrative image is a fallback and must not be presented as an official screenshot or artwork.
- Prefer existing permitted materials over generating images when cost or rights clarity is a concern.

## Git, deployment, and secrets

- `main` is connected to the Vercel production deployment. Push only with explicit user approval, and verify the resulting deployment status and source commit when requested.
- Keep commits narrowly scoped. Do not include unrelated local files or incidental generated changes.
- Never commit `.env` files, credentials, API keys, or environment-variable values. Document variable names and setup instructions without exposing values.
