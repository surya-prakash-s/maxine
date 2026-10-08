/* RoarMD — "Hi, I'm Maxine" landing page interactions.
   Progressive enhancement only: the page is fully readable without JS. */
(function () {
  'use strict';

  /* ---------- Mobile navigation drawer ---------- */
  var menuToggle = document.getElementById('menuToggle');
  var siteNav = document.getElementById('siteNav');

  if (menuToggle && siteNav) {
    menuToggle.addEventListener('click', function () {
      var open = siteNav.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', String(open));
    });

    // Close the drawer when a link inside it is used.
    siteNav.addEventListener('click', function (event) {
      if (event.target.closest('a')) {
        siteNav.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------- Collapsible nav groups ---------- */
  document.querySelectorAll('.nav-group-toggle').forEach(function (toggle) {
    toggle.addEventListener('click', function () {
      var group = toggle.closest('.nav-group');
      var open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      if (group) group.classList.toggle('is-open', !open);
    });
  });

  /* ---------- Interest checkboxes (aria-pressed toggle) ---------- */
  document.querySelectorAll('.interest-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var pressed = btn.getAttribute('aria-pressed') === 'true';
      btn.setAttribute('aria-pressed', String(!pressed));
    });
  });

  /* ---------- Ask Maxine: chips + composer + reply panel ---------- */
  var answers = {
    'Lose weight': 'Let’s make it about more than willpower. Midlife hormones change how your body stores energy. Tell me a bit about your routine, and I’ll help you build a plan that fits.',
    'Sleep better': 'You’re in good company. Let’s look at what’s waking you up, from hot flashes to stress to that 3am mind race, and start with one change tonight.',
    'Get rid of brain fog': 'Common, and well worth digging into. Sleep, hormones, stress and nutrition can all play a part. Let’s figure out which ones apply to you.',
    'Have more energy': 'Running on empty isn’t a personality trait. Let’s look at sleep, iron, thyroid and hormones together, and I can help you get the right labs.',
    'Feel less anxious': 'You’re not imagining it. Hormone shifts can turn up anxiety. Let’s talk through what you’re feeling, and I’ll connect you with a clinician if it’s time.',
    'Build strength': 'One of the smartest moves you can make in midlife. Muscle supports your metabolism, bones and energy. Let’s find a starting point that fits your body and your schedule.',
    'Better nutrition': 'No diets, no guilt. Your needs shift in midlife, from protein to fiber to calcium. Tell me how you eat now, and we’ll make a few changes that actually stick.',
    'Address hair loss': 'You’re not imagining it, and you’re far from alone. Hormones, stress, thyroid and nutrition can all play a part. Let’s narrow down what’s behind yours and what can help.'
  };

  var fallbackReply = 'Good question. Tell me a little more about what’s going on, and I’ll help you connect the dots. The more you share, the more personal my help gets.';

  var form = document.getElementById('askForm');
  var input = document.getElementById('ask');
  var panel = document.getElementById('replyPanel');
  var qEl = document.getElementById('replyQuestion');
  var aEl = document.getElementById('replyText');
  var chipList = document.getElementById('chipList');

  function ask(question) {
    var text = (question || '').trim();
    if (!text || !panel) return;

    qEl.textContent = text;
    aEl.textContent = answers[text] || fallbackReply;
    panel.hidden = false;
    if (input) input.value = '';
    if (chipList) chipList.hidden = true;
    panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      ask(input ? input.value : '');
    });
  }

  if (chipList) {
    chipList.addEventListener('click', function (event) {
      var chip = event.target.closest('button');
      if (chip) ask(chip.textContent);
    });
  }
})();
