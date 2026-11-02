/* Scenes for exporting every screen of the prototype (e.g. to Figma).
   Loaded only when the page is opened with ?scene=<id>; each scene puts the app into one
   state and renders it with animations frozen, so a headless browser can screenshot it.
   `flow` groups scenes for presentation; `title` and `note` are the captions. */
const SCENES = [
  // ---------- Getting started ----------
  { id: 'start-roles', flow: 'Getting started', title: 'Who’s signing in?', note: 'Pick parent or teacher',
    run() { S.role = null; S.stack = [{ name: 'roles' }]; } },
  { id: 'start-login', flow: 'Getting started', title: 'Log in', note: 'Email and password',
    run() { S.role = 'parent'; S.stack = [{ name: 'roles' }, { name: 'login' }]; } },
  { id: 'start-tour-1', flow: 'Getting started', title: 'App tour · 1 of 3', note: 'Shown on first sign-in',
    run() { parent(); S.tour = 0; } },
  { id: 'start-tour-2', flow: 'Getting started', title: 'App tour · 2 of 3', note: 'Share from home with +',
    run() { parent(); S.tour = 1; } },
  { id: 'start-tour-3', flow: 'Getting started', title: 'App tour · 3 of 3', note: 'Notifications and profile',
    run() { parent(); S.tour = 2; } },

  // ---------- Parent: home & services ----------
  { id: 'p-dash', flow: 'Parent · Home & services', title: 'Dashboard', note: 'Announcements, payments, services',
    run() { parent(); } },
  { id: 'p-dash-more', flow: 'Parent · Home & services', title: 'Dashboard (scrolled)', note: 'Events and Learning Feed',
    run() { parent(); }, after() { scrollBody(560); } },
  { id: 'p-announcement', flow: 'Parent · Home & services', title: 'Announcement', note: 'Tap the announcement card',
    run() { parent([{ name: 'announcement', p: 0 }]); } },
  { id: 'p-notifications', flow: 'Parent · Home & services', title: 'Notifications', note: 'Bell in the header',
    run() { parent([{ name: 'notifications' }]); } },
  { id: 'p-term-dates', flow: 'Parent · Home & services', title: 'Term dates', note: 'Services › Term dates',
    run() { parent([{ name: 'term-dates' }]); } },
  { id: 'p-uniform-hero', flow: 'Parent · Home & services', title: 'School uniform', note: 'Services › Uniform',
    run() { parent([{ name: 'uniform-shop' }]); } },
  { id: 'p-uniform-signin', flow: 'Parent · Home & services', title: 'Shop', note: 'Blank for now',
    run() { parent([{ name: 'uniform-shop' }, { name: 'webview', p: 'Uniform' }]); } },
  { id: 'p-late-club', flow: 'Parent · Home & services', title: 'Late club', note: 'Services › Late club',
    run() { parent([{ name: 'late-club' }]); } },
  { id: 'p-contacts', flow: 'Parent · Home & services', title: 'Important contacts', note: 'Services › Contacts',
    run() { parent([{ name: 'important-contacts' }]); } },
  { id: 'p-calendar', flow: 'Parent · Home & services', title: 'Calendar', note: 'Events › View calendar',
    run() { parent([{ name: 'calendar' }]); } },
  { id: 'p-profile', flow: 'Parent · Home & services', title: 'Your profile', note: 'Children, account, Payments',
    run() { parent([{ name: 'profile' }]); } },

  // ---------- Parent: school fees ----------
  { id: 'fees-pay', flow: 'Parent · School fees', title: 'Pay fees', note: 'From the dashboard card or profile',
    run() { parent([{ name: 'fees' }]); S.feesTab = 'pay'; S.payOption = 'current'; } },
  { id: 'fees-instalments', flow: 'Parent · School fees', title: 'Instalments', note: 'View instalments',
    run() { parent([{ name: 'fees' }]); S.feesTab = 'pay'; S.instalmentsOpen = true; } },
  { id: 'fees-other', flow: 'Parent · School fees', title: 'Other amount', note: 'Custom amount up to the balance',
    run() { parent([{ name: 'fees' }]); S.feesTab = 'pay'; S.payOption = 'other'; S.payOther = '200'; }, after() { scrollBody(400); } },
  { id: 'fees-make-payment', flow: 'Parent · School fees', title: 'Make payment', note: 'KNET with convenience fee',
    run() { parent([{ name: 'fees' }, { name: 'make-payment' }]); S.payAmount = 480; } },
  { id: 'fees-done', flow: 'Parent · School fees', title: 'Payment successful', note: 'Balance and transactions update',
    run() { parent([{ name: 'fees' }, { name: 'make-payment' }]); S.payAmount = 480; actions['pay-confirm'](); } },
  { id: 'fees-statement', flow: 'Parent · School fees', title: 'Account statement', note: 'Breakdown and download',
    run() { parent([{ name: 'fees' }]); S.feesTab = 'statement'; S.statementOpen = { school: true }; } },
  { id: 'fees-transactions', flow: 'Parent · School fees', title: 'Transactions', note: 'Payments by school year',
    run() { parent([{ name: 'fees' }]); S.feesTab = 'transactions'; } },

  // ---------- Parent: learning ----------
  { id: 'learn-feed', flow: 'Parent · Learning', title: 'Learning', note: 'Observations per child, video with play button',
    run() { parent(); S.stack = [{ name: 'learning' }]; } },
  { id: 'learn-landscape', flow: 'Parent · Learning', title: 'Learning (scrolled)', note: 'Landscape and portrait photos',
    run() { parent(); S.stack = [{ name: 'learning' }]; }, after() { scrollTo('.obs[data-p="o5"]'); } },
  { id: 'learn-detail', flow: 'Parent · Learning', title: 'Observation', note: 'Tap a card · chat with the teacher',
    run() { parent(); S.stack = [{ name: 'learning' }, { name: 'obs', p: 'o1' }]; } },
  { id: 'learn-chat', flow: 'Parent · Learning', title: 'Chat about it', note: 'Observation pinned in the chat',
    run() { parent(); S.stack = [{ name: 'learning' }, { name: 'obs', p: 'o1' }, { name: 'thread', p: 'javier:o1' }]; } },
  { id: 'learn-child', flow: 'Parent · Learning', title: 'Child page', note: 'Tap the child’s name',
    run() { parent(); S.stack = [{ name: 'learning' }, { name: 'child', p: 'emma' }]; } },
  { id: 'learn-child-more', flow: 'Parent · Learning', title: 'Child page (scrolled)', note: 'Add a moment from home',
    run() { parent(); S.stack = [{ name: 'learning' }, { name: 'child', p: 'emma' }]; }, after() { scrollBody(99999); } },

  // ---------- Parent: add a moment from home ----------
  { id: 'add-camera', flow: 'Parent · Add a moment from home', title: 'Camera', note: 'Tap + on any tab',
    run() { parent([{ name: 'camera' }]); } },
  { id: 'add-editor', flow: 'Parent · Add a moment from home', title: 'Photo editor', note: 'Full-screen, like a story',
    run() { parent([{ name: 'camera' }, { name: 'edit-photo' }]); S.draft.obs = null; obsDraft(); } },
  { id: 'add-stickers', flow: 'Parent · Add a moment from home', title: 'Sticker tray', note: '★ adds a sticker',
    run() { parent([{ name: 'camera' }, { name: 'edit-photo' }]); S.draft.obs = null; obsDraft(); S.edTool = 'sticker'; } },
  { id: 'add-text', flow: 'Parent · Add a moment from home', title: 'Add text', note: 'Colours and background',
    run() { parent([{ name: 'camera' }, { name: 'edit-photo' }]); S.draft.obs = null; obsDraft();
      S.edText = { id: null, v: 'Tower time!', color: '#FFD84D', bg: true }; } },
  { id: 'add-decorated', flow: 'Parent · Add a moment from home', title: 'Decorated photo', note: 'Drag to move, tap to remove',
    run() { parent([{ name: 'camera' }, { name: 'edit-photo' }]); decorate(); } },
  { id: 'add-form', flow: 'Parent · Add a moment from home', title: 'New observation', note: 'Pick the child, add reflections',
    run() { parent([{ name: 'camera' }, { name: 'edit-photo' }, { name: 'new-obs' }]); decorate();
      S.draft.obs.text = 'We built the tallest tower yet at home — he counted every block out loud!'; } },
  { id: 'add-sent', flow: 'Parent · Add a moment from home', title: 'Sent for approval', note: 'Class Teacher approves first',
    run() { parent([{ name: 'camera' }, { name: 'edit-photo' }, { name: 'new-obs' }]); decorate();
      S.draft.obs.child = 'christopher'; S.draft.obs.text = 'We built the tallest tower yet at home — he counted every block out loud!'; },
    after() { device.querySelector('form[data-form="obs"]').requestSubmit(); } },

  // ---------- Classrooms & chat ----------
  { id: 'class-feed', flow: 'Classrooms & chat', title: 'Classrooms', note: 'Class updates · likes only',
    run() { parent(); S.stack = [{ name: 'classrooms' }]; } },
  { id: 'class-event', flow: 'Classrooms & chat', title: 'Event update', note: 'Add to calendar',
    run() { parent(); S.stack = [{ name: 'classrooms' }, { name: 'post', p: 'p0' }]; } },
  { id: 'class-menu', flow: 'Classrooms & chat', title: '⋯ on someone else’s post', note: 'Copy link or report',
    run() { parent(); S.stack = [{ name: 'classrooms' }]; }, after() { click('.post[data-p="p0"] [data-act="menu"]'); } },
  { id: 'chat-list', flow: 'Classrooms & chat', title: 'Messages', note: 'Filter by teacher or admin',
    run() { parent(); S.stack = [{ name: 'chat' }]; } },
  { id: 'chat-contacts', flow: 'Classrooms & chat', title: 'New message', note: 'School contacts',
    run() { parent(); S.stack = [{ name: 'chat' }, { name: 'contacts' }]; } },
  { id: 'chat-thread', flow: 'Classrooms & chat', title: 'Conversation', note: 'Messages within 2 min share a time',
    run() { parent(); S.stack = [{ name: 'chat' }, { name: 'thread', p: 'javier' }];
      const t = Date.now() - 60000;
      S.threads.javier = [
        { me: 0, t: 'Hi Siobhan! Just a reminder that Forest School is on Wednesday.', at: '9:02 AM', ts: t - 900000 },
        { me: 1, t: 'Thanks Mr. Diaz!', at: '9:10 AM', ts: t },
        { me: 1, t: 'Does Emma need wellies?', at: '9:10 AM', ts: t + 20000 },
        { me: 1, t: 'And a waterproof coat?', at: '9:11 AM', ts: t + 50000 },
        { me: 0, t: 'Yes please — both, plus spare socks in a labelled bag. 🌿', at: '9:14 AM', ts: t + 240000 },
      ]; } },

  // ---------- Teacher ----------
  { id: 't-dash', flow: 'Teacher', title: 'Dashboard', note: 'To-do list and events',
    run() { teacher(); } },
  { id: 't-create', flow: 'Teacher', title: 'Create with +', note: 'Observation, update or event',
    run() { teacher(); S.sheet = true; } },
  { id: 't-journal', flow: 'Teacher', title: 'Learning journal', note: 'Approve or decline',
    run() { teacher([{ name: 'journal' }]); S.journalTab = 'pending'; } },
  { id: 't-announcements', flow: 'Teacher', title: 'Announcements', note: 'Current and past',
    run() { teacher([{ name: 'announcements' }]); } },
  { id: 't-roster', flow: 'Teacher', title: 'Children list', note: 'Search and filter by group',
    run() { teacher([{ name: 'roster' }]); } },
  { id: 't-learning', flow: 'Teacher', title: 'Learning', note: 'Room and child filters',
    run() { teacher(); S.stack = [{ name: 'learning' }]; } },
  { id: 't-obs', flow: 'Teacher', title: 'Observation', note: 'Chat button messages the parent',
    run() { teacher(); S.stack = [{ name: 'learning' }, { name: 'obs', p: 'o1' }]; } },
  { id: 't-chat-parent', flow: 'Teacher', title: 'Chat with parent', note: 'About this observation',
    run() { teacher(); S.stack = [{ name: 'learning' }, { name: 'obs', p: 'o1' }, { name: 'thread', p: 'siobhan:o1' }]; } },
  { id: 't-profile', flow: 'Teacher', title: 'Your profile', note: 'Shortcuts and account',
    run() { teacher([{ name: 'profile' }]); } },

  // ---------- Teacher: posting ----------
  { id: 't-new-update', flow: 'Teacher · Posting', title: 'Post class update', note: 'Group, title, photo, description',
    run() { teacher([{ name: 'new-announcement' }]);
      S.draft.announcement = { group: 'Sunflower room', title: 'Pumpkin patch visit', date: '2026-10-23', time: '10:00', place: 'Greenway Farm', photo: true,
        body: 'We’re off to the pumpkin patch next Friday! Please send your child in wellies with a packed snack.' }; } },
  { id: 't-new-event', flow: 'Teacher · Posting', title: 'Create event', note: 'Date and time required',
    run() { teacher([{ name: 'new-event' }]);
      S.draft.event = { group: 'All groups', title: 'Autumn Sports Day', date: '2026-10-11', time: '10:00', place: 'School Field', photo: true,
        body: 'Races, a parachute game and a bouncy castle. Families welcome!' }; } },
  { id: 't-own-menu', flow: 'Teacher · Posting', title: '⋯ on your own post', note: 'Edit or delete',
    run() { teacher(); S.stack = [{ name: 'classrooms' }]; }, after() { click('.post[data-p="p2"] [data-act="menu"]'); } },
  { id: 't-edit-post', flow: 'Teacher · Posting', title: 'Edit update', note: 'Save changes',
    run() { teacher(); S.stack = [{ name: 'classrooms' }, { name: 'edit-post', p: 'p2' }]; } },
  { id: 't-delete', flow: 'Teacher · Posting', title: 'Delete?', note: 'Confirmation before deleting',
    run() { teacher(); S.stack = [{ name: 'classrooms' }]; S.confirm = { kind: 'post', id: 'p2' }; } },
];

/* ---------- helpers ---------- */
function reset(role) {
  try { localStorage.setItem('tour-parent', '1'); localStorage.setItem('tour-teacher', '1'); } catch {}
  Object.assign(S, { role, tour: null, sheet: false, menu: null, confirm: null, toast: null, annBellRung: true, dir: 'none' });
}
function parent(extra = []) { reset('parent'); S.stack = [{ name: 'dashboard' }, ...extra]; }
function teacher(extra = []) { reset('teacher'); S.stack = [{ name: 'dashboard' }, ...extra]; }
function decorate() {
  S.draft.obs = null;
  const d = obsDraft();
  d.child = 'christopher';
  d.overlays = [
    { id: 1, type: 'text', v: 'Tower time!', color: '#FFD84D', bg: true, x: 50, y: 22 },
    { id: 2, type: 'sticker', v: 0, x: 38, y: 64 },
    { id: 3, type: 'emoji', v: '🧱', x: 76, y: 46 },
  ];
  d.ratio = '402 / 874';
}
const scrollBody = y => { const b = device.querySelector('.screen .body'); if (b) b.scrollTop = y; };
const scrollTo = sel => { const el = device.querySelector(sel), b = device.querySelector('.screen .body'); if (el && b) b.scrollTop = el.offsetTop - 16; };
const click = sel => device.querySelector(sel)?.click();

/* ---------- run the requested scene ---------- */
(() => {
  const id = new URLSearchParams(location.search).get('scene');
  const scene = SCENES.find(s => s.id === id);
  // Freeze motion so screenshots are stable (the toast is kept visible).
  const st = document.createElement('style');
  st.textContent = `*, *::before, *::after { animation-duration: 0s !important; animation-delay: 0s !important; transition: none !important; }
    .toast { animation: none !important; } .tour .spot::after { display: none; }
    body { display: block !important; padding: 0 !important; margin: 0 !important; background: #FBF7F0 !important; }
    .proto-bar { display: none !important; }
    .device { width: 402px !important; height: 874px !important; border-radius: 0 !important; box-shadow: none !important; margin: 0 !important; }`;
  document.head.append(st);
  if (!scene) { document.title = 'unknown scene'; return; }
  scene.run();
  S.dir = 'none';
  render();
  scene.after?.();
  document.title = 'scene ' + id;
})();
