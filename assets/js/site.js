/* CEPROSYS — interações do site (sem dependências) */
(function () {
  'use strict';

  var root = document.documentElement;
  var KEY = 'ceprosys_theme';

  /* ---------- tema (dark padrão, persiste em localStorage) ---------- */
  function applyTheme(t) {
    root.classList.remove('light', 'dark');
    root.classList.add(t === 'light' ? 'light' : 'dark');
    var btn = document.getElementById('themeToggle');
    if (btn) {
      btn.innerHTML = t === 'light' ? ICON_MOON : ICON_SUN;
      btn.setAttribute('aria-label', t === 'light' ? 'Ativar modo escuro' : 'Ativar modo claro');
    }
  }
  var ICON_SUN = '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
  var ICON_MOON = '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';

  var saved = null;
  try { saved = localStorage.getItem(KEY); } catch (e) {}
  applyTheme(saved === 'light' ? 'light' : 'dark');

  document.addEventListener('DOMContentLoaded', function () {
    applyTheme((function(){ try { return localStorage.getItem(KEY) === 'light' ? 'light' : 'dark'; } catch(e){ return 'dark'; } })());

    var btn = document.getElementById('themeToggle');
    if (btn) btn.addEventListener('click', function () {
      var next = root.classList.contains('light') ? 'dark' : 'light';
      try { localStorage.setItem(KEY, next); } catch (e) {}
      applyTheme(next);
    });

    /* ---------- menu mobile ---------- */
    var burger = document.getElementById('navBurger');
    var nav = document.getElementById('siteNav');
    if (burger && nav) {
      burger.addEventListener('click', function () {
        nav.classList.toggle('open');
        burger.setAttribute('aria-expanded', nav.classList.contains('open') ? 'true' : 'false');
      });
    }

    /* ---------- reveal on scroll ---------- */
    var els = document.querySelectorAll('.fade');
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
        });
      }, { threshold: 0.12 });
      els.forEach(function (el) { io.observe(el); });
    } else {
      els.forEach(function (el) { el.classList.add('in'); });
    }

    /* ---------- ano no rodapé ---------- */
    document.querySelectorAll('[data-year]').forEach(function (el) {
      el.textContent = String(new Date().getFullYear());
    });

    /* ---------- formulário → WhatsApp ---------- */
    var form = document.getElementById('waForm');
    if (form) {
      form.addEventListener('submit', function (ev) {
        ev.preventDefault();
        var v = function (id) { var el = document.getElementById(id); return el ? el.value.trim() : ''; };
        var linhas = [
          'Olá! Vim pelo site ceprosys.com.br.',
          '',
          'Nome: ' + v('fNome'),
          v('fEmpresa') ? 'Empresa: ' + v('fEmpresa') : '',
          v('fAssunto') ? 'Assunto: ' + v('fAssunto') : '',
          '',
          v('fMsg')
        ].filter(function (l, i) { return l !== '' || i === 1 || i === 5; });
        var url = 'https://wa.me/5511972110884?text=' + encodeURIComponent(linhas.join('\n'));
        window.open(url, '_blank', 'noopener');
      });
    }
  });
})();
