# Viet Hoang — Next.js Portfolio

A dark, responsive portfolio website with a no-code visual editor.

## Requirements
- Node.js 20.9 or newer
- Internet connection for first-time package installation (Google Fonts and remote demo images are optional runtime assets)

## Run locally
1. Install Node.js from https://nodejs.org/ if you do not have it.
2. Extract this ZIP file.
3. Open the extracted `viet-hoang-nextjs-portfolio` folder.
4. Open Terminal / PowerShell in that folder.
5. Run:

   ```bash
   npm install
   npm run dev
   ```

6. Open http://localhost:3000 in your browser.
7. Edit your portfolio at http://localhost:3000/admin.

## Edit without coding
- Visit `/admin`.
- Change your name, role, bio, email, links, skills and game details.
- Paste an image URL or upload an image smaller than 1.5 MB.
- Click **Lưu thay đổi** (Save changes).
- Open the homepage to see the updated content.
- Use **Tải bản sao lưu** to download a JSON backup and **Nhập bản sao lưu** to restore it later.

## Important limitations
This starter editor stores edits in the current browser's localStorage. It is ideal for previewing and learning, but edits do not sync between devices and do not automatically update a deployed public website. To edit a live site from anywhere, connect a database/CMS and add authentication before publishing the admin panel. The current `/admin` editor is not password-protected, so do not treat it as a secure production CMS.

## Publish online
You can deploy the project to Vercel or another Next.js host. Push the folder to a Git repository, import it into Vercel, and deploy. For live editing after deployment, a CMS/database integration is needed as described above.
