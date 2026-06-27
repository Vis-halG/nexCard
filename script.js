const fs = require('fs');
const path = require('path');
const themes_dir = 'frontend/app/components/themes';
const themes = ['ModernTheme.jsx', 'MinimalTheme.jsx', 'ClassicTheme.jsx', 'NeoTheme.jsx', 'BoldTheme.jsx', 'GlassTheme.jsx'];

const sections = {
    'showAbout': [{old: '{data?.about && (', new: '{pref.showAbout !== false && data?.about && ('}],
    'showServices': [{old: '{data?.services?.length > 0 && (', new: '{pref.showServices !== false && data?.services?.length > 0 && ('}],
    'showSocial': [{old: '{socials.length > 0 && (', new: '{pref.showSocial !== false && socials.length > 0 && ('}],
    'showGallery': [{old: '{data?.gallery?.length > 0 && (', new: '{pref.showGallery !== false && data?.gallery?.length > 0 && ('}],
    'showVideos': [{old: '{data?.videos?.length > 0 && (', new: '{pref.showVideos !== false && data?.videos?.length > 0 && ('}],
    'showCustomLinks': [{old: '{data?.customLinks?.length > 0 && (', new: '{pref.showCustomLinks !== false && data?.customLinks?.length > 0 && ('}],
    'showPayment': [{old: '{data?.payment && (', new: '{pref.showPayment !== false && data?.payment && ('}],
    'showLocation': [{old: '{data?.address && (', new: '{pref.showLocation !== false && data?.address && ('}]
};

themes.forEach(theme => {
    let filepath = path.join(themes_dir, theme);
    let content = fs.readFileSync(filepath, 'utf8');

    if (!content.includes('const pref = data?.preferences || {};')) {
        content = content.replace('const socials = Object.entries(data?.social || {}).filter(([, url]) => url);', 'const socials = Object.entries(data?.social || {}).filter(([, url]) => url);\n  const pref = data?.preferences || {};');
    }

    Object.keys(sections).forEach(key => {
        let items = sections[key];
        items.forEach(item => {
            if (!content.includes(item.new)) {
                content = content.replace(item.old, item.new);
            }
        });
    });
    
    // Contact form (regex)
    if (!content.includes('{pref.showContactForm !== false')) {
        content = content.replace(/<Section title=\"Contact\"[\s\S]*?<\/Section>/, match => `{pref.showContactForm !== false && (
            ${match}
          )}`);
    }

    // Share block
    if (!content.includes('{pref.showShare !== false')) {
        content = content.replace(/<div id="share"[\s\S]*?<\/div>\s*<\/main>/, match => {
            let withoutMain = match.replace('</main>', '');
            return `{pref.showShare !== false && (\n${withoutMain}\n)}</main>`;
        });
    }

    // Save Contact block (usually a div with generateVcard)
    if (!content.includes('{pref.showSaveContact !== false')) {
        content = content.replace(/<div className="mt-5[^>]*>\s*<button[^>]*onClick=\{generateVcard\}[^>]*>[\s\S]*?<\/div>/, match => `{pref.showSaveContact !== false && (\n${match}\n)}`);
    }

    fs.writeFileSync(filepath, content, 'utf8');
});
console.log('Success');
