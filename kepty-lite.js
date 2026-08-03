/**
 * Kepty English Lite — contact modal + upgrade prompts
 *
 * Open/close: use direct element handlers (not document capture).
 * Close uses a short guard so the same click cannot reopen via an opener underneath.
 * Fonts: inherit app fonts (Open Sans / Noto Sans JP) — do not load EB Garamond here.
 * Mail: Web3Forms (same as youth). github.io may be blocked by Web3Forms; surface API errors.
 */
(function (global) {
    /** Same inbox path as youth; swap if Web3Forms blocks github.io for this key. */
    var WEB3FORMS_ACCESS_KEY = 'bcb8a667-538a-4b4c-a0a6-f6f88f95aa08';
    var WEB3FORMS_URL = 'https://api.web3forms.com/submit';
    var MSG_SHADOWING =
        '無料版のKepty English Liteではシャドーイングの音声再生ができません。本格的にシャドーイングを実施したい場合は、有料版をご利用ください。';
    var MSG_SHARE =
        'いま使っている無料版では、録音の共有ができません。もっと使いこなしたいときは、有料版にお申し込みください。';

    /** Per-module paid benefits (shown from title link). Mild, concrete, max ~3 lines. */
    var PAID_BENEFITS = {
        vocabulary:
            '・単語の回転率を上げるための中長期プログラムが組まれています。\n・「何を・何周するか」で迷いやすいところを、伴走で整理できます。\n・継続しやすい学習設計の相談ができます。',
        pronunciation:
            '・正しい音の出し方を、プログラムに沿って定着させられます。\n・伸ばすべき音を見ながら、次の一歩を決めやすくなります。\n・継続のための進め方相談ができます。',
        grammar:
            '・文法の型を、解説→確認→運用の流れで積み上げられます。\n・つまずきに合わせて進め方を調整できます。\n・中長期で崩れにくい土台づくりを伴走します。',
        shadowing:
            '・音源を再生しながら、リンキング・リダクションなどの音の変化を確認できます。\n・録音提出とフィードバックで、聞き取り・発音の精度を高められます。\n・正しいシャドーイングの進め方をプログラムで固定できます。',
        reading:
            '・現状の課題に合わせて、実施方法や進め方を調整します。\n・「話す」「聴く」に効果的な実施方法を活用します。',
        topicTalk:
            '・AIによる自動添削により、即時に的確なフィードバックを得られます。\n・講師からの添削により、日頃の癖や言い直しに気づけます。\n・プログラムの設計により、努力の継続が容易になります。',
        speaking:
            '・英語らしい型を、ルール付き練習で定着させられます。\n・講師からの添削により、日頃の癖や言い直しに気づけます。\n・プログラムの設計により、努力の継続が容易になります。',
        chunk:
            '・すばやく正確に文を組み立てる回転を、弱点つぶしまで含めて設計できます。\n・反応速度を上げるためのプログラムが組まれています。\n・講師からの添削により、日頃の癖や言い直しに気づけます。'
    };
    var PAID_BENEFITS_TITLES = {
        vocabulary: 'Vocabulary：有料版では',
        pronunciation: 'Pronunciation：有料版では',
        grammar: 'Grammar：有料版では',
        shadowing: 'Shadowing：有料版では',
        reading: 'Reading：有料版では',
        topicTalk: 'Topic Talk：有料版では',
        speaking: 'Speaking Form：有料版では',
        chunk: 'Sentence Building：有料版では'
    };

    var lastFocused = null;
    var pendingReason = '';
    var bound = false;
    var closingGuardUntil = 0;

    function $(id) {
        return document.getElementById(id);
    }

    function setError(message) {
        var errorEl = $('lite-contact-error');
        if (!errorEl) return;
        if (!message) {
            errorEl.hidden = true;
            errorEl.textContent = '';
            return;
        }
        errorEl.hidden = false;
        errorEl.textContent = message;
    }

    function showContactFormState() {
        var formPanel = $('lite-contact-form-panel');
        var successPanel = $('lite-contact-success');
        if (formPanel) formPanel.hidden = false;
        if (successPanel) successPanel.hidden = true;
    }

    function showContactSuccessState() {
        var formPanel = $('lite-contact-form-panel');
        var successPanel = $('lite-contact-success');
        if (formPanel) formPanel.hidden = true;
        if (successPanel) successPanel.hidden = false;
    }

    function resetContactState() {
        var form = $('lite-contact-form');
        if (form) form.reset();
        setError(null);
        showContactFormState();
        var submitBtn = $('lite-contact-submit');
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
        }
        var reasonEl = $('lite-contact-reason');
        if (reasonEl) reasonEl.textContent = pendingReason || '';
        var reasonWrap = $('lite-contact-reason-wrap');
        if (reasonWrap) reasonWrap.hidden = !pendingReason;
    }

    function isOpen(modal) {
        return !!(modal && modal.classList.contains('is-open'));
    }

    function setModalOpen(open) {
        var modal = $('lite-contact-modal');
        if (!modal) return;
        if (open) {
            modal.classList.add('is-open');
            modal.removeAttribute('hidden');
            modal.setAttribute('aria-hidden', 'false');
            document.body.classList.add('lite-contact-open');
        } else {
            modal.classList.remove('is-open');
            modal.setAttribute('hidden', '');
            modal.setAttribute('aria-hidden', 'true');
            document.body.classList.remove('lite-contact-open');
        }
    }

    function openContact(reasonText) {
        if (Date.now() < closingGuardUntil) return false;
        var modal = $('lite-contact-modal');
        if (!modal) return false;
        pendingReason = reasonText ? String(reasonText) : '';
        lastFocused = document.activeElement;
        resetContactState();
        setModalOpen(true);
        window.setTimeout(function () {
            var first = $('lite-contact-name');
            if (first) {
                try {
                    first.focus();
                } catch (e) {}
            }
        }, 30);
        return true;
    }

    function closeContact(ev) {
        if (ev && typeof ev.preventDefault === 'function') {
            ev.preventDefault();
            ev.stopPropagation();
        }
        var modal = $('lite-contact-modal');
        if (!modal) return;
        if (!isOpen(modal)) {
            // Force-hide even if class state drifted.
            setModalOpen(false);
            return;
        }
        closingGuardUntil = Date.now() + 500;
        // Kill pointer events first so the same click cannot hit openers underneath.
        modal.style.pointerEvents = 'none';
        setModalOpen(false);
        pendingReason = '';
        window.setTimeout(function () {
            if (modal) modal.style.pointerEvents = '';
        }, 500);
        if (lastFocused && typeof lastFocused.focus === 'function') {
            try {
                lastFocused.focus();
            } catch (e) {}
        }
    }

    function ensureNoticeModal() {
        var existing = $('lite-notice-modal');
        if (existing) return existing;
        var wrap = document.createElement('div');
        wrap.id = 'lite-notice-modal';
        wrap.setAttribute('hidden', '');
        wrap.setAttribute('aria-hidden', 'true');
        wrap.innerHTML =
            '<div class="lite-notice-backdrop" data-lite-notice-close tabindex="-1"></div>' +
            '<div class="lite-notice-dialog" role="dialog" aria-modal="true" aria-labelledby="lite-notice-title">' +
            '<p class="lite-notice-title" id="lite-notice-title">ご案内</p>' +
            '<p class="lite-notice-text" id="lite-notice-text"></p>' +
            '<div class="lite-notice-actions">' +
            '<button type="button" class="lite-notice-ok" data-lite-notice-close>戻る</button>' +
            '<button type="button" class="lite-notice-consult" id="lite-notice-consult" hidden>気軽に相談してみる</button>' +
            '</div>' +
            '</div>';
        document.body.appendChild(wrap);
        wrap.addEventListener('click', function (ev) {
            var t = ev.target;
            if (t && t.id === 'lite-notice-consult') {
                closeLiteNotice(ev);
                openContact('');
                return;
            }
            if (t && t.getAttribute && t.getAttribute('data-lite-notice-close') !== null) {
                closeLiteNotice(ev);
            }
        });
        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && wrap.classList.contains('is-open')) {
                closeLiteNotice(event);
            }
        });
        return wrap;
    }

    function closeLiteNotice(ev) {
        if (ev && typeof ev.preventDefault === 'function') {
            ev.preventDefault();
            ev.stopPropagation();
        }
        var modal = $('lite-notice-modal');
        if (!modal) return;
        modal.classList.remove('is-open');
        modal.setAttribute('hidden', '');
        modal.setAttribute('aria-hidden', 'true');
    }

    /** Shadowing play etc.: message only (no contact form). */
    function showLiteNotice(message, options) {
        options = options || {};
        var modal = ensureNoticeModal();
        var titleEl = $('lite-notice-title');
        var textEl = $('lite-notice-text');
        var consultBtn = $('lite-notice-consult');
        if (titleEl) titleEl.textContent = options.title || 'ご案内';
        if (textEl) textEl.textContent = message || '';
        if (consultBtn) {
            if (options.showConsult) {
                consultBtn.hidden = false;
            } else {
                consultBtn.hidden = true;
            }
        }
        modal.classList.add('is-open');
        modal.removeAttribute('hidden');
        modal.setAttribute('aria-hidden', 'false');
        window.setTimeout(function () {
            var ok = modal.querySelector('.lite-notice-ok');
            if (ok) {
                try {
                    ok.focus();
                } catch (e) {}
            }
        }, 30);
        return false;
    }

    function showPaidBenefits(appName) {
        var key = String(appName || 'vocabulary');
        var body = PAID_BENEFITS[key] || PAID_BENEFITS.vocabulary;
        var title = PAID_BENEFITS_TITLES[key] || '有料版では';
        return showLiteNotice(body, { title: title, showConsult: true });
    }

    function showLiteUpgrade(kind) {
        if (kind === 'share') {
            openContact(MSG_SHARE);
            return false;
        }
        // shadowing (and default): notice only — do not open Contact Us
        showLiteNotice(MSG_SHADOWING);
        return false;
    }

    function onOpenClick(ev) {
        if (ev) {
            ev.preventDefault();
            ev.stopPropagation();
        }
        if (typeof global.toggleSideMenu === 'function') {
            try {
                global.toggleSideMenu(false);
            } catch (e) {}
        }
        openContact('');
    }

    function bindDirect(el, type, fn) {
        if (!el) return;
        el.addEventListener(type, fn);
    }

    function bindContactUi() {
        if (bound) return;
        bound = true;

        setModalOpen(false);

        // Openers
        var openers = document.querySelectorAll('.lite-contact-open');
        for (var i = 0; i < openers.length; i++) {
            bindDirect(openers[i], 'click', onOpenClick);
        }

        // Closers (X, backdrop, success "閉じる") — direct bind, most reliable
        var closers = document.querySelectorAll('[data-lite-contact-close]');
        for (var j = 0; j < closers.length; j++) {
            bindDirect(closers[j], 'click', closeContact);
        }

        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && isOpen($('lite-contact-modal'))) {
                closeContact(event);
            }
        });

        var form = $('lite-contact-form');
        if (!form) return;

        form.addEventListener('submit', function (event) {
            event.preventDefault();
            setError(null);

            // Honeypot (Web3Forms spam protection)
            var bot = form.querySelector('[name="botcheck"]');
            if (bot && bot.checked) {
                showContactSuccessState();
                return;
            }

            var data = new FormData(form);
            var userName = String(data.get('userName') || '').trim();
            var userEmail = String(data.get('userEmail') || '').trim();
            var userMessage = String(data.get('userMessage') || '').trim();
            if (!userName || !userEmail || !userMessage) {
                setError('全部うめてください');
                return;
            }

            var pageUrl = '';
            try {
                pageUrl = String(global.location && global.location.href ? global.location.href : '');
            } catch (eLoc) {}

            var fullMessage =
                (pendingReason ? '【Lite制限】\n' + pendingReason + '\n\n' : '') +
                'お名前: ' +
                userName +
                '\nメールアドレス: ' +
                userEmail +
                '\nページ: ' +
                pageUrl +
                '\n\nお問い合わせ内容:\n' +
                userMessage;

            // Match youth payload shape as closely as possible.
            var payload = new FormData();
            payload.append('access_key', WEB3FORMS_ACCESS_KEY);
            payload.append('subject', '【Kepty English Lite】有料版のご相談・申し込み');
            payload.append('from_name', 'Kepty English Lite');
            payload.append('name', userName);
            payload.append('email', userEmail);
            payload.append('replyto', userEmail);
            payload.append('message', fullMessage);

            var submitBtn = $('lite-contact-submit');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Sending...';
            }

            fetch(WEB3FORMS_URL, { method: 'POST', body: payload })
                .then(function (response) {
                    return response.text().then(function (text) {
                        var result = null;
                        try {
                            result = text ? JSON.parse(text) : null;
                        } catch (eParse) {
                            result = { success: false, message: text || 'Invalid JSON response' };
                        }
                        return { ok: response.ok, status: response.status, result: result };
                    });
                })
                .then(function (res) {
                    if (res.ok && res.result && res.result.success) {
                        form.reset();
                        showContactSuccessState();
                        return;
                    }
                    var apiMsg =
                        (res.result && (res.result.message || res.result.error)) ||
                        ('送れませんでした（HTTP ' + res.status + '）');
                    setError(
                        apiMsg +
                            ' ※GitHub Pages（github.io）は Web3Forms 側で制限されることがあります。届かない場合は contact@kepty.co へ直接メールください。'
                    );
                })
                .catch(function () {
                    setError(
                        '送れませんでした。通信環境をご確認のうえ、contact@kepty.co へ直接メールでもお問い合わせください。'
                    );
                })
                .finally(function () {
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.textContent = 'Send Message';
                    }
                });
        });
    }

    global.KeptyLite = {
        openContact: openContact,
        closeContact: closeContact,
        showLiteUpgrade: showLiteUpgrade,
        showLiteNotice: showLiteNotice,
        closeLiteNotice: closeLiteNotice,
        showPaidBenefits: showPaidBenefits,
        MSG_SHADOWING: MSG_SHADOWING,
        MSG_SHARE: MSG_SHARE,
        PAID_BENEFITS: PAID_BENEFITS
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', bindContactUi);
    } else {
        bindContactUi();
    }
})(typeof window !== 'undefined' ? window : this);
