# Admin Portal - Complete Guide

## 🔐 Login Credentials

**Default:**
- **ID:** `jspn`
- **Password:** `jspn_14102002`

You can change these anytime in the admin panel!

---

## 🚀 How to Access Admin Portal

1. **Go to:** `https://yourusername.github.io/yourrepo/admin.html`
2. **Enter your ID:** `jspn`
3. **Enter your Password:** `jspn_14102002`
4. **Click "Login"**

---

## 📝 Adding Content

### Blog Article:
1. Select **📝 Blog Article**
2. Enter Title: `e.g., "Why Data Matters"`
3. Enter Date: `e.g., "March 2026"`
4. Enter Content: Your article text
5. Click **"Add Content"**
6. ✅ Appears instantly on Writing page

### Poem:
1. Select **✨ Poem**
2. Enter Title: `e.g., "Patterns"`
3. Enter Date: `e.g., "March 2026"`
4. Enter Poem: Write your poem (each line will be preserved)
5. Click **"Add Content"**
6. ✅ Appears instantly on Writing page

---

## 💾 Backup & Restore

### Why Backup?
Your content is stored in **browser's localStorage**. If you:
- Clear browser cache/cookies → **content deleted**
- Switch devices → **content not accessible**
- Use private/incognito mode → **content disappears**

**Solution:** Download backups regularly!

### How to Backup:
1. Click **⬇️ Download Backup**
2. File saves: `portfolio-backup-2026-02-23.json`
3. Keep in safe location (Google Drive, Dropbox, etc.)

### How to Restore:
1. Click **⬆️ Restore Backup**
2. Select your backup file
3. Confirm: "This will replace all current content"
4. ✅ Content restored!

---

## 🔑 Changing Credentials

### From Login Screen:
1. Click **"Forgot Password?"**
2. Enter new ID
3. Enter new password (min. 6 characters)
4. Confirm password
5. Click **"Update Credentials"**
6. ✅ Your new ID and password saved!

### From Admin Panel:
1. Scroll to **🔐 Security** section
2. Click **"🔑 Change Credentials"**
3. Shows your current credentials
4. Go back to login screen to change them

---

## 📊 Data Persistence Explained

### How Content Stays:
- **Same Device, Same Browser:** ✅ Content stays (until cache cleared)
- **Same Device, Different Browser:** ❌ Content NOT shared
- **Different Device:** ❌ Need to restore backup
- **Delete Browser Cache/Cookies:** ❌ Content deleted

### Best Practice Workflow:
1. ✅ Add content via admin
2. ✅ See content on Writing page
3. ✅ Every week: Download backup
4. ✅ Store backup safely (Google Drive, etc.)
5. ✅ When on new device: Upload backup

---

## 🖼️ Example Usage

**Day 1 - Home Computer:**
```
1. Go to admin.html
2. Login: jspn / jspn_14102002
3. Add article: "Environmental Data Analysis"
4. See it on Writing page ✅
5. Download backup: portfolio-backup-2026-02-23.json
6. Save to Google Drive
```

**Day 5 - Work Computer:**
```
1. Go to admin.html
2. Login: jspn / jspn_14102002
3. No content here (different computer)
4. Click "Restore Backup"
5. Upload: portfolio-backup-2026-02-23.json from Google Drive
6. ✅ All articles and poems restored!
7. Add new content
8. Download new backup
```

**Day 10 - Home Computer Again:**
```
1. Go to admin.html
2. Login: jspn / jspn_14102002
3. ✅ Original content still here (same browser)
4. But missing new content from work computer
5. Restore latest backup to get all content
```

---

## ⚠️ Important Notes

### Content Storage Location:
- 🟢 **localStorage:** Browser's local storage (survives restarts, not cache clear)
- 📁 **Backups:** Your computer or cloud storage
- ❌ **NOT:** Server or database (no backend for GitHub Pages)

### Security:
- Your admin portal is **password protected**
- Change credentials regularly
- Don't share your ID/password
- Backup files contain your content (keep secure)

### Syncing Across Devices:
1. **Best way:** Download backup regularly, upload on new device
2. You must manually sync (no automatic cloud sync)
3. Always download before switching devices

---

## 🛠️ Troubleshooting

**Q: I lost my password!**
- A: You can reset it anytime with "Forgot Password?" on login screen

**Q: Content disappeared!**
- A: You likely cleared browser cache. Restore from backup file.

**Q: Content isn't showing on Writing page!**
- A: Wait a few seconds, then refresh the page

**Q: Can I edit existing content?**
- A: Delete it and add a new version (edit feature coming soon)

**Q: Will content stay if I clear browser history?**
- A: NO. Clear only history, NOT cookies/cache. Or backup first!

**Q: Can I export all content?**
- A: Yes! Download backup = backup of all content as .json

**Q: Will content work offline?**
- A: Admin page only works online. Content displays offline.

---

## 📋 Quick Checklist

- [ ] Can login with ID: jspn, Password: jspn_14102002
- [ ] Can add blog article
- [ ] Can add poem
- [ ] Can see content on Writing page
- [ ] Can download backup
- [ ] Can restore backup
- [ ] Can change password
- [ ] Downloaded first backup for safety

---

## 🎯 Workflow Summary

```
Add Content → See on Site → Download Backup → Store Safely
     ↓
Change Device → Restore Backup → Continue Adding → Download Again
```

**That's it! Your admin portal is ready to use!**
