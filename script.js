// --- Terminal Portfolio with Header Navigation ---

const sectionsData = {
  home: `            ██╗   ██╗██╗██╗   ██╗███████╗██╗  ██╗\n            ██║   ██║██║██║   ██║██╔════╝██║ ██╔╝\n            ██║   ██║██║██║   ██║█████╗  █████╔╝ \n            ╚██╗ ██╔╝██║╚██╗ ██╔╝██╔══╝  ██╔═██╗ \n             ╚████╔╝ ██║ ╚████╔╝ ███████╗██║  ██╗\n \n\nWelcome to Vivek Vardhan's Terminal Portfolio!\nType or click a section above to explore.\nType 'help' for available commands.`,
  about: `I'm Vivek Vardhan, a Computer Science undergrad passionate about web development, data science, and GO programming.\nCurrently pursuing my B.Tech at Vignan Institute of Technology & Science.\n\nI have hands-on experience in building web applications and automating tasks using Python.\nProficient in Python, JavaScript, React, Node.js, and familiar with AWS & Azure.`,
  contact: `📧 vivekvardhan2004@gmail.com\n📞 +91-7207131216\n📍 12-13-285 St.No.9, Tarnaka, Hyderabad, IN\n\n🔗 GitHub: https://github.com/Thevivek012\n🔗 Portfolio: https://thevivek143.github.io/vivek-vardhan/\n🔗 LinkedIn: https://www.linkedin.com/in/vivek-vardhan-99b1b1203/\n🔗 Twitter (X): https://twitter.com/vivekva33167334\n🔗 HackerRank: https://www.hackerrank.com/profile/vivekvardhan2004`,
  education: `🎓 B.Tech in Computer Science\n   Vignan Institute of Technology & Science, Hyderabad\n   Sep 2023 – June 2026\n\n🎓 Diploma in Computer Science\n   Samskruti College of Engineering & Technology, Hyderabad\n   GPA: 9.2 | Dec 2020 – Apr 2023`,
  experience: `🧪 Internship – Technology Learning Center (TLC), Hyderabad\n   Nov 2022 – Apr 2023\n\n• Strengthened front-end development skills by building visually appealing web interfaces.\n• Built scalable software using GO programming.\n• Gained hands-on data science experience with Python – data analysis and visualization.`,
  skills: `💡 Programming: C, C++, C#, Java, Python, HTML, CSS, JavaScript, SQL\n🧰 Frameworks: ASP.NET, Bootstrap, PHP, OpenCV\n🛠️ Tools: Git, GitHub, VS Code, Visual Studio, Linux\n🗃️ Databases: MySQL, Oracle`,
  projects: `🖱️ Virtual Mouse – Python, OpenCV\n   Control your mouse using hand gestures via computer vision.\n   GitHub: https://github.com/Thevivek012/virtualmouse\n\n🌾 FarmToHome – PHP, HTML, CSS, JS\n   A web platform connecting farmers directly to consumers.\n   Live: https://farm-to-home-013.000webhostapp.com/\n\n🌐 Portfolio Website – HTML, CSS, JS\n   Showcasing personal work and skills through a self-built website.\n   Live: https://thevivek143.github.io/vivek-vardhan/`
};

const sectionOrder = ['home', 'about', 'skills', 'projects', 'experience', 'education', 'contact'];

const terminal = document.getElementById('terminal-content');

function clearTerminal() {
  terminal.textContent = '';
}

function showCursor() {
  let cursor = document.querySelector('.blinking-cursor');
  if (!cursor) {
    cursor = document.createElement('span');
    cursor.className = 'blinking-cursor';
    cursor.textContent = '_';
    terminal.appendChild(cursor);
  }
}

function typeWriterBlock(block, cb) {
  const lines = block.split('\n');
  let l = 0;
  function nextLine() {
    if (l < lines.length) {
      let idx = 0;
      function type() {
        if (idx < lines[l].length) {
          terminal.textContent += lines[l].charAt(idx);
          idx++;
          setTimeout(type, 10);
        } else {
          terminal.textContent += '\n';
          l++;
          nextLine();
        }
      }
      type();
    } else {
      showCursor();
      cb && cb();
    }
  }
  nextLine();
}

function getTimeGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning!';
  if (hour < 18) return 'Good afternoon!';
  return 'Good evening!';
}

function showSection(section) {
  document.querySelector('.blinking-cursor')?.remove();
  clearTerminal();
  if (section === 'home' && sectionsData['home']) {
    const greeting = getTimeGreeting();
    const homeBanner = sectionsData['home'];
    // Split the homeBanner into ASCII art and the rest
    const lines = homeBanner.split('\n');
    const asciiEndIdx = 5; // 5 lines of ASCII art
    const asciiArt = lines.slice(0, asciiEndIdx).join('\n');
    const rest = lines.slice(asciiEndIdx).join('\n');
    // Place greeting after ASCII art, no extra blank line
    typeWriterBlock(`${asciiArt}\n${greeting}${rest}`, showCursor);
  } else if (sectionsData[section]) {
    typeWriterBlock(sectionsData[section], showCursor);
  } else {
    typeWriterBlock('Section not found. Try another.', showCursor);
  }
}

// --- Terminal Portfolio with Header Navigation ---

// Ensure currentSection is defined globally
window.currentSection = window.currentSection || sectionOrder[0];

// --- Dropdown close handler (only add once) ---
(function setupDropdownCloseHandler() {
  document.addEventListener('click', function(e) {
    document.querySelectorAll('.terminal-nav-dropdown.open').forEach(dropdown => {
      if (!dropdown.contains(e.target)) dropdown.classList.remove('open');
    });
  });
})();

function setupHeader() {
  const header = document.getElementById('terminal-header');
  if (!header) return;
  header.innerHTML = '';

  // Always create nav bar
  const nav = document.createElement('nav');
  nav.className = 'terminal-nav';

  // Responsive: show dropdown if mobile or too many sections
  const isMobile = window.innerWidth <= 700;
  const maxVisible = isMobile ? 3 : 7;
  const visibleSections = sectionOrder.slice(0, maxVisible);
  const dropdownSections = sectionOrder.slice(maxVisible);

  // Add visible nav buttons
  visibleSections.forEach(section => {
    const btn = document.createElement('button');
    btn.className = 'terminal-nav-btn';
    btn.textContent = section.charAt(0).toUpperCase() + section.slice(1);
    btn.tabIndex = 0;
    if (section === window.currentSection) btn.classList.add('active');
    btn.onclick = () => {
      window.currentSection = section;
      showSection(section);
      setActiveNav(section);
    };
    btn.onkeydown = e => {
      if (e.key === 'Enter' || e.key === ' ') btn.click();
    };
    nav.appendChild(btn);
  });

  // Dropdown for overflow
  if (dropdownSections.length) {
    const dropdown = document.createElement('div');
    dropdown.className = 'terminal-nav-dropdown';
    const dropBtn = document.createElement('button');
    dropBtn.className = 'terminal-nav-dropdown-btn';
    dropBtn.innerHTML = 'More <span style="font-size:1.1em;">&#x25BC;</span>';
    dropBtn.tabIndex = 0;
    dropdown.appendChild(dropBtn);
    const dropList = document.createElement('div');
    dropList.className = 'terminal-nav-dropdown-list';
    // Always repopulate dropdown list
    dropList.innerHTML = '';
    dropdownSections.forEach(section => {
      const btn = document.createElement('button');
      btn.className = 'terminal-nav-btn';
      btn.textContent = section.charAt(0).toUpperCase() + section.slice(1);
      btn.tabIndex = 0;
      if (section === window.currentSection) btn.classList.add('active');
      btn.onclick = () => {
        window.currentSection = section;
        showSection(section);
        setActiveNav(section);
        dropdown.classList.remove('open');
      };
      btn.onkeydown = e => {
        if (e.key === 'Enter' || e.key === ' ') btn.click();
      };
      dropList.appendChild(btn);
    });
    dropdown.appendChild(dropList);
    // Add ARIA attributes for accessibility
    dropdown.setAttribute('role', 'menu');
    dropBtn.setAttribute('aria-haspopup', 'true');
    dropBtn.setAttribute('aria-expanded', 'false');
    dropBtn.setAttribute('aria-label', 'Show more sections');
    dropBtn.setAttribute('tabindex', '0');
    dropList.setAttribute('role', 'menu');
    // Update aria-expanded on open/close
    function updateAria() {
      dropBtn.setAttribute('aria-expanded', dropdown.classList.contains('open') ? 'true' : 'false');
    }
    dropBtn.onclick = e => {
      e.stopPropagation();
      dropdown.classList.toggle('open');
      updateAria();
      if (dropdown.classList.contains('open')) {
        const firstBtn = dropList.querySelector('.terminal-nav-btn');
        if (firstBtn) firstBtn.focus();
      }
    };
    dropBtn.onkeydown = e => {
      if (e.key === 'Enter' || e.key === ' ') {
        dropdown.classList.toggle('open');
        updateAria();
        if (dropdown.classList.contains('open')) {
          const firstBtn = dropList.querySelector('.terminal-nav-btn');
          if (firstBtn) firstBtn.focus();
        }
      } else if (e.key === 'ArrowDown') {
        dropdown.classList.add('open');
        updateAria();
        const firstBtn = dropList.querySelector('.terminal-nav-btn');
        if (firstBtn) firstBtn.focus();
      }
    };
    dropList.addEventListener('keydown', function(e) {
      const items = Array.from(dropList.querySelectorAll('.terminal-nav-btn'));
      const idx = items.indexOf(document.activeElement);
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (idx < items.length - 1) items[idx + 1].focus();
        else items[0].focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (idx > 0) items[idx - 1].focus();
        else items[items.length - 1].focus();
      } else if (e.key === 'Escape') {
        dropdown.classList.remove('open');
        updateAria();
        dropBtn.focus();
      }
    });
    nav.appendChild(dropdown);
  }

  header.appendChild(nav);
}

function setActiveNav(section) {
  document.querySelectorAll('.terminal-nav-btn').forEach(btn => {
    if (btn.textContent.toLowerCase() === section) btn.classList.add('active');
    else btn.classList.remove('active');
  });
}

// Re-setup header on resize for responsiveness
window.addEventListener('resize', () => {
  setupHeader();
});

// --- Theme and Accessibility State ---
let currentTheme = 'green';
let currentPrompt = '$';
let currentFontSize = '1.1rem';
let currentContrast = 'normal';

const themes = {
  green: {
    '--terminal-bg': '#111',
    '--terminal-fg': '#39ff14',
    '--terminal-shadow': '#39ff14cc',
    '--terminal-header': '#181818',
    '--terminal-border': '#39ff14',
    '--terminal-cursor': '#39ff14',
  },
  blue: {
    '--terminal-bg': '#0a192f',
    '--terminal-fg': '#00bfff',
    '--terminal-shadow': '#00bfffcc',
    '--terminal-header': '#112240',
    '--terminal-border': '#00bfff',
    '--terminal-cursor': '#00bfff',
  },
  matrix: {
    '--terminal-bg': '#000',
    '--terminal-fg': '#00ff41',
    '--terminal-shadow': '#00ff41cc',
    '--terminal-header': '#111',
    '--terminal-border': '#00ff41',
    '--terminal-cursor': '#00ff41',
  }
};

function applyTheme(theme) {
  const root = document.documentElement;
  const t = themes[theme] || themes.green;
  Object.entries(t).forEach(([k, v]) => root.style.setProperty(k, v));
  currentTheme = theme;
}

function setFontSize(size) {
  document.documentElement.style.setProperty('--terminal-font-size', size);
  currentFontSize = size;
}

function setContrast(mode) {
  if (mode === 'high') {
    document.documentElement.style.setProperty('--terminal-bg', '#000');
    document.documentElement.style.setProperty('--terminal-fg', '#fff');
    document.documentElement.style.setProperty('--terminal-border', '#fff');
  } else {
    applyTheme(currentTheme);
  }
  currentContrast = mode;
}

// --- Command Autocomplete ---
function autocompleteCommand(input, commands) {
  if (!input) return '';
  const matches = commands.filter(cmd => cmd.startsWith(input));
  if (matches.length === 1) return matches[0].slice(input.length);
  return '';
}

// --- Command State (history, commands, histIdx) ---
let history = [];
let histIdx = -1;
let commands = Object.keys(sectionsData).concat([
  'help','clear','theme','prompt','font','contrast',
  'ls','cd','cat','download resume','matrix','sudo make me a sandwich','hello','demo','qr','install','snake',
  'pair','holo','sysinfo','dashboard','time travel','history','skin','theme designer',
  // Add new commands for advanced/futuristic features
  'ascii','art','calendar','clock','music','play','search','motd','update','stats','analytics','mail','email','share','export','voice','weather','hacker','hack','vivek-os','startx'
]);

// --- Add Command Input Bar with Reverse-i-Search ---
function setupCommandInput() {
  let inputBar = document.getElementById('terminal-input-bar');
  if (!inputBar) {
    inputBar = document.createElement('div');
    inputBar.id = 'terminal-input-bar';
    inputBar.style.display = 'flex';
    inputBar.style.alignItems = 'center';
    inputBar.style.background = 'var(--terminal-header)';
    inputBar.style.padding = '8px 16px';
    inputBar.style.borderTop = '1px solid var(--terminal-border)';
    inputBar.style.position = 'sticky';
    inputBar.style.bottom = '0';
    inputBar.style.zIndex = '10';
    inputBar.innerHTML = `<span id="prompt-span" style="color:var(--terminal-fg);font-family:monospace;font-size:var(--terminal-font-size);">${currentPrompt}</span>`;
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Type a command (e.g., about, skills, clear, help)';
    input.style.background = 'transparent';
    input.style.color = 'var(--terminal-fg)';
    input.style.border = 'none';
    input.style.outline = 'none';
    input.style.font = 'var(--terminal-font-size) monospace';
    input.style.marginLeft = '8px';
    input.style.width = '100%';
    input.autocomplete = 'off';
    inputBar.appendChild(input);
    terminal.parentNode.appendChild(inputBar);

    // Autocomplete suggestion
    const suggestion = document.createElement('span');
    suggestion.id = 'autocomplete-suggestion';
    suggestion.style.color = '#888';
    suggestion.style.position = 'absolute';
    suggestion.style.left = 'calc(2em + 16px)';
    suggestion.style.pointerEvents = 'none';
    suggestion.style.font = 'var(--terminal-font-size) monospace';
    inputBar.appendChild(suggestion);

    // --- Reverse-i-Search State ---
    let reverseSearchActive = false;
    let reverseSearchQuery = '';
    let reverseSearchIdx = -1;
    let reverseSearchSpan = null;

    function updateReverseSearchDisplay() {
      if (!reverseSearchSpan) {
        reverseSearchSpan = document.createElement('span');
        reverseSearchSpan.id = 'reverse-search-span';
        reverseSearchSpan.style.color = '#39ff14';
        reverseSearchSpan.style.background = '#222';
        reverseSearchSpan.style.font = 'var(--terminal-font-size) monospace';
        reverseSearchSpan.style.marginLeft = '12px';
        inputBar.appendChild(reverseSearchSpan);
      }
      let found = '';
      if (reverseSearchQuery) {
        for (let i = history.length - 1; i >= 0; i--) {
          if (history[i].includes(reverseSearchQuery)) {
            found = history[i];
            reverseSearchIdx = i;
            break;
          }
        }
      }
      reverseSearchSpan.textContent = `(reverse-i-search): ${reverseSearchQuery}${found ? ` → ${found}` : ''}`;
    }

    function exitReverseSearch(applyResult) {
      reverseSearchActive = false;
      if (reverseSearchSpan) {
        reverseSearchSpan.remove();
        reverseSearchSpan = null;
      }
      if (applyResult && reverseSearchQuery) {
        // Fill input with found command
        for (let i = history.length - 1; i >= 0; i--) {
          if (history[i].includes(reverseSearchQuery)) {
            input.value = history[i];
            break;
          }
        }
      }
      reverseSearchQuery = '';
      reverseSearchIdx = -1;
      input.focus();
    }

    input.addEventListener('keydown', (e) => {
      // Ctrl+R: Start or continue reverse-i-search
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'r') {
        e.preventDefault();
        if (!reverseSearchActive) {
          reverseSearchActive = true;
          reverseSearchQuery = '';
          reverseSearchIdx = -1;
          updateReverseSearchDisplay();
        } else {
          // Find next match up the history
          let found = '';
          for (let i = reverseSearchIdx - 1; i >= 0; i--) {
            if (history[i].includes(reverseSearchQuery)) {
              found = history[i];
              reverseSearchIdx = i;
              break;
            }
          }
          if (found) {
            reverseSearchSpan.textContent = `(reverse-i-search): ${reverseSearchQuery} → ${found}`;
          } else {
            reverseSearchSpan.textContent = `(reverse-i-search): ${reverseSearchQuery} → [no more matches]`;
          }
        }
        return;
      }
      // If in reverse-i-search, handle input
      if (reverseSearchActive) {
        if (e.key === 'Enter') {
          exitReverseSearch(true);
          suggestion.textContent = '';
          return;
        } else if (e.key === 'Backspace') {
          reverseSearchQuery = reverseSearchQuery.slice(0, -1);
          updateReverseSearchDisplay();
          e.preventDefault();
          return;
        } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
          reverseSearchQuery += e.key;
          updateReverseSearchDisplay();
          e.preventDefault();
          return;
        } else if (e.key === 'Escape') {
          exitReverseSearch(false);
          suggestion.textContent = '';
          return;
        }
        e.preventDefault();
        return;
      }
      // --- Command history
      if (e.key === 'Tab') {
        e.preventDefault();
        const val = input.value.trim().toLowerCase();
        const auto = autocompleteCommand(val, commands);
        if (auto) input.value += auto;
        suggestion.textContent = '';
      } else if (e.key === 'Enter') {
        playEnterSound();
        const val = input.value.trim().toLowerCase();
        if (val) {
          history.push(val);
          histIdx = history.length;
          handleCommandInput(val);
          input.value = '';
          suggestion.textContent = '';
        }
      } else if (e.key === 'ArrowUp') {
        if (history.length && histIdx > 0) {
          histIdx--;
          input.value = history[histIdx];
        }
      } else if (e.key === 'ArrowDown') {
        if (history.length && histIdx < history.length - 1) {
          histIdx++;
          input.value = history[histIdx];
        } else if (histIdx === history.length - 1) {
          histIdx++;
          input.value = '';
        }
      }
    });
    input.addEventListener('input', (e) => {
      if (reverseSearchActive) return; // Don't autocomplete during reverse search
      const val = input.value.trim().toLowerCase();
      const auto = autocompleteCommand(val, commands);
      suggestion.textContent = auto;
      playTypeSound();
    });
  }
}

// --- Fake File System ---
const fakeFS = {
  'home': {
    'about.txt': 'about',
    'skills.txt': 'skills',
    'projects.txt': 'projects',
    'contact.txt': 'contact',
    'education.txt': 'education',
    'experience.txt': 'experience',
    'resume.pdf': 'resume',
    'games': {
      'snake.js': 'snake',
    },
  }
};
let currentDir = ['home'];

function getDir(dirArr) {
  let node = fakeFS;
  for (const d of dirArr) node = node[d];
  return node;
}

function lsCmd() {
  const node = getDir(currentDir);
  return Object.keys(node).join('  ');
}

function cdCmd(arg) {
  if (!arg || arg === '.' || arg === '') return;
  if (arg === '..' && currentDir.length > 1) { currentDir.pop(); return; }
  const node = getDir(currentDir);
  if (node[arg] && typeof node[arg] === 'object') currentDir.push(arg);
}

function catCmd(arg) {
  const node = getDir(currentDir);
  if (node[arg]) {
    if (typeof node[arg] === 'string' && sectionsData[node[arg]]) return sectionsData[node[arg]];
    if (arg === 'resume.pdf') return '[Download resume: type download resume]';
    if (typeof node[arg] === 'object') return 'cat: ' + arg + ': Is a directory';
  }
  return 'cat: ' + arg + ': No such file';
}

// --- Downloadable Resume ---
function downloadResume() {
  const link = document.createElement('a');
  link.href = 'https://thevivek143.github.io/vivek-vardhan/VivekVardhan_Resume.pdf';
  link.download = 'VivekVardhan_Resume.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// --- Terminal Sound FX ---
const typeSound = new Audio('https://cdn.jsdelivr.net/gh/ThatOneCalculator/terminal-sounds@master/typewriter-key.mp3');
const enterSound = new Audio('https://cdn.jsdelivr.net/gh/ThatOneCalculator/terminal-sounds@master/typewriter-return.mp3');
function playTypeSound() { try { typeSound.currentTime = 0; typeSound.play(); } catch {} }
function playEnterSound() { try { enterSound.currentTime = 0; enterSound.play(); } catch {} }

// --- Patch handleCommandInput for File System, Download, Easter Eggs ---
function handleCommandInput(cmd) {
  document.querySelector('.blinking-cursor')?.remove();
  terminal.textContent += `\n${currentPrompt} ${cmd}\n`;
  // File system commands
  if (cmd === 'ls') {
    typeWriterBlock(lsCmd(), showCursor);
  } else if (cmd.startsWith('cd ')) {
    cdCmd(cmd.split(' ')[1]);
    typeWriterBlock('Current directory: /' + currentDir.join('/'), showCursor);
  } else if (cmd.startsWith('cat ')) {
    typeWriterBlock(catCmd(cmd.split(' ')[1]), showCursor);
  } else if (cmd === 'download resume') {
    typeWriterBlock('Downloading resume...', showCursor);
    setTimeout(downloadResume, 800);
  } else if (cmd === 'matrix') {
    typeWriterBlock('Wake up, Neo... (matrix rain coming soon!)', showCursor);
  } else if (cmd === 'sudo make me a sandwich') {
    typeWriterBlock('Okay. 🥪 Here you go! (But you are not root!)', showCursor);
  } else if (cmd === 'hello') {
    typeWriterBlock('Hello, world! 👋', showCursor);
  } else if (cmd === 'demo') {
    // Live coding demo: animate code typing
    document.querySelector('.blinking-cursor')?.remove();
    clearTerminal();
    const code =
`function greet(name) {
  if (!name) {
    return 'Hello, world!';
  }
  return 'Hello, ' + name + '!';
}

console.log(greet('Vivek'));
`;
    // Optionally, add simple syntax highlighting (green for keywords, yellow for strings)
    function highlight(line) {
      return line
        .replace(/(function|return|if|else|console|log)/g, match => `\x1b[32m${match}\x1b[0m`)
        .replace(/('[^']*'|"[^"]*")/g, match => `\x1b[33m${match}\x1b[0m`);
    }
    // Animate code typing
    let lines = code.split('\n');
    let l = 0;
    function nextLine() {
      if (l < lines.length) {
        let idx = 0;
        function type() {
          if (idx < lines[l].length) {
            terminal.textContent += lines[l].charAt(idx);
            idx++;
            setTimeout(type, 18);
          } else {
            terminal.textContent += '\n';
            l++;
            nextLine();
          }
        }
        type();
      } else {
        showCursor();
      }
    }
    nextLine();
  } else if (cmd === 'pair') {
    // --- Real-Time Code Collaboration Demo ---
    document.querySelector('.blinking-cursor')?.remove();
    clearTerminal();
    const pairScript = [
      '[You] function sum(a, b) {',
      '[You]   return a + b;',
      '[You] }',
      '[AI]   // Let\'s add input validation!',
      '[AI]   if (typeof a !== "number" || typeof b !== "number") {',
      '[AI]     return NaN;',
      '[AI]   }',
      '[You] // Good idea! Let\'s update:',
      '[You] function sum(a, b) {',
      '[You]   if (typeof a !== "number" || typeof b !== "number") {',
      '[You]     return NaN;',
      '[You]   }',
      '[You]   return a + b;',
      '[You] }',
      '[AI]   // Looks great! 🚀',
      '[You] console.log(sum(2,3)); // 5',
      '[AI]   // Try with invalid input:',
      '[You] console.log(sum(2, "x")); // NaN',
      '[AI]   // Collaboration complete!'
    ];
    let l = 0;
    function nextLine() {
      if (l < pairScript.length) {
        let idx = 0;
        function type() {
          if (idx < pairScript[l].length) {
            terminal.textContent += pairScript[l].charAt(idx);
            idx++;
            setTimeout(type, 16);
          } else {
            terminal.textContent += '\n';
            l++;
            setTimeout(nextLine, 350);
          }
        }
        type();
      } else {
        showCursor();
      }
    }
    nextLine();
  } else if (cmd === 'holo') {
    // --- Terminal “Hologram” Mode ---
    document.querySelector('.blinking-cursor')?.remove();
    clearTerminal();
    typeWriterBlock('Activating Hologram Mode... (type "holo" again to toggle off)', () => {
      let holo = document.getElementById('holo-overlay');
      if (!holo) {
        // Remove matrix rain when holo is activated
        stopMatrixRain();
        holo = document.createElement('canvas');
        holo.id = 'holo-overlay';
        holo.style.position = 'fixed';
        holo.style.top = '0';
        holo.style.left = '0';
        holo.style.width = '100vw';
        holo.style.height = '100vh';
        holo.style.pointerEvents = 'none';
        holo.style.zIndex = '1000';
        holo.style.mixBlendMode = 'screen';
        document.body.appendChild(holo);
        // Simple animated particles
        const ctx = holo.getContext('2d');
        let particles = Array.from({length: 60}, () => ({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          r: 1 + Math.random() * 2,
          dx: (Math.random() - 0.5) * 0.7,
          dy: (Math.random() - 0.5) * 0.7,
          hue: 120 + Math.random() * 120
        }));
        function draw() {
          ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
          for (const p of particles) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, 2*Math.PI);
            ctx.fillStyle = `hsla(${p.hue}, 90%, 60%, 0.7)`;
            ctx.shadowColor = `hsla(${p.hue}, 100%, 80%, 0.8)`;
            ctx.shadowBlur = 12;
            ctx.fill();
            p.x += p.dx; p.y += p.dy;
            if (p.x < 0 || p.x > window.innerWidth) p.dx *= -1;
            if (p.y < 0 || p.y > window.innerHeight) p.dy *= -1;
          }
          requestAnimationFrame(draw);
        }
        holo.width = window.innerWidth;
        holo.height = window.innerHeight;
        draw();
        window.addEventListener('resize', () => {
          holo.width = window.innerWidth;
          holo.height = window.innerHeight;
        });
      } else {
        // Remove holo and restore matrix rain if theme is dark/matrix
        holo.remove();
        if (currentTheme === 'green' || currentTheme === 'matrix') {
          startMatrixRain();
        }
      }
      showCursor();
    });
  } else if (cmd === 'sysinfo' || cmd === 'dashboard') {
    // --- Live System Stats Dashboard ---
    document.querySelector('.blinking-cursor')?.remove();
    clearTerminal();
    // Simulated stats (since browser JS can't access real system info)
    function randomLoad() { return (Math.random()*100).toFixed(1); }
    function randomTemp() { return (35 + Math.random()*30).toFixed(1); }
    function randomNet() { return (Math.random()*100).toFixed(1); }
    function randomMem() { return (2 + Math.random()*14).toFixed(1); }
    function randomWeather() { const w = ['☀️ Sunny','🌧️ Rainy','⛅ Cloudy','🌩️ Stormy','❄️ Snowy']; return w[Math.floor(Math.random()*w.length)]; }
    let stats = {
      cpu: randomLoad(),
      mem: randomMem(),
      temp: randomTemp(),
      net: randomNet(),
      weather: randomWeather(),
      time: new Date().toLocaleTimeString()
    };
    function renderStats() {
      terminal.innerHTML =
        `<pre style="color:var(--terminal-fg);font-family:monospace;font-size:1.1rem;">
+------------------- System Dashboard -------------------+
| CPU Usage:    ${stats.cpu}%   |  RAM Used:   ${stats.mem} GB
| CPU Temp:     ${stats.temp}°C   |  Net: ${stats.net} Mbps
| Weather:      ${stats.weather}   |  Time: ${stats.time}
+-------------------------------------------------------+
</pre>`;
      showCursor();
    }
    renderStats();
    let interval = setInterval(() => {
      stats = {
        cpu: randomLoad(),
        mem: randomMem(),
        temp: randomTemp(),
        net: randomNet(),
        weather: randomWeather(),
        time: new Date().toLocaleTimeString()
      };
      renderStats();
    }, 1800);
    // Stop updating on next command
    const stopStats = () => { clearInterval(interval); };
    setTimeout(() => {
      document.querySelector('#terminal-input-bar input').addEventListener('keydown', stopStats, { once: true });
    }, 100);
  } else if (cmd === 'time travel' || cmd === 'history') {
    // --- Terminal “Time Machine” (Career History) ---
    document.querySelector('.blinking-cursor')?.remove();
    clearTerminal();
    const timeline = [
      { year: 2020, title: 'Diploma Student', desc: 'Started Diploma in Computer Science at Samskruti College.' },
      { year: 2022, title: 'Intern', desc: 'Internship at Technology Learning Center (TLC), Hyderabad.' },
      { year: 2023, title: 'B.Tech Student', desc: 'Joined Vignan Institute of Technology & Science.' },
      { year: 2024, title: 'Web Dev Projects', desc: 'Built Virtual Mouse, FarmToHome, and Portfolio Website.' },
      { year: 2025, title: 'Open Source', desc: 'Contributed to open source and advanced web/AI projects.' }
    ];
    let idx = 0;
    function showStep() {
      if (idx < timeline.length) {
        terminal.innerHTML = `<pre style="color:var(--terminal-fg);font-family:monospace;font-size:1.1rem;">
+------------------- ${timeline[idx].year} -------------------+
| ${timeline[idx].title}
| ${timeline[idx].desc}
+-------------------------------------------------------+
</pre>`;
        showCursor();
        idx++;
        setTimeout(showStep, 1800);
      } else {
        showCursor();
      }
    }
    showStep();
  } else if (cmd === 'skin' || cmd === 'theme designer') {
    // --- Customizable Terminal Skins ---
    document.querySelector('.blinking-cursor')?.remove();
    clearTerminal();
    // Show a simple theme designer UI in the terminal
    terminal.innerHTML = `<div style="color:var(--terminal-fg);font-family:monospace;font-size:1.1rem;">
      <b>Terminal Skin Designer</b><br><br>
      <label>Background: <input type="color" id="skin-bg" value="#111111"></label><br>
      <label>Text: <input type="color" id="skin-fg" value="#39ff14"></label><br>
      <label>Border: <input type="color" id="skin-border" value="#39ff14"></label><br>
      <label>Header: <input type="color" id="skin-header" value="#181818"></label><br>
      <label>Cursor: <input type="color" id="skin-cursor" value="#39ff14"></label><br>
      <label>Upload BG Image: <input type="file" id="skin-bgimg" accept="image/*"></label><br><br>
      <button id="skin-apply" style="font-family:monospace;">Apply</button>
      <button id="skin-save" style="font-family:monospace;">Save</button>
      <button id="skin-reset" style="font-family:monospace;">Reset</button>
    </div>`;
    showCursor();
    // Apply skin
    setTimeout(() => {
      const root = document.documentElement;
      document.getElementById('skin-apply').onclick = () => {
        root.style.setProperty('--terminal-bg', document.getElementById('skin-bg').value);
        root.style.setProperty('--terminal-fg', document.getElementById('skin-fg').value);
        root.style.setProperty('--terminal-border', document.getElementById('skin-border').value);
        root.style.setProperty('--terminal-header', document.getElementById('skin-header').value);
        root.style.setProperty('--terminal-cursor', document.getElementById('skin-cursor').value);
        // BG image
        const file = document.getElementById('skin-bgimg').files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = e => {
            root.style.setProperty('--terminal-bgimg', `url('${e.target.result}')`);
            root.style.setProperty('background-image', `url('${e.target.result}')`);
            root.style.setProperty('background-size', 'cover');
          };
          reader.readAsDataURL(file);
        }
      };
      document.getElementById('skin-save').onclick = () => {
        const skin = {
          bg: document.getElementById('skin-bg').value,
          fg: document.getElementById('skin-fg').value,
          border: document.getElementById('skin-border').value,
          header: document.getElementById('skin-header').value,
          cursor: document.getElementById('skin-cursor').value
        };
        localStorage.setItem('vv-skin', JSON.stringify(skin));
        alert('Skin saved!');
      };
      document.getElementById('skin-reset').onclick = () => {
        localStorage.removeItem('vv-skin');
        applyTheme('green');
        setFontSize('1.1rem');
        alert('Skin reset!');
      };
    }, 200);
  } else {
    if (cmd.startsWith('theme ')) {
      const theme = cmd.split(' ')[1];
      applyTheme(theme);
      typeWriterBlock(`Theme switched to ${theme}.`, showCursor);
    } else if (cmd.startsWith('prompt ')) {
      currentPrompt = cmd.slice(7) || '$';
      document.getElementById('prompt-span').textContent = currentPrompt;
      typeWriterBlock(`Prompt changed to '${currentPrompt}'`, showCursor);
    } else if (cmd.startsWith('font ')) {
      const size = cmd.split(' ')[1];
      if (size === 'large') setFontSize('1.5rem');
      else setFontSize('1.1rem');
      typeWriterBlock(`Font size set to ${size}.`, showCursor);
    } else if (cmd.startsWith('contrast ')) {
      const mode = cmd.split(' ')[1];
      setContrast(mode);
      typeWriterBlock(`Contrast set to ${mode}.`, showCursor);
    } else if (sectionsData[cmd]) {
      typeWriterBlock(sectionsData[cmd], showCursor);
    } else if (cmd === 'help') {
      // Show commands in a column, grouped and readable
      const helpText = `Available commands:\n\nSections:\n  home\n  about\n  skills\n  projects\n  experience\n  education\n  contact\n\nTerminal Features:\n  help            Show this help menu\n  clear           Clear the terminal\n  theme [name]    Switch theme (green, blue, matrix)\n  prompt [text]   Customize prompt\n  font [size]     Set font size (large, normal)\n  contrast [mode] Set contrast (high, normal)\n  skin            Open terminal skin designer\n  theme designer  Open terminal skin designer\n  motd            Show message of the day\n  update          Simulate portfolio update\n  stats           Portfolio analytics\n  analytics       Portfolio analytics\n  share           Export session history\n  export          Export session history\n  voice           Voice command demo\n  calendar        Show calendar/clock\n  clock           Show calendar/clock\n  ascii           Animated ASCII art gallery\n  art             Animated ASCII art gallery\n  hacker          Terminal hacker mode\n  hack            Terminal hacker mode\n  vivek-os        Boot Vivek OS (ASCII desktop)\n  startx          Boot Vivek OS (ASCII desktop)\n\nPortfolio & Fun:\n  ls, cd, cat     Fake file system navigation\n  download resume Download my resume\n  qr              Show LinkedIn QR code\n  demo            Live coding demo\n  install         Animated progress bar\n  game            Play terminal games (tic-tac-toe, snake, tetris, sudoku)\n  pair            Real-time code collaboration demo\n  holo            Toggle hologram mode\n  sysinfo         System stats dashboard\n  dashboard       System stats dashboard\n  time travel     Career time machine\n  history         Career time machine\n  sudo make me a sandwich  (Easter egg)\n  matrix          (Easter egg)\n  hello           (Easter egg)\n  search [kw]     Search portfolio\n  music           Terminal music player\n  play            Terminal music player\n  mail            Simulated terminal email\n  email           Simulated terminal email\n  weather         Simulated weather\n\nShortcuts:\n  Ctrl+R          Reverse-i-search (search command history)`;
      typeWriterBlock(helpText, showCursor);
    } else if (cmd === 'clear') {
      clearTerminal();
      showCursor();
    } else if (cmd === 'qr') {
      // Show QR code for LinkedIn
      playEnterSound();
      document.querySelector('.blinking-cursor')?.remove();
      clearTerminal();
      const qrUrl = 'https://www.linkedin.com/in/vivek-vardhan-99b1b1203/';
      const qrImg = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(qrUrl)}`;
      terminal.innerHTML = `<div style="text-align:center;margin-top:1em;">
        <div style="color:var(--terminal-fg);font-family:monospace;font-size:1.1rem;margin-bottom:0.5em;">Scan to visit my LinkedIn</div>
        <img src="${qrImg}" alt="LinkedIn QR" style="border:4px solid var(--terminal-border);background:#fff;padding:8px;border-radius:8px;box-shadow:0 0 12px var(--terminal-shadow);">
        <div style="color:var(--terminal-fg);font-family:monospace;font-size:0.95rem;margin-top:0.5em;word-break:break-all;">${qrUrl}</div>
      </div>`;
      showCursor();
    } else if (cmd === 'install') {
      // Animated progress bar demo
      playEnterSound();
      document.querySelector('.blinking-cursor')?.remove();
      clearTerminal();
      let progress = 0;
      const barLength = 24;
      function drawBar() {
        const filled = Math.floor((progress / 100) * barLength);
        const empty = barLength - filled;
        terminal.textContent = `Installing Vivek's Portfolio Tools...\n[${'='.repeat(filled)}${' '.repeat(empty)}] ${progress}%`;
        if (progress < 100) {
          progress += Math.floor(Math.random() * 8) + 2;
          if (progress > 100) progress = 100;
          setTimeout(drawBar, 120);
        } else {
          setTimeout(() => {
            terminal.textContent += '\nInstallation complete! Type help to explore.';
            showCursor();
          }, 500);
        }
      }
      drawBar();
    } else if (cmd === 'download resume') {
      playEnterSound();
      typeWriterBlock('Downloading resume...', showCursor);
      setTimeout(downloadResume, 800);
    } else if (cmd === 'ai' || cmd === 'chatbot') {
      // --- Simple AI Chatbot Demo ---
      document.querySelector('.blinking-cursor')?.remove();
      clearTerminal();
      let chatHistory = [];
      function renderChat() {
        terminal.innerHTML = '<div style="color:var(--terminal-fg);font-family:monospace;font-size:1.1rem;max-height:60vh;overflow-y:auto;">' +
          chatHistory.map(e => `<b>${e.role === 'user' ? 'You' : 'AI'}:</b> ${e.text}`).join('<br>') +
          '</div>';
        showCursor();
      }
      renderChat();
      // Add a chat input bar
      let chatBar = document.getElementById('ai-chat-bar');
      if (!chatBar) {
        chatBar = document.createElement('div');
        chatBar.id = 'ai-chat-bar';
        chatBar.style.display = 'flex';
        chatBar.style.alignItems = 'center';
        chatBar.style.background = 'var(--terminal-header)';
        chatBar.style.padding = '8px 16px';
        chatBar.style.borderTop = '1px solid var(--terminal-border)';
        chatBar.style.position = 'sticky';
        chatBar.style.bottom = '0';
        chatBar.style.zIndex = '10';
        chatBar.innerHTML = `<span style="color:var(--terminal-fg);font-family:monospace;font-size:var(--terminal-font-size);">AI&gt;</span>`;
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Ask me anything... (type exit to leave)';
        input.style.background = 'transparent';
        input.style.color = 'var(--terminal-fg)';
        input.style.border = 'none';
        input.style.outline = 'none';
        input.style.font = 'var(--terminal-font-size) monospace';
        input.style.marginLeft = '8px';
        input.style.width = '100%';
        input.autocomplete = 'off';
        chatBar.appendChild(input);
        terminal.parentNode.appendChild(chatBar);
        input.focus();
        input.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') {
            const val = input.value.trim();
            if (!val) return;
            if (val.toLowerCase() === 'exit') {
              chatBar.remove();
              clearTerminal();
              showCursor();
              return;
            }
            chatHistory.push({ role: 'user', text: val });
            renderChat();
            input.value = '';
            // Simulate AI response
            setTimeout(() => {
              let aiReply = '';
              if (/hello|hi|hey/i.test(val)) aiReply = 'Hello! How can I help you today?';
              else if (/your name/i.test(val)) aiReply = "I'm Vivek's AI terminal assistant.";
              else if (/portfolio|about/i.test(val)) aiReply = 'This is Vivek Vardhan\'s interactive terminal portfolio. Type help to explore!';
              else if (/skills|tech/i.test(val)) aiReply = 'Vivek knows Python, JavaScript, React, Node.js, C, C++, and more!';
              else if (/project/i.test(val)) aiReply = 'Check out the projects section or type projects.';
              else if (/contact|email/i.test(val)) aiReply = 'You can contact Vivek at vivekvardhan2004@gmail.com.';
              else if (/joke/i.test(val)) aiReply = 'Why do programmers prefer dark mode? Because light attracts bugs!';
              else if (/weather/i.test(val)) aiReply = 'Sorry, I can only simulate system info. Try sysinfo!';
              else if (/help/i.test(val)) aiReply = 'Type help in the main terminal for a full list of commands.';
              else aiReply = "I'm a simple AI bot. Ask me about Vivek, his skills, projects, or type 'exit' to leave chat.";
              chatHistory.push({ role: 'ai', text: aiReply });
              renderChat();
            }, 700);
          }
        });
      }
    } else if (cmd === 'game' || cmd === 'games') {
      // --- Game Launcher ---
      document.querySelector('.blinking-cursor')?.remove();
      clearTerminal();
      const gameList = `Available Games:\n\n  1. tic-tac-toe\n  2. snake\n  3. tetris\n  4. sudoku\n\nType the number to play (e.g., 2 for snake)`;
      typeWriterBlock(gameList, showCursor);
    } else if (["1","2","3","4"].includes(cmd)) {
      // Game number shortcuts
      if (cmd === "1") handleCommandInput("tic-tac-toe");
      else if (cmd === "2") handleCommandInput("snake");
      else if (cmd === "3") handleCommandInput("tetris");
      else if (cmd === "4") handleCommandInput("sudoku");
    } else if (cmd === 'snake') {
      // --- Simple Snake Game ---
      document.querySelector('.blinking-cursor')?.remove();
      clearTerminal();
      // ...existing snake game code here (already implemented)...
      // If not present, you can add a placeholder:
      typeWriterBlock('Snake game coming soon! (Demo placeholder)', showCursor);
    } else if (cmd === 'tic-tac-toe') {
      // --- Enhanced Tic-Tac-Toe Game: Single/Two Player ---
      document.querySelector('.blinking-cursor')?.remove();
      clearTerminal();
      let board = Array(9).fill(' ');
      let current = 'X';
      let gameOver = false;
      let mode = null; // '1p' or '2p'
      let winner = null;
      function renderBoard() {
        let status = '';
        if (!mode) {
          status = 'Choose mode: 1 for Single Player, 2 for Two Players';
        } else if (gameOver) {
          if (winner === 'draw') status = 'Game Over! It\'s a draw!';
          else status = `Game Over! ${winner === 'X' ? (mode==='2p' ? 'Player 1 (X)' : 'You (X)') : (mode==='2p' ? 'Player 2 (O)' : 'AI (O)')} wins!`;
        } else {
          if (mode === '2p') status = `Player ${current === 'X' ? '1 (X)' : '2 (O)'}'s move: type a number (1-9)`;
          else status = `${current === 'X' ? 'Your' : 'AI'} move: type a number (1-9)`;
        }
        terminal.innerHTML = `<pre style="color:var(--terminal-fg);font-family:monospace;font-size:1.1rem;">
Tic-Tac-Toe\n\n ${board[0]} | ${board[1]} | ${board[2]}\n---+---+---\n ${board[3]} | ${board[4]} | ${board[5]}\n---+---+---\n ${board[6]} | ${board[7]} | ${board[8]}\n\n${status}\n(Type 'exit' to quit)
</pre>`;
        showCursor();
      }
      function checkWin(b, p) {
        const wins = [
          [0,1,2],[3,4,5],[6,7,8],
          [0,3,6],[1,4,7],[2,5,8],
          [0,4,8],[2,4,6]
        ];
        return wins.some(line => line.every(i => b[i] === p));
      }
      function aiMove() {
        let empty = board.map((v,i) => v===' '?i:null).filter(v=>v!==null);
        if (empty.length) {
          let move = empty[Math.floor(Math.random()*empty.length)];
          board[move] = 'O';
        }
      }
      function checkDraw() {
        return board.every(cell => cell !== ' ');
      }
      renderBoard();
      // Add input bar for moves
      let tttBar = document.getElementById('ttt-bar');
      if (!tttBar) {
        tttBar = document.createElement('div');
        tttBar.id = 'ttt-bar';
        tttBar.style.display = 'flex';
        tttBar.style.alignItems = 'center';
        tttBar.style.background = 'var(--terminal-header)';
        tttBar.style.padding = '8px 16px';
        tttBar.style.borderTop = '1px solid var(--terminal-border)';
        tttBar.style.position = 'sticky';
        tttBar.style.bottom = '0';
        tttBar.style.zIndex = '10';
        tttBar.innerHTML = `<span style="color:var(--terminal-fg);font-family:monospace;font-size:var(--terminal-font-size);font-weight:bold;">TicTacToe&gt;</span>`;
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = '1:Single 2:Two Players, then cell (1-9) or exit';
        input.style.background = 'transparent';
        input.style.color = 'var(--terminal-fg)';
        input.style.border = 'none';
        input.style.outline = 'none';
        input.style.font = 'var(--terminal-font-size) monospace';
        input.style.marginLeft = '8px';
        input.style.width = '100%';
        input.autocomplete = 'off';
        tttBar.appendChild(input);
        terminal.parentNode.appendChild(tttBar);
        input.focus();
        input.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') {
            const val = input.value.trim();
            if (val.toLowerCase() === 'exit') {
              tttBar.remove();
              clearTerminal();
              showCursor();
              return;
            }
            if (!mode) {
              if (val === '1') { mode = '1p'; renderBoard(); input.value = ''; return; }
              if (val === '2') { mode = '2p'; renderBoard(); input.value = ''; return; }
              input.value = '';
              return;
            }
            const move = parseInt(val)-1;
            if (!gameOver && move >= 0 && move < 9 && board[move] === ' ') {
              board[move] = current;
              if (checkWin(board, current)) {
                gameOver = true;
                winner = current;
                renderBoard();
                return;
              }
              if (checkDraw()) {
                gameOver = true;
                winner = 'draw';
                renderBoard();
                return;
              }
              if (mode === '2p') {
                current = current === 'X' ? 'O' : 'X';
                renderBoard();
              } else {
                // AI move
                current = 'O';
                aiMove();
                if (checkWin(board, 'O')) {
                  gameOver = true;
                  winner = 'O';
                  renderBoard();
                  return;
                }
                if (checkDraw()) {
                  gameOver = true;
                  winner = 'draw';
                  renderBoard();
                  return;
                }
                current = 'X';
                renderBoard();
              }
            }
            input.value = '';
          }
        });
      }
    } else if (cmd === 'tetris') {
      // --- Tetris Placeholder ---
      document.querySelector('.blinking-cursor')?.remove();
      clearTerminal();
      typeWriterBlock('Tetris game coming soon! (Demo placeholder)', showCursor);
    } else if (cmd === 'sudoku') {
      // --- Sudoku Placeholder ---
      document.querySelector('.blinking-cursor')?.remove();
      clearTerminal();
      typeWriterBlock('Sudoku game coming soon! (Demo placeholder)', showCursor);
    } else if (cmd === 'ascii' || cmd === 'art') {
      // Animated ASCII Art Gallery
      document.querySelector('.blinking-cursor')?.remove();
      clearTerminal();
      const arts = [
        `   _/\\\\\\\\\\\\\\\_\n  _/\\\///////////_\n _\/\\\_________\n  _\/\\\\\\\\\\\\\_\n   _\/\\\///////\\\_\n    _\/\\\_____\/\\\_\n     _\/\\\\\\\\\\\\/_\n      _\///////////__\n`,
        `   (  .      )\n   )           (              )\n         .  '   .   '  .  '  .\n  (    , )       (.   )  (   ',    )\n   .' ) ( . )    ,  ( ,     )   ( .\n)(  .   (  ) (   .  )  (   )\n`,
        `      .      .\n   .      .\n        .\n   .      *      .\n        .\n`
      ];
      let idx = 0;
      function showArt() {
        terminal.innerHTML = `<pre style=\"color:var(--terminal-fg);font-family:monospace;font-size:1.1rem;\">${arts[idx]}</pre>\n<div style='color:var(--terminal-fg);font-family:monospace;'>ASCII Art Gallery (${idx+1}/${arts.length})<br>Press [N]ext, [P]rev, or 'exit' to leave.</div>`;
        showCursor();
      }
      showArt();
      let artBar = document.getElementById('ascii-bar');
      if (!artBar) {
        artBar = document.createElement('div');
        artBar.id = 'ascii-bar';
        artBar.style.display = 'flex';
        artBar.style.alignItems = 'center';
        artBar.style.background = 'var(--terminal-header)';
        artBar.style.padding = '8px 16px';
        artBar.style.borderTop = '1px solid var(--terminal-border)';
        artBar.style.position = 'sticky';
        artBar.style.bottom = '0';
        artBar.style.zIndex = '10';
        artBar.innerHTML = `<span style=\"color:var(--terminal-fg);font-family:monospace;font-size:var(--terminal-font-size);font-weight:bold;\">ASCII&gt;</span>`;
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'N:Next, P:Prev, exit';
        input.style.background = 'transparent';
        input.style.color = 'var(--terminal-fg)';
        input.style.border = 'none';
        input.style.outline = 'none';
        input.style.font = 'var(--terminal-font-size) monospace';
        input.style.marginLeft = '8px';
        input.style.width = '100%';
        input.autocomplete = 'off';
        artBar.appendChild(input);
        terminal.parentNode.appendChild(artBar);
        input.focus();
        input.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') {
            const val = input.value.trim().toLowerCase();
            if (val === 'exit') {
              artBar.remove();
              clearTerminal();
              showCursor();
              return;
            }
            if (val === 'n' || val === 'next') { idx = (idx+1)%arts.length; showArt(); }
            else if (val === 'p' || val === 'prev') { idx = (idx-1+arts.length)%arts.length; showArt(); }
            input.value = '';
          }
        });
      }
    } else if (cmd === 'music' || cmd === 'play') {
      // Terminal Music Player (placeholder)
      document.querySelector('.blinking-cursor')?.remove();
      clearTerminal();
      terminal.innerHTML = `<pre style=\"color:var(--terminal-fg);font-family:monospace;font-size:1.1rem;\">\nMusic player coming soon! (Chiptune/retro music demo)\n(Type 'exit' to quit)\n</pre>`;
      showCursor();
    } else if (cmd === 'search') {
      // Portfolio Search Command
      document.querySelector('.blinking-cursor')?.remove();
      clearTerminal();
      terminal.innerHTML = `<pre style=\"color:var(--terminal-fg);font-family:monospace;font-size:1.1rem;\">\nUsage: search [keyword]\nSearches all sections/projects/skills for the keyword.\n</pre>`;
      showCursor();
    } else if (cmd.startsWith('search ')) {
      // Search implementation
      const q = cmd.slice(7).toLowerCase();
      let results = [];
      for (const [k, v] of Object.entries(sectionsData)) {
        if (v.toLowerCase().includes(q)) {
          results.push(`Section: ${k}\n${v.split('\n').filter(line=>line.toLowerCase().includes(q)).join('\n')}`);
        }
      }
      if (results.length) {
        typeWriterBlock(results.join('\n\n'), showCursor);
      } else {
        typeWriterBlock('No results found.', showCursor);
      }
    } else if (cmd === 'motd') {
      // Message of the Day
      const motds = [
        'Success is a journey, not a destination. - Vivek',
        'Tip: Try the skin command to customize your terminal!',
        'Fun fact: The first computer bug was a real moth.',
        'Quote: The best way to predict the future is to invent it. - Alan Kay',
        'Did you know? You can play games here! Type game.'
      ];
      typeWriterBlock(motds[Math.floor(Math.random()*motds.length)], showCursor);
    } else if (cmd === 'update') {
      // Portfolio Update Simulation
      document.querySelector('.blinking-cursor')?.remove();
      clearTerminal();
      let progress = 0;
      const barLength = 24;
      function drawBar() {
        const filled = Math.floor((progress / 100) * barLength);
        const empty = barLength - filled;
        terminal.textContent = `Updating Vivek's Portfolio...\n[${'='.repeat(filled)}${' '.repeat(empty)}] ${progress}%`;
        if (progress < 100) {
          progress += Math.floor(Math.random() * 8) + 2;
          if (progress > 100) progress = 100;
          setTimeout(drawBar, 120);
        } else {
          setTimeout(() => {
            terminal.textContent += '\nUpdate complete! Changelog:\n- New futuristic features\n- Bug fixes\n- UI polish';
            showCursor();
          }, 500);
        }
      }
      drawBar();
    } else if (cmd === 'stats' || cmd === 'analytics') {
      // Portfolio Analytics
      document.querySelector('.blinking-cursor')?.remove();
      clearTerminal();
      const stats = {
        commands: history.length,
        games: history.filter(h=>['tic-tac-toe','snake','tetris','sudoku'].includes(h)).length,
        time: Math.floor(performance.now()/1000),
        achievements: ['Terminal Guru','Game Explorer']
      };
      terminal.innerHTML = `<pre style=\"color:var(--terminal-fg);font-family:monospace;font-size:1.1rem;\">\nPortfolio Analytics\n------------------\nCommands run: ${stats.commands}\nGames played: ${stats.games}\nTime spent: ${stats.time}s\nAchievements: ${stats.achievements.join(', ')}\n</pre>`;
      showCursor();
    } else if (cmd === 'mail' || cmd === 'email') {
      // Simulated Terminal Email
      document.querySelector('.blinking-cursor')?.remove();
      clearTerminal();
      terminal.innerHTML = `<pre style=\"color:var(--terminal-fg);font-family:monospace;font-size:1.1rem;\">\nCompose a message to Vivek.\n(Type your message and press Enter, or 'exit' to cancel)\n</pre>`;
      showCursor();
      let mailBar = document.getElementById('mail-bar');
      if (!mailBar) {
        mailBar = document.createElement('div');
        mailBar.id = 'mail-bar';
        mailBar.style.display = 'flex';
        mailBar.style.alignItems = 'center';
        mailBar.style.background = 'var(--terminal-header)';
        mailBar.style.padding = '8px 16px';
        mailBar.style.borderTop = '1px solid var(--terminal-border)';
        mailBar.style.position = 'sticky';
        mailBar.style.bottom = '0';
        mailBar.style.zIndex = '10';
        mailBar.innerHTML = `<span style=\"color:var(--terminal-fg);font-family:monospace;font-size:var(--terminal-font-size);font-weight:bold;\">Mail&gt;</span>`;
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Type your message or exit';
        input.style.background = 'transparent';
        input.style.color = 'var(--terminal-fg)';
        input.style.border = 'none';
        input.style.outline = 'none';
        input.style.font = 'var(--terminal-font-size) monospace';
        input.style.marginLeft = '8px';
        input.style.width = '100%';
        input.autocomplete = 'off';
        mailBar.appendChild(input);
        terminal.parentNode.appendChild(mailBar);
        input.focus();
        input.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') {
            const val = input.value.trim();
            if (!val) return;
            if (val.toLowerCase() === 'exit') {
              mailBar.remove();
              clearTerminal();
              showCursor();
              return;
            }
            terminal.innerHTML = `<pre style=\\"color:var(--terminal-fg);font-family:monospace;font-size:1.1rem;\\">\nSending...\n</pre>`;
            setTimeout(() => {
              terminal.innerHTML = `<pre style=\\"color:var(--terminal-fg);font-family:monospace;font-size:1.1rem;\\">\nMessage sent! (Simulated)\n</pre>`;
              showCursor();
            }, 1000);
            mailBar.remove();
          }
        });
      }
    } else if (cmd === 'share' || cmd === 'export') {
      // Export/Share Session
      document.querySelector('.blinking-cursor')?.remove();
      clearTerminal();
      const session = history.join('\n');
      const blob = new Blob([session], {type:'text/plain'});
      const url = URL.createObjectURL(blob);
      terminal.innerHTML = `<pre style=\"color:var(--terminal-fg);font-family:monospace;font-size:1.1rem;\">\nDownload your session history:\n<a href=\"${url}\" download=\"vv-session.txt\" style=\"color:var(--terminal-fg);text-decoration:underline;\">Download vv-session.txt</a>\n</pre>`;
      showCursor();
    } else if (cmd === 'voice') {
      // Voice Command Demo (placeholder)
      document.querySelector('.blinking-cursor')?.remove();
      clearTerminal();
      terminal.innerHTML = `<pre style=\"color:var(--terminal-fg);font-family:monospace;font-size:1.1rem;\">\nVoice command demo coming soon! (Browser mic support required)\n</pre>`;
      showCursor();
    } else if (cmd === 'weather') {
      // Terminal Weather (simulated)
      document.querySelector('.blinking-cursor')?.remove();
      clearTerminal();
      const weather = ['☀️ Sunny','🌧️ Rainy','⛅ Cloudy','🌩️ Stormy','❄️ Snowy'];
      const w = weather[Math.floor(Math.random()*weather.length)];
      terminal.innerHTML = `<pre style=\"color:var(--terminal-fg);font-family:monospace;font-size:1.1rem;\">\nCurrent weather: ${w}\n</pre>`;
      showCursor();
    } else if (cmd === 'hacker' || cmd === 'hack') {
      // Terminal Hacker Mode
      document.querySelector('.blinking-cursor')?.remove();
      clearTerminal();
      let lines = 0;
      function scrollCode() {
        if (lines > 30) {
          terminal.innerHTML += `<pre style=\\"color:var(--terminal-fg);font-family:monospace;font-size:1.1rem;\\">\nAccess granted! Welcome, Agent Vivek.\n</pre>`;
          showCursor();
          return;
        }
        terminal.innerHTML += `<pre style=\\"color:var(--terminal-fg);font-family:monospace;font-size:1.1rem;\\">${Math.random().toString(36).slice(2,18)}\n</pre>`;
        lines++;
        setTimeout(scrollCode, 60);
      }
      scrollCode();
    } else if (cmd === 'vivek-os' || cmd === 'startx') {
      // Easter Egg: Vivek OS (fake desktop)
      document.querySelector('.blinking-cursor')?.remove();
      clearTerminal();
      terminal.innerHTML = `<pre style=\"color:var(--terminal-fg);font-family:monospace;font-size:1.1rem;\">\nBooting Vivek OS...\n[====                ] 20%\n[========            ] 40%\n[==============      ] 60%\n[==================  ] 80%\n[====================] 100%\n\nWelcome to Vivek OS (ASCII Desktop)!\n(Feature coming soon: windowed ASCII apps)\n(Type 'exit' to return)\n</pre>`;
      showCursor();
    } else {
      typeWriterBlock('Command not found. Type help for a list of commands.', showCursor);
    }
  }
}

// --- Animated background (matrix rain effect) ---
function startMatrixRain() {
  if (document.getElementById('matrix-canvas')) return;
  const canvas = document.createElement('canvas');
  canvas.id = 'matrix-canvas';
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '-1'; // Ensure always behind terminal
  document.body.appendChild(canvas);
  // Ensure terminal is above matrix rain
  const terminalBox = document.querySelector('.terminal');
  if (terminalBox) terminalBox.style.zIndex = '1';
  let ctx = canvas.getContext('2d');
  let w = window.innerWidth;
  let h = window.innerHeight;
  canvas.width = w;
  canvas.height = h;
  let cols = Math.floor(w / 18);
  let ypos = Array(cols).fill(0);
  function matrix() {
    ctx.fillStyle = 'rgba(0,0,0,0.08)';
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = '#39ff14';
    ctx.font = '16px monospace';
    ypos.forEach((y, ind) => {
      const text = String.fromCharCode(0x30A0 + Math.random() * 96);
      ctx.fillText(text, ind * 18, y);
      if (y > 100 + Math.random() * 10000) ypos[ind] = 0;
      else ypos[ind] = y + 18;
    });
    requestAnimationFrame(matrix);
  }
  matrix();
  window.addEventListener('resize', () => {
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;
    cols = Math.floor(w / 18);
    ypos = Array(cols).fill(0);
  });
}
function stopMatrixRain() {
  const canvas = document.getElementById('matrix-canvas');
  if (canvas) canvas.remove();
}
// --- Dark/Light mode toggle ---
function setupThemeToggle() {
  let toggle = document.getElementById('theme-toggle-btn');
  if (!toggle) {
    toggle = document.createElement('button');
    toggle.id = 'theme-toggle-btn';
    toggle.className = 'terminal-nav-btn';
    toggle.style.position = 'absolute';
    toggle.style.right = '1.5rem';
    toggle.style.top = '0.5rem';
    toggle.style.zIndex = '200';
    toggle.innerHTML = '🌙/☀️';
    toggle.title = 'Toggle dark/light mode';
    toggle.onclick = () => {
      if (currentTheme === 'green' || currentTheme === 'matrix') {
        applyTheme('blue');
        stopMatrixRain();
      } else {
        applyTheme('green');
        startMatrixRain(); // Ensure matrix rain is started when switching to dark/matrix
      }
    };
    document.body.appendChild(toggle);
  }
}
// --- Add animated background and theme toggle on load ---
window.addEventListener('DOMContentLoaded', () => {
  startMatrixRain();
  setupThemeToggle();
});
// --- Animate section transitions ---
function animateSectionTransition(cb) {
  const terminal = document.getElementById('terminal-content');
  terminal.style.opacity = '0';
  setTimeout(() => {
    cb();
    terminal.style.transition = 'opacity 0.5s';
    terminal.style.opacity = '1';
    setTimeout(() => {
      terminal.style.transition = '';
    }, 600);
  }, 200);
}
// Patch showSection to use animation
const _showSection = showSection;
showSection = function(section) {
  animateSectionTransition(() => _showSection(section));
};
// --- Add a fun animated border to the terminal ---
(function animatedBorder() {
  const terminal = document.querySelector('.terminal');
  if (!terminal) return;
  terminal.style.zIndex = '1'; // Ensure terminal is above matrix rain
  let step = 0;
  setInterval(() => {
    step = (step + 1) % 360;
    terminal.style.boxShadow = `0 0 24px hsl(${step}, 100%, 60%)`;
    terminal.style.borderColor = `hsl(${step}, 100%, 60%)`;
  }, 60);
})();

// --- Add Easter Egg Command ---
sectionsData['sudo'] = "Nice try. You're not root!";
sectionsData['ls'] = Object.keys(sectionsData).join('  ');
sectionsData['fortune'] = "Success is a journey, not a destination. - Vivek";

// --- Apply initial theme and font ---
window.onload = function() {
  // Restore custom skin if saved
  const skin = localStorage.getItem('vv-skin');
  if (skin) {
    const s = JSON.parse(skin);
    document.documentElement.style.setProperty('--terminal-bg', s.bg);
    document.documentElement.style.setProperty('--terminal-fg', s.fg);
    document.documentElement.style.setProperty('--terminal-border', s.border);
    document.documentElement.style.setProperty('--terminal-header', s.header);
    document.documentElement.style.setProperty('--terminal-cursor', s.cursor);
  } else {
    applyTheme('green');
  }
  setFontSize('1.1rem');
  setupHeader();
  showSection('home');
  setupCommandInput();
  setTimeout(() => {
    const input = document.querySelector('#terminal-input-bar input');
    if (input) input.focus();
  }, 500);
};
